import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import busExterior from "@/assets/verma-bus-ramgarhia.jpg";
import busInterior from "@/assets/verma-van-front.png";

const tags = ["Luxury Interior", "Premium Comfort", "Safe Journey", "Tourist Special", "Sleeper Coach", "Volvo AC", "Tempo Traveller", "Mini Coach"];

export function VehicleShowcase() {
  return (
    <section className="relative py-32 px-6">
      <SectionHeading
        eyebrow="The Fleet"
        title="Cinematic comfort, on wheels"
        subtitle="From premium Volvo coaches to spacious tempo travellers — meet our handpicked fleet."
      />

      <div className="mx-auto max-w-7xl mt-16 grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="group relative rounded-3xl overflow-hidden glass-strong"
        >
          <div className="aspect-[4/3] overflow-hidden">
            <img src={busExterior} alt="Premium luxury bus exterior" loading="lazy" width={1280} height={896} className="h-full w-full object-cover group-hover:scale-110 transition duration-[1.4s]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-accent">Premium Series</div>
            <h3 className="mt-1 font-display text-2xl md:text-3xl font-semibold">Volvo Luxury Coach</h3>
            <p className="text-sm text-muted-foreground mt-1">45-seater with reclining seats, ambient lighting, GPS & onboard entertainment.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="group relative rounded-3xl overflow-hidden glass-strong"
        >
          <div className="aspect-[4/3] overflow-hidden">
            <img src={busInterior} alt="Luxury bus interior with neon ambient lighting" loading="lazy" width={1280} height={896} className="h-full w-full object-cover group-hover:scale-110 transition duration-[1.4s]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-accent">Inside the Cabin</div>
            <h3 className="mt-1 font-display text-2xl md:text-3xl font-semibold">Cinematic Interiors</h3>
            <p className="text-sm text-muted-foreground mt-1">Premium leather, ambient LED lighting & first-class legroom on every ride.</p>
          </div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="mt-12 relative overflow-hidden">
        <div className="flex gap-4 animate-scroll-x w-max">
          {[...tags, ...tags].map((t, i) => (
            <div key={i} className="px-6 py-3 rounded-full glass text-sm whitespace-nowrap">
              <span className="gradient-text font-medium">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}