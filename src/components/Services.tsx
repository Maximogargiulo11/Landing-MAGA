import { motion } from 'framer-motion';
import {
  Layout,
  Globe,
  ShoppingCart,
  MessageSquare,
  Smartphone,
  Code2,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const SERVICES: Service[] = [
  {
    icon: Layout,
    title: 'Landing Page',
    description: 'Tu primera impresión, perfeccionada.',
  },
  {
    icon: Globe,
    title: 'Sitio Institucional',
    description: 'La cara digital de tu marca.',
  },
  {
    icon: ShoppingCart,
    title: 'Tienda Online',
    description: 'Vendé las 24 horas, sin pausas.',
  },
  {
    icon: MessageSquare,
    title: 'Bots de WhatsApp e Instagram',
    description: 'Atención automática, siempre activa.',
  },
  {
    icon: Smartphone,
    title: 'Apps Móviles',
    description: 'Software hecho para vos.',
  },
  {
    icon: Code2,
    title: 'Mantenimiento Web',
    description: 'Tu web siempre activa, segura y actualizada.',
  },
];

function Eyebrow({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.2em] text-accent-light mb-[18px]">
      <span className="w-[5px] h-[5px] rounded-full bg-accent animate-pulse-ring inline-block" />
      {label}
    </div>
  );
}

export default function Services() {
  return (
    <section id="servicios" className="relative z-[1] py-[140px] px-6">
      <div className="max-w-[820px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-[72px]"
        >
          <Eyebrow label="SERVICIOS" />
          <h2 className="font-bold tracking-[-0.025em] leading-[1.12] text-ink text-[clamp(30px,4.5vw,52px)]">
            Todo lo que necesitás.
            <br />
            En un solo lugar.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-2.5">
          {SERVICES.map((service, i) => {
            const fromLeft = i % 2 === 0;
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: fromLeft ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.07 }}
                className="lg rounded-2xl px-7 py-[22px] flex items-center gap-5"
              >
                <div className="w-[46px] h-[46px] shrink-0 rounded-xl bg-accent/15 flex items-center justify-center">
                  <Icon size={22} strokeWidth={1.8} className="text-accent-light" />
                </div>
                <div className="flex-1">
                  <div className="text-[17px] font-bold text-ink mb-[3px]">
                    {service.title}
                  </div>
                  <div className="text-sm text-white/45">
                    {service.description}
                  </div>
                </div>
                <ArrowRight size={15} strokeWidth={2} className="text-accent/50" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { Eyebrow };
