import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import manali from "@/assets/dest-manali.jpg";
import shimla from "@/assets/dest-shimla.jpg";
import dharamshala from "@/assets/dest-dharamshala.jpg";
import dalhousie from "@/assets/dest-dalhousie.jpg";
import kasol from "@/assets/dest-kasol.jpg";
import ladakh from "@/assets/dest-ladakh.jpg";

const dests = [
  { name: "Manali", img: manali, tag: "Snow Capital", days: "5N · 6D" },
  { name: "Shimla", img: shimla, tag: "Queen of Hills", days: "3N · 4D" },
  { name: "Dharamshala", img: dharamshala, tag: "Spiritual Escape", days: "4N · 5D" },
  { name: "Dalhousie", img: dalhousie, tag: "Pine Paradise", days: "3N · 4D" },
  { name: "Kasol", img: kasol, tag: "Mini Israel", days: "2N · 3D" },
  { name: "Leh Ladakh", img: ladakh, tag: "Last Frontier", days: "7N · 8D" },
];

export function Destinations() {
  return (
    <section className="relative py-32 px-6">
      <SectionHeading
        eyebrow="Destinations"
        title="Where would you like to wake up tomorrow?"
        subtitle="Handpicked Himalayan escapes designed to feel like a film you'll never forget."
      />

      <div className="mx-auto max-w-7xl mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {dests.map((d, i) => (
          <motion.a
            key={d.name}
            href="#"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            whileHover={{ y: -8 }}
            className="group relative rounded-3xl overflow-hidden block aspect-[4/5]"
          >
            <img src={d.img} alt={d.name} loading="lazy" width={1024} height={1280} className="absolute inset-0 h-full w-full object-cover transition duration-[1.6s] group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500" style={{ background: "linear-gradient(135deg, oklch(0.65 0.25 285 / 0.3), transparent 60%)" }} />

            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full glass text-xs">
              <MapPin className="h-3 w-3 text-accent" /> {d.tag}
            </div>
            <div className="absolute top-4 right-4 h-9 w-9 rounded-full glass flex items-center justify-center group-hover:rotate-45 transition">
              <ArrowUpRight className="h-4 w-4" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="text-xs text-muted-foreground">{d.days}</div>
              <h3 className="font-display text-3xl md:text-4xl font-semibold mt-1">{d.name}</h3>
              <div className="mt-3 h-px w-12 bg-accent group-hover:w-24 transition-all duration-500" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}