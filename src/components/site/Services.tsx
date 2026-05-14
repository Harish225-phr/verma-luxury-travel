import { motion } from "framer-motion";
import { Bus, Mountain, Users, Briefcase, Heart, Plane, Compass, UsersRound } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const services = [
  { icon: Bus, title: "Luxury Bus Rental", desc: "Premium AC Volvo & sleeper coaches for any group size." },
  { icon: Mountain, title: "Himachal Tour Packages", desc: "Curated journeys through Manali, Shimla, Ladakh & beyond." },
  { icon: Users, title: "Family Trips", desc: "Comfortable, safe and memorable family vacations." },
  { icon: Briefcase, title: "Corporate Tours", desc: "Offsites, retreats and team travels handled end-to-end." },
  { icon: Heart, title: "Wedding Transportation", desc: "Make every guest feel VIP with luxury fleets." },
  { icon: Plane, title: "Airport Pickup & Drop", desc: "On-time, premium pickup & drop services." },
  { icon: Compass, title: "Adventure Tours", desc: "Expedition-grade trips for thrill-seekers." },
  { icon: UsersRound, title: "Group Travel Services", desc: "Schools, communities and large group travel." },
];

export function Services() {
  return (
    <section className="relative py-32 px-6">
      <SectionHeading
        eyebrow="What we offer"
        title="Services crafted for premium travel"
        subtitle="Every journey we plan is engineered for comfort, safety and a touch of cinematic luxury."
      />

      <div className="mx-auto max-w-7xl mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
            whileHover={{ y: -8 }}
            className="group relative rounded-3xl p-6 glass hover:glass-strong transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 -z-10" style={{ background: "radial-gradient(circle at 50% 0%, oklch(0.65 0.25 285 / 0.25), transparent 70%)" }} />
            <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition duration-700" style={{ background: "var(--gradient-luxury)" }} />

            <div className="relative h-12 w-12 rounded-2xl flex items-center justify-center glass group-hover:luxury-border transition">
              <s.icon className="h-5 w-5 text-accent" />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>

            <div className="mt-5 inline-flex items-center gap-1 text-xs text-accent opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition">
              Learn more →
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}