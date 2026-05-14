import { motion } from "framer-motion";
import { ArrowRight, Compass, ChevronDown, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroBus from "@/assets/hero-bus.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 flex items-center overflow-hidden">
      {/* BG Image with parallax-feel */}
      <div className="absolute inset-0 -z-10">
        <motion.img
          src={heroBus}
          alt="Luxury tourist bus on Himalayan road"
          width={1920}
          height={1280}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, oklch(0.06 0.02 270 / 0.6) 0%, oklch(0.06 0.02 270 / 0.85) 60%, oklch(0.06 0.02 270) 100%)" }} />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/40"
            style={{ left: `${(i * 53) % 100}%`, top: `${(i * 37) % 100}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl w-full grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span className="text-muted-foreground">Premium Himalayan Travel Experience</span>
          </motion.div>

          <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="block"
            >
              Travel
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="block gradient-text"
            >
              Beyond Limits
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="block text-2xl md:text-3xl text-muted-foreground font-display font-light mt-4"
            >
              with <span className="text-foreground font-medium">Verma Tour & Travels</span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground"
          >
            Luxury journeys across the Himalayas — comfort, safety and cinematic experiences engineered for the modern traveler.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium text-white relative overflow-hidden"
              style={{ background: "var(--gradient-luxury)", boxShadow: "var(--shadow-glow)" }}
            >
              <span className="relative z-10">Book Your Ride</span>
              <ArrowRight className="relative z-10 h-4 w-4 group-hover:translate-x-1 transition" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition" style={{ background: "linear-gradient(135deg, oklch(0.75 0.22 230), oklch(0.65 0.25 285))" }} />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium glass hover:bg-white/10 transition"
            >
              <Compass className="h-4 w-4" />
              Explore Services
            </Link>
          </motion.div>

          {/* trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-6 text-xs text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-glow shadow-[0_0_10px_var(--emerald-glow)]" />
              24/7 Available
            </div>
            <div>10,000+ Happy Travelers</div>
            <div>500+ Tours Completed</div>
          </motion.div>
        </div>

        {/* Floating booking card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="lg:col-span-5 hidden lg:block"
        >
          <div className="relative animate-float">
            <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-50" style={{ background: "var(--gradient-luxury)" }} />
            <div className="relative glass-strong rounded-3xl p-6 luxury-border">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-[0.2em] text-accent">Featured Tour</div>
                <div className="px-2 py-1 rounded-full text-[10px]" style={{ background: "var(--gradient-gold)" }}>
                  <span className="text-black font-semibold">PREMIUM</span>
                </div>
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold">Manali — Leh Expedition</h3>
              <p className="mt-1 text-sm text-muted-foreground">7 days • Luxury Volvo • All inclusive</p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {["AC Sleeper", "GPS Tracked", "On-board Wi-Fi", "Curated Stays"].map((f) => (
                  <div key={f} className="text-xs px-3 py-2 rounded-xl glass flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {f}
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">Starting from</div>
                  <div className="font-display text-3xl font-semibold gradient-text-gold">₹14,999</div>
                </div>
                <Link to="/packages" className="px-4 py-2 rounded-full text-sm font-medium glass hover:glow-neon transition">
                  View
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-muted-foreground"
      >
        <span>Scroll to explore</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}