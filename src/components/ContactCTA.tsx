import { motion } from 'framer-motion';
import LogoMark from './LogoMark';
import { WHATSAPP_URL } from '../constants';
import WhatsAppIcon from './WhatsAppIcon';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ContactCTA() {
  return (
    <section
      id="contacto"
      className="relative z-[1] pt-[120px] pb-[160px] px-6 text-center"
    >
      <div className="max-w-[660px] mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-7"
        >
          <LogoMark
            className="h-[70px] w-auto text-accent-light"
            style={{ filter: 'drop-shadow(0 0 20px rgba(124,58,237,0.45))' }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        >
          <h2 className="font-bold tracking-[-0.03em] leading-[1.08] text-ink text-[clamp(38px,7vw,76px)] mb-3.5">
            Hablemos de
            <br />
            tu proyecto.
          </h2>
          <p className="text-[17px] text-white/40 mb-11 leading-[1.6]">
            Respondemos en menos de 24hs.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-accent text-white px-12 py-[18px] rounded-full text-[17px] font-semibold no-underline transition-all duration-300 hover:shadow-[0_0_44px_rgba(124,58,237,0.7)] hover:scale-[1.04]"
          >
            <WhatsAppIcon size={20} />
            Escribinos al WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
