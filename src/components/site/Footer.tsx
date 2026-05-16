import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import { useEffect, useState } from "react";

export function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const socials = [
    { Icon: Instagram, href: "https://www.instagram.com/verma_tour_travel/" },
    { Icon: Facebook, href: "https://www.facebook.com/" },
    { Icon: Twitter, href: "#" },
  ];

  return (
    <footer className="relative mt-32 border-t border-border overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-40" style={{ background: "var(--gradient-glow)" }} />
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-luxury)" }}>
              <span className="font-display text-xl font-bold text-white">V</span>
            </div>
            <div>
              <div className="font-display text-lg font-semibold">Verma Tour & Travels</div>
              <div className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Luxury beyond limits</div>
            </div>
          </div>
          <p className="mt-5 text-sm text-muted-foreground max-w-md">
            Premium luxury bus rentals and Himachal tour packages crafted for travelers who expect comfort, safety and unforgettable experiences.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full glass flex items-center justify-center hover:glow-neon transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              ["About", "/about"],
              ["Services", "/services"],
              ["Packages", "/packages"],
              ["Fleet", "/fleet"],
              ["Gallery", "/gallery"],
              ["Contact", "/contact"],
            ].map(([label, to]) => (
              <li key={to}><Link to={to} className="hover:text-foreground transition">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" /> 98164 92182</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" /> 70184 74668</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /><span>info@vermatravels.in</span></li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-accent mt-0.5" /> Himachal Pradesh, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-5 text-xs text-muted-foreground flex flex-col md:flex-row justify-between gap-2">
          <span>© {year} Verma Tour & Travels. All rights reserved.</span>
          <span>Crafted with luxury in mind.</span>
        </div>
      </div>
    </footer>
  );
}
