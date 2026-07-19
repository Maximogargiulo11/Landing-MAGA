import { motion } from 'framer-motion';
import { Store, User } from 'lucide-react';
import { Eyebrow } from './Services';

const EASE = [0.22, 1, 0.36, 1] as const;

interface Testimonial {
  quote: string;
  avatarIcon: typeof User;
  gradient: string;
  name: string;
  subtitle: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'MAGA transformó nuestra tienda online. Las ventas aumentaron y el diseño nos representa a la perfección.',
    avatarIcon: Store,
    gradient: 'linear-gradient(135deg,#7C3AED,#a78bfa)',
    name: 'Botines Alta Gama CBA',
    subtitle: 'E-commerce · Córdoba',
  },
  {
    quote:
      'Profesionalismo total. Entregaron antes del plazo y el resultado superó todas nuestras expectativas.',
    avatarIcon: User,
    gradient: 'linear-gradient(135deg,#5B21B6,#7C3AED)',
    name: 'Martina Ibáñez',
    subtitle: 'E-commerce · Argentina',
  },
  {
    quote:
      'El bot de WhatsApp trabaja 24/7 y atiende consultas solo. Una inversión que se pagó sola en semanas.',
    avatarIcon: User,
    gradient: 'linear-gradient(135deg,#4C1D95,#6D28D9)',
    name: 'Nicolás Ferreyra',
    subtitle: 'Automatización · Córdoba',
  },
];

export default function Testimonials() {
  return (
    <section className="relative z-[1] pt-[60px] pb-[140px] px-6">
      <div className="max-w-[900px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-14"
        >
          <Eyebrow label="CLIENTES" />
          <h2 className="font-bold tracking-[-0.025em] text-ink text-[clamp(28px,4vw,48px)]">
            Lo que dicen de nosotros.
          </h2>
        </motion.div>

        <div className="grid gap-3.5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.12 }}
              className="lg rounded-[20px] p-8"
            >
              <div
                className="text-[38px] leading-none text-accent/30 mb-3"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                "
              </div>
              <p className="text-sm text-white/60 leading-[1.75] mb-[22px] italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 border-t border-white/[0.06] pt-4">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0"
                  style={{ background: t.gradient }}
                >
                  <t.avatarIcon size={17} strokeWidth={2} />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-ink">{t.name}</div>
                  <div className="text-[11px] text-white/30 mt-px">
                    {t.subtitle}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
