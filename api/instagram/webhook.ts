import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifySignature, sendTextMessage } from '../_lib/meta.js';
import { generateReply } from '../_lib/claude.js';

/**
 * Webhook de Instagram para responder DMs automáticamente.
 *
 *   GET  -> verificación del webhook (handshake con Meta)
 *   POST -> eventos de mensajes entrantes
 *
 * Endpoint público: https://TU-DOMINIO/api/instagram/webhook
 */

// Desactivamos el parseo automático del body de Vercel para poder leer el
// cuerpo crudo y verificar la firma X-Hub-Signature-256 de Meta byte a byte.
export const config = {
  api: {
    bodyParser: false,
  },
};

const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || '';

// El id de la cuenta de Instagram del negocio (para ignorar nuestros propios
// mensajes). Opcional pero recomendado.
const IG_ACCOUNT_ID = process.env.IG_ACCOUNT_ID || '';

// Deduplicación best-effort de mensajes ya procesados (por id de mensaje).
// Nota: en serverless la memoria no persiste entre invocaciones, así que esto
// solo cubre reintentos dentro de la misma instancia caliente.
const seenMessageIds = new Set<string>();

interface IgMessaging {
  sender?: { id?: string };
  recipient?: { id?: string };
  message?: {
    mid?: string;
    text?: string;
    is_echo?: boolean;
  };
}

interface IgEntry {
  id?: string;
  messaging?: IgMessaging[];
}

interface IgWebhookBody {
  object?: string;
  entry?: IgEntry[];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // --- Verificación del webhook (GET) ---
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }
    return res.status(403).send('Forbidden');
  }

  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // --- Eventos de mensajes (POST) ---
  const rawBody = await getRawBody(req);

  const signature =
    (req.headers['x-hub-signature-256'] as string | undefined) ?? undefined;
  if (!verifySignature(rawBody, signature)) {
    console.warn('[webhook] firma inválida');
    return res.status(401).send('Invalid signature');
  }

  let body: IgWebhookBody;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return res.status(400).send('Invalid JSON');
  }

  // Respondemos 200 rápido: Meta reintenta si tardamos demasiado.
  // Procesamos y esperamos antes de cerrar para que la función serverless
  // no termine antes de enviar la respuesta.
  try {
    await processEvents(body);
  } catch (err) {
    console.error('[webhook] error procesando eventos:', err);
  }

  return res.status(200).send('EVENT_RECEIVED');
}

async function processEvents(body: IgWebhookBody): Promise<void> {
  if (body.object !== 'instagram') return;

  for (const entry of body.entry ?? []) {
    for (const event of entry.messaging ?? []) {
      await handleMessagingEvent(event);
    }
  }
}

async function handleMessagingEvent(event: IgMessaging): Promise<void> {
  const message = event.message;
  if (!message) return; // no es un mensaje (read receipt, reacción, etc.)

  // Ignorar los "echo" (copias de mensajes que enviamos nosotros) para no
  // entrar en un bucle infinito.
  if (message.is_echo) return;

  const senderId = event.sender?.id;
  const text = message.text;
  if (!senderId || !text) return; // sin remitente o sin texto (ej: adjuntos)

  // Ignorar mensajes que vengan de nuestra propia cuenta.
  if (IG_ACCOUNT_ID && senderId === IG_ACCOUNT_ID) return;

  // Deduplicación por id de mensaje.
  if (message.mid) {
    if (seenMessageIds.has(message.mid)) return;
    seenMessageIds.add(message.mid);
    if (seenMessageIds.size > 1000) {
      // Evitar que el Set crezca sin límite en instancias calientes.
      seenMessageIds.clear();
    }
  }

  const reply = await generateReply(text);
  await sendTextMessage(senderId, reply);
}

/**
 * Obtiene el cuerpo crudo del request. En Vercel el body suele venir ya
 * parseado; reconstruimos el texto para poder verificar la firma.
 */
async function getRawBody(req: VercelRequest): Promise<string> {
  if (typeof req.body === 'string') return req.body;
  if (Buffer.isBuffer(req.body)) return req.body.toString('utf8');
  if (req.body && typeof req.body === 'object') return JSON.stringify(req.body);

  req.setEncoding('utf8');
  let data = '';
  for await (const chunk of req) {
    data += chunk;
  }
  return data;
}
