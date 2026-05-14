import { motion } from "framer-motion";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const numbers = ["98164 92182", "70184 74668", "70181 82353", "98168 29511"];

export function ContactCTA() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2rem] overflow-hidden p-10 md:p-16 text-center"
          style={{ background: "linear-gradient(135deg, oklch(0.12 0.04 285), oklch(0.08 0.03 230))" }}
        >
          <div className="absolute inset-0 -z-10 opacity-50" style={{ background: "var(--gradient-glow)" }} />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(0.65 0.25 285), transparent)" }} />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs uppercase tracking-[0.2em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-glow animate-pulse" />
            Ready when you are
          </div>
          <h2 className="mt-5 font-display text-4xl md:text-6xl font-semibold tracking-tight">
            Your next <span className="gradient-text">cinematic journey</span>
            <br />begins with a call.
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
            Talk to our travel concierge — available 24/7 to plan your perfect Himalayan escape.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {numbers.map((n) => (
              <a key={n} href={`tel:${n.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass hover:glow-neon transition text-sm font-medium">
                <Phone className="h-4 w-4 text-accent" /> {n}
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium text-white" style={{ background: "var(--gradient-luxury)", boxShadow: "var(--shadow-glow)" }}>
              Plan My Trip <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="https://wa.me/919816492182" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium glass">
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}