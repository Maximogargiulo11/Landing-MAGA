import LogoMark from './LogoMark';

export default function Footer() {
  return (
    <footer className="relative z-[1] border-t border-white/5 py-6 px-8">
      <div className="max-w-[1120px] mx-auto flex items-center justify-between">
        <LogoMark className="h-7 w-auto text-accent-light opacity-40" />
        <span className="text-xs text-white/[0.22]">
          © 2026 Maga Agency. Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
}
