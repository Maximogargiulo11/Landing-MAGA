# 🤖 Bot de Instagram de MAGA

Bot que **responde automáticamente los DMs (mensajes directos)** de Instagram
usando **Claude (IA)** para dar respuestas naturales con el contexto de MAGA.

> Estado actual: **solo DMs**. Comentarios en posts y respuestas a historias
> quedan como siguiente etapa (ver [Próximos pasos](#próximos-pasos)).

---

## 🧩 Cómo funciona

```
Instagram ──(webhook)──▶  /api/instagram/webhook  ──▶  Claude genera respuesta
   ▲                                                          │
   └──────────────── envía el DM de vuelta ◀──────────────────┘
```

- **`api/instagram/webhook.ts`** — recibe los eventos de Instagram y responde.
- **`api/_lib/claude.ts`** — le pide a Claude la respuesta.
- **`api/_lib/meta.ts`** — verifica la firma y envía el mensaje por la API de Meta.
- **`api/_lib/maga-context.ts`** — el "cerebro": tono, servicios y reglas de MAGA.
  👉 **Editá este archivo para cambiar cómo responde el bot.**

Todo corre como **funciones serverless en Vercel**, junto a la landing.

---

## ✅ Requisitos previos

1. **Cuenta de Instagram Profesional** (Business o Creator) — no personal.
   En la app de Instagram: *Configuración → Tipo de cuenta → Cambiar a profesional*.
2. Una **Página de Facebook** vinculada a esa cuenta de Instagram.
3. Una cuenta en **[Meta for Developers](https://developers.facebook.com/)**.
4. Una **API key de Anthropic** (Claude): [console.anthropic.com](https://console.anthropic.com).
5. El proyecto desplegado en **Vercel** (la landing ya está lista para eso).

---

## 🔑 Paso 1 — Crear la app en Meta

1. Entrá a [developers.facebook.com/apps](https://developers.facebook.com/apps) → **Crear app**.
2. Elegí el caso de uso relacionado con **Instagram / Mensajería**.
3. Dentro de la app, agregá el producto **Instagram** (API con Instagram Login).
4. Vinculá tu cuenta de Instagram profesional.
5. En **App settings → Basic**, copiá el **App Secret** → será `META_APP_SECRET`.

### Permisos que necesitás
- `instagram_business_basic`
- `instagram_business_manage_messages` (para leer y responder DMs)

### Tokens
1. Generá un **access token** de la cuenta de Instagram con esos permisos →
   será `IG_ACCESS_TOKEN`.
2. Anotá el **ID de tu cuenta de Instagram** (aparece en el panel o lo obtenés
   con la Graph API) → será `IG_ACCOUNT_ID`.
3. Inventá un texto secreto cualquiera para `META_VERIFY_TOKEN`
   (ej: `maga-webhook-2026`). Lo vas a usar en el Paso 3.

> 💡 Los tokens de corta duración vencen. Cuando todo funcione, generá un
> **token de larga duración** para no tener que renovarlo seguido.

---

## 🚀 Paso 2 — Configurar y desplegar en Vercel

1. Subí el proyecto a Vercel (importá el repo de GitHub).
2. En **Project Settings → Environment Variables**, cargá las variables del
   archivo [`.env.example`](./.env.example):

   | Variable | Valor |
   |---|---|
   | `ANTHROPIC_API_KEY` | tu API key de Claude |
   | `CLAUDE_MODEL` | `claude-opus-5` (o `claude-sonnet-5` / `claude-haiku-4-5`) |
   | `META_VERIFY_TOKEN` | el texto secreto que inventaste |
   | `META_APP_SECRET` | el App Secret de Meta |
   | `IG_ACCESS_TOKEN` | el access token de Instagram |
   | `IG_ACCOUNT_ID` | el id de tu cuenta de Instagram |

3. Hacé **Deploy**. Tu webhook quedará en:

   ```
   https://TU-DOMINIO.vercel.app/api/instagram/webhook
   ```

---

## 🔗 Paso 3 — Conectar el webhook en Meta

1. En la app de Meta → producto **Instagram → Configuración del webhook**.
2. **Callback URL**: `https://TU-DOMINIO.vercel.app/api/instagram/webhook`
3. **Verify token**: el mismo valor que pusiste en `META_VERIFY_TOKEN`.
4. Guardá. Meta hará un `GET` de verificación; si el token coincide, queda ✅.
5. **Suscribite al campo `messages`** (y `messaging_postbacks` si querés).

Listo: mandate un DM de prueba a la cuenta desde otro perfil y el bot debería
responder en segundos.

---

## 🧪 Probar localmente (opcional)

```bash
npm install
npm i -g vercel
vercel dev          # levanta las funciones en http://localhost:3000
```

Para que Instagram llegue a tu máquina necesitás exponerla con algo como
[ngrok](https://ngrok.com/) y usar esa URL pública como Callback URL.

---

## 🎨 Personalizar las respuestas

Todo el "cerebro" está en **`api/_lib/maga-context.ts`**: tono, lista de
servicios, cuándo derivar a WhatsApp, qué no decir, etc. Cambiá ese texto y
volvé a desplegar. No hace falta tocar la lógica.

---

## 💸 Costos y modelo

El bot usa **Claude Opus 5** por defecto (la mejor calidad). Para un volumen alto
de mensajes conviene bajar de modelo cambiando `CLAUDE_MODEL`:

| Modelo | Cuándo |
|---|---|
| `claude-opus-5` | Máxima calidad (por defecto) |
| `claude-sonnet-5` | Muy buena calidad, bastante más barato |
| `claude-haiku-4-5` | El más rápido y económico, ideal para respuestas simples |

Se paga por mensaje procesado (centavos). Además, Instagram solo permite
responder DMs dentro de una **ventana de 24 hs** desde el último mensaje del
usuario (política de mensajería de Meta).

---

## ⚠️ Importante: revisión de la app (App Review)

Mientras la app esté en **modo desarrollo**, el bot solo responde a cuentas con
rol en la app (vos y quienes agregues como testers). Para que responda a
**cualquier persona**, Meta exige pasar la app a **modo Live** y aprobar los
permisos de mensajería en **App Review** (puede tardar unos días y piden un
video mostrando el flujo).

---

## 🔒 Seguridad

- Las credenciales van en variables de entorno, **nunca** en el código.
- El webhook **verifica la firma** `X-Hub-Signature-256` con `META_APP_SECRET`,
  así solo Meta puede dispararlo.
- El bot ignora sus propios mensajes (`is_echo`) para no entrar en bucles.

---

## 🛣️ Próximos pasos

- [ ] **Comentarios en posts** — responder automáticamente comentarios.
- [ ] **Respuestas a historias** — cuando alguien contesta una historia.
- [ ] **Memoria de conversación** — recordar el hilo previo (hoy responde
      mensaje a mensaje, sin historial, porque serverless no guarda estado).
      Para esto sumaríamos una base tipo Vercel KV / Upstash Redis.
- [ ] **Handoff a humano** — detectar intención de compra y avisar al equipo.
