import { motion } from "framer-motion";
import { Snowflake, Tv, Navigation, Music, Camera, Armchair, ShieldCheck, HeartPulse } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const facilities = [
  { icon: Snowflake, label: "AC" },
  { icon: Tv, label: "Video" },
  { icon: Navigation, label: "GPS System" },
  { icon: Music, label: "Music" },
  { icon: Camera, label: "Camera" },
  { icon: Armchair, label: "Comfort Seat" },
  { icon: ShieldCheck, label: "ABS" },
  { icon: HeartPulse, label: "First Aid" },
];

export function Facilities() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* rotating glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="h-[700px] w-[700px] rounded-full opacity-30"
          style={{ background: "conic-gradient(from 0deg, transparent, oklch(0.65 0.25 285 / 0.4), transparent, oklch(0.72 0.2 165 / 0.3), transparent)" }}
        />
      </div>

      <SectionHeading
        eyebrow="On-board luxury"
        title="Every detail, engineered."
        subtitle="Our fleet is loaded with premium facilities to make every kilometer feel like first class."
      />

      <div className="mx-auto max-w-6xl mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
        {facilities.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileHover={{ y: -6, scale: 1.03 }}
            className="relative rounded-2xl glass-strong p-6 flex flex-col items-center justify-center text-center luxury-border hover:glow-purple transition group"
          >
            <div className="h-14 w-14 rounded-2xl flex items-center justify-center mb-3" style={{ background: "var(--gradient-luxury)" }}>
              <f.icon className="h-6 w-6 text-white" />
            </div>
            <div className="font-display font-semibold tracking-wide">{f.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}