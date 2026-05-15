import { motion } from "framer-motion";
import { Quote, Sparkles } from "lucide-react";
import owner from "@/assets/owner-sees-ram-verma.png";

export function Founder() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full blur-3xl opacity-30" style={{ background: "var(--gradient-luxury)" }} />
      <div className="absolute bottom-0 right-0 -z-10 h-[400px] w-[400px] rounded-full blur-3xl opacity-20" style={{ background: "var(--gradient-gold)" }} />
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] blur-2xl opacity-60" style={{ background: "var(--gradient-luxury)" }} />
          <div className="relative rounded-[2rem] overflow-hidden glass-strong luxury-border p-2">
            <div className="relative rounded-[1.6rem] overflow-hidden">
              <img src={owner} alt="Mr. Sees Ram Verma — Founder of Verma Tour & Travels" className="w-full h-[560px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-accent">Founder & CEO</div>
                  <div className="font-display text-2xl font-semibold mt-1">Mr. Sees Ram Verma</div>
                </div>
                <div className="px-3 py-1.5 rounded-full text-[10px] font-semibold flex items-center gap-1" style={{ background: "var(--gradient-gold)", color: "#000" }}>
                  <Sparkles className="h-3 w-3" /> Since 2010
                </div>
              </div>
            </div>
          </div>
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -top-6 -right-6 glass-strong rounded-2xl px-4 py-3 luxury-border"
          >
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Trips delivered</div>
            <div className="font-display text-2xl gradient-text-gold font-semibold">10,000+</div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[11px] uppercase tracking-[0.2em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" /> Meet the founder
          </div>
          <h2 className="mt-5 font-display text-4xl md:text-5xl font-semibold leading-tight">
            A vision built on <span className="gradient-text">trust, comfort &amp; care.</span>
          </h2>
          <div className="mt-6 relative glass-strong rounded-2xl p-6 luxury-border">
            <Quote className="absolute -top-3 -left-3 h-8 w-8 text-accent" />
            <p className="text-muted-foreground leading-relaxed italic">
              “I started Verma Tour &amp; Travels with one promise — every traveler boarding our fleet should feel safe, pampered, and inspired. Today, that promise drives every kilometer we cover across India.”
            </p>
            <div className="mt-4 text-sm font-semibold">— Mr. Sees Ram Verma</div>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { k: "15+", v: "Years of trust" },
              { k: "50+", v: "Destinations" },
              { k: "4.9★", v: "Avg. rating" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl glass p-4 text-center">
                <div className="font-display text-2xl gradient-text-gold font-semibold">{s.k}</div>
                <div className="text-[11px] text-muted-foreground mt-1">{s.v}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex gap-3">
            <a href="tel:9816492182" className="px-6 py-3 rounded-full font-medium text-white" style={{ background: "var(--gradient-luxury)" }}>
              Talk to Founder
            </a>
            <a href="/packages" className="px-6 py-3 rounded-full font-medium glass-strong">
              Explore Packages
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}