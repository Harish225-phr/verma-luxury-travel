import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const reviews = [
  { name: "Priya Sharma", role: "Family Trip · Manali", text: "Absolutely cinematic experience. The Volvo was spotless, driver was professional, and the tour was perfectly timed. Felt like flying first class on wheels." },
  { name: "Rohit Verma", role: "Corporate Offsite", text: "Booked Verma for a 60-person corporate retreat. Everything from pickup to drop felt premium. Will definitely book again." },
  { name: "Aman Gupta", role: "Leh Ladakh · 8D", text: "The Ladakh expedition was beyond expectations. Comfortable seats, great stops, and the team handled everything beautifully." },
  { name: "Neha Kapoor", role: "Wedding Transport", text: "All our guests received compliments on the luxury fleet. On-time, classy and safe. Highly recommended for weddings." },
];

export function Testimonials() {
  return (
    <section className="relative py-32 px-6">
      <SectionHeading
        eyebrow="Voices of travelers"
        title="Loved by 10,000+ travelers"
        subtitle="Real stories from real journeys."
      />

      <div className="mx-auto max-w-7xl mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
        {reviews.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
            className="relative rounded-3xl glass-strong p-8 group hover:glow-purple transition duration-500"
          >
            <Quote className="absolute top-6 right-6 h-10 w-10 text-accent/30" />
            <div className="flex gap-1">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-current text-gold" />
              ))}
            </div>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed">"{r.text}"</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-full p-[2px]" style={{ background: "var(--gradient-luxury)" }}>
                <div className="h-full w-full rounded-full bg-card flex items-center justify-center font-display font-semibold">
                  {r.name.charAt(0)}
                </div>
              </div>
              <div>
                <div className="font-display font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}