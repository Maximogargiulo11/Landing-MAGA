import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LogoMark from './LogoMark';
import { WHATSAPP_URL } from '../constants';

const LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#portafolio', label: 'Trabajo' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.08);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-400"
      style={{
        background: scrolled ? 'rgba(10,0,20,0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.05)'
          : '1px solid transparent',
      }}
    >
      <div className="max-w-[1120px] mx-auto px-8 py-[18px] flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 no-underline">
          <LogoMark className="h-[38px] w-auto text-accent-light" />
          <div className="leading-[1.15]">
            <div className="text-[15px] font-extrabold tracking-[0.1em] text-ink">
              MAGA
            </div>
            <div className="text-[10px] font-medium tracking-[0.22em] text-white/40">
              AGENCY
            </div>
          </div>
        </a>

        <div className="hidden md:flex gap-9">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/50 hover:text-white/90 text-sm font-medium no-underline transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="bg-accent text-white px-6 py-2.5 rounded-full text-sm font-semibold no-underline transition-all duration-300 hover:shadow-[0_0_24px_rgba(124,58,237,0.65)] hover:scale-[1.03]"
        >
          Hablemos
        </a>
      </div>
    </motion.nav>
  );
}
