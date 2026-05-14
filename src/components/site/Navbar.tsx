import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/packages", label: "Packages" },
  { to: "/fleet", label: "Fleet" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto max-w-7xl rounded-2xl transition-all duration-500 ${
          scrolled ? "glass-strong shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]" : "glass"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          <Link to="/" className="group flex items-center gap-2">
            <div className="relative h-9 w-9 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-luxury)" }}>
              <span className="font-display text-lg font-bold text-white">V</span>
              <div className="absolute inset-0 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition" style={{ background: "var(--gradient-luxury)" }} />
            </div>
            <div className="leading-tight">
              <div className="font-display text-base font-semibold tracking-tight">Verma</div>
              <div className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Tour & Travels</div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="relative px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full"
                activeProps={{ className: "!text-foreground" }}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute inset-0 rounded-full glass" />
                    )}
                    <span className="relative">{l.label}</span>
                  </>
                )}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:9816492182" className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-foreground glass hover:glow-neon transition">
              <Phone className="h-3.5 w-3.5" /> 98164 92182
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg glass">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t border-border px-3 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-lg text-sm hover:bg-secondary transition"
                activeProps={{ className: "bg-secondary text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
            <a href="tel:9816492182" className="px-4 py-3 rounded-lg text-sm font-medium" style={{ background: "var(--gradient-luxury)" }}>
              Call Now: 98164 92182
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}