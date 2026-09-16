import Anthropic from '@anthropic-ai/sdk';
import { MAGA_SYSTEM_PROMPT, MAGA_WHATSAPP_URL } from './maga-context.js';

// El cliente resuelve la credencial desde ANTHROPIC_API_KEY.
const client = new Anthropic();

// Modelo por defecto: Claude Opus 5. Podés cambiarlo por uno más económico
// (claude-sonnet-5 o claude-haiku-4-5) seteando CLAUDE_MODEL en las env vars.
const MODEL = process.env.CLAUDE_MODEL || 'claude-opus-5';

/**
 * Genera una respuesta para un DM de Instagram usando Claude, con el contexto
 * de MAGA. `userMessage` es el texto que escribió la persona.
 */
export async function generateReply(userMessage: string): Promise<string> {
  const text = userMessage.trim();
  if (!text) {
    return `¡Hola! 👋 Contame en qué te podemos ayudar y con gusto te respondo.`;
  }

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 400,
      system: [
        {
          type: 'text',
          text: MAGA_SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [{ role: 'user', content: text }],
    });

    if (response.stop_reason === 'refusal') {
      return fallbackReply();
    }

    const reply = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .trim();

    return reply || fallbackReply();
  } catch (err) {
    console.error('[claude] error generando respuesta:', err);
    return fallbackReply();
  }
}

/** Respuesta segura si Claude falla o rechaza: deriva a WhatsApp. */
function fallbackReply(): string {
  return `¡Gracias por escribir a MAGA! 🙌 Para ayudarte mejor, escribinos por WhatsApp: ${MAGA_WHATSAPP_URL}`;
}
