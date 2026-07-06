import { motion } from 'framer-motion';
import portfolio1 from '../assets/images/portfolio-1.jpeg';
import portfolio2 from '../assets/images/portfolio-2.jpeg';
import portfolio3 from '../assets/images/portfolio-3-screenshot.png';
import portfolio4 from '../assets/images/portfolio-4.jpeg';
import { Eyebrow } from './Services';
import { WHATSAPP_URL } from '../constants';
import WhatsAppIcon from './WhatsAppIcon';

const EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: '+180%', label: 'conversión' },
  { value: '2.1s', label: 'carga' },
  { value: '4.9★', label: 'satisfacción' },
];

export default function Portfolio() {
  return (
    <section id="portafolio" className="relative z-[1] pt-[100px] pb-[140px] px-6">
      <div className="max-w-[900px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-[60px]"
        >
          <Eyebrow label="PORTAFOLIO" />
          <h2 className="font-bold tracking-[-0.025em] leading-[1.15] text-ink text-[clamp(28px,4vw,48px)]">
            Resultados reales. 100% funcionales
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="lg rounded-3xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[380px]">
            <div className="p-8 md:p-11 flex flex-col justify-center">
              <div className="inline-flex items-center bg-accent/15 border border-accent/25 rounded-full px-3.5 py-1 text-[11px] font-bold text-accent-light tracking-[0.12em] w-fit mb-[22px]">
                E-COMMERCE
              </div>
              <h3 className="text-[30px] font-extrabold text-ink tracking-[-0.02em] mb-2.5 leading-[1.15]">
                Botines
                <br />
                Alta Gama
              </h3>
              <p className="text-[15px] text-white/50 leading-[1.65] mb-8">
                Tienda premium de botines de fútbol.
                <br />
                Diseñada para vender 24/7.
              </p>
              <div className="flex gap-6 items-center">
                {STATS.map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-6">
                    {i > 0 && <div className="w-px h-8 bg-white/[0.07]" />}
                    <div>
                      <div className="text-[22px] font-extrabold text-ink">
                        {stat.value}
                      </div>
                      <div className="text-[11px] text-white/35 tracking-[0.08em] mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-7 bg-accent text-white px-7 py-[13px] rounded-full text-sm font-semibold no-underline transition-all duration-300 hover:shadow-[0_0_28px_rgba(124,58,237,0.65)] hover:scale-[1.04] w-fit"
              >
                <WhatsAppIcon size={16} />
                Consultar proyecto similar
              </a>
            </div>

            <div className="grid grid-cols-2 gap-0.5 bg-accent/10 overflow-hidden">
              <img
                src={portfolio1}
                alt=""
                className="w-full h-full object-cover object-top"
              />
              <img
                src={portfolio2}
                alt=""
                className="w-full h-full object-cover object-top"
              />
              <img
                src={portfolio3}
                alt="Botines Alta Gama web"
                className="w-full h-full object-cover object-top"
              />
              <img
                src={portfolio4}
                alt=""
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
