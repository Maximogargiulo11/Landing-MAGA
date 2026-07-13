import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import LogoMark from './LogoMark';
import { WHATSAPP_URL, HERO_OFFSET_PX } from '../constants';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative z-[1] min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pb-[140px]"
    >
      <motion.div
        style={{ opacity, scale, marginTop: HERO_OFFSET_PX }}
        className="flex flex-col items-center px-6 will-change-[opacity,transform]"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
        >
          <h1 className="font-bold leading-[1.05] tracking-[-0.03em] text-ink text-[clamp(40px,9vw,95px)]">
            Diseñamos la web
            <br />
            <span
              className="bg-clip-text text-transparent text-[clamp(34px,8vw,90px)] font-normal not-italic"
              style={{
                backgroundImage:
                  'linear-gradient(135deg,#7C3AED,#a78bfa,#38bdf8)',
              }}
            >
              que hace crecer
            </span>
            <br />
            tu negocio.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.8 }}
          className="mt-12"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 bg-accent text-white px-10 py-[17px] rounded-full text-base font-semibold no-underline transition-all duration-300 hover:shadow-[0_0_36px_rgba(124,58,237,0.7)] hover:scale-[1.04]"
          >
            Empezar proyecto
            <ArrowRight size={18} strokeWidth={2.2} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1 }}
          className="mt-12"
        >
          <LogoMark
            className="h-[134px] w-auto text-accent-light animate-float"
            style={{ filter: 'drop-shadow(0 0 40px rgba(124,58,237,0.55))' }}
          />
        </motion.div>
      </motion.div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.2 }}
          className="flex flex-col items-center gap-2"
        >
          <ChevronDown
            size={22}
            strokeWidth={2}
            className="text-white/35 animate-bounce-down"
          />
          <span className="text-[10px] text-white/28 tracking-[0.2em] font-medium">
            SCROLL
          </span>
        </motion.div>
      </div>
    </section>
  );
}
