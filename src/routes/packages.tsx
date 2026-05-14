import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Destinations } from "@/components/site/Destinations";
import { ContactCTA } from "@/components/site/ContactCTA";
import { Check } from "lucide-react";

export const Route = createFileRoute("/packages")({
  component: PackagesPage,
  head: () => ({
    meta: [
      { title: "Tour Packages — Verma Tour & Travels" },
      { name: "description", content: "Curated Himachal & Ladakh tour packages with luxury fleet, stays and itineraries." },
    ],
  }),
});

const packages = [
  { name: "Manali Premium", duration: "5N · 6D", price: "₹14,999", tag: "Bestseller", inc: ["Volvo AC", "4★ Stays", "Sightseeing", "Breakfast"] },
  { name: "Shimla Escape", duration: "3N · 4D", price: "₹9,499", tag: "Family Pick", inc: ["AC Coach", "Hotel Stay", "Toy Train", "Local Tour"] },
  { name: "Leh Ladakh Expedition", duration: "7N · 8D", price: "₹29,999", tag: "Premium", inc: ["Volvo + SUV", "Pangong Camp", "Khardung La", "Oxygen Kit"] },
  { name: "Kasol Weekend", duration: "2N · 3D", price: "₹6,499", tag: "Quick Trip", inc: ["Tempo Traveller", "Riverside Stay", "Bonfire", "Treks"] },
  { name: "Dharamshala Spiritual", duration: "4N · 5D", price: "₹12,499", tag: "Curated", inc: ["AC Coach", "Monastery Visits", "Triund Trek", "Cafes"] },
  { name: "Dalhousie Snow", duration: "3N · 4D", price: "₹10,999", tag: "Winter", inc: ["Volvo AC", "Khajjiar", "Snow Activities", "3★ Stays"] },
];

function PackagesPage() {
  return (
    <Layout>
      <PageHero eyebrow="Tour packages" title="Pick a journey. We handle the rest." subtitle="Carefully curated packages with premium fleet, stays and unforgettable experiences." />
      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {packages.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -8 }}
              className="rounded-3xl glass-strong p-7 relative overflow-hidden group luxury-border"
            >
              <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition" style={{ background: "var(--gradient-luxury)" }} />
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-[0.2em] text-accent">{p.duration}</div>
                <div className="px-2 py-1 rounded-full text-[10px] font-semibold" style={{ background: "var(--gradient-gold)", color: "#000" }}>{p.tag}</div>
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold">{p.name}</h3>
              <div className="mt-4 font-display text-4xl gradient-text-gold font-semibold">{p.price}</div>
              <div className="text-xs text-muted-foreground">per person</div>
              <ul className="mt-5 space-y-2">
                {p.inc.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-emerald-glow" /> {f}
                  </li>
                ))}
              </ul>
              <a href="tel:9816492182" className="mt-6 inline-flex w-full items-center justify-center px-4 py-3 rounded-full font-medium text-white" style={{ background: "var(--gradient-luxury)" }}>
                Book Now
              </a>
            </motion.div>
          ))}
        </div>
      </section>
      <Destinations />
      <ContactCTA />
    </Layout>
  );
}