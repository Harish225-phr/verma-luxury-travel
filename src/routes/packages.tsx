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
  { name: "Kunihar to Vrindavan", duration: "3N · 4D", price: "₹5,000", tag: "Devotional", category: "Religious", inc: ["AC Coach", "Food Included", "Temple Darshan", "Hotel Stay"] },
  { name: "Prayagraj Sangam", duration: "3N · 4D", price: "₹6,500", tag: "Spiritual", category: "Religious", inc: ["Sangam Snan", "Luxury Bus", "Meals", "Guide"] },
  { name: "Varanasi Kashi", duration: "3N · 4D", price: "₹6,800", tag: "Sacred", category: "Religious", inc: ["Ganga Aarti", "AC Stay", "Food", "Boat Ride"] },
  { name: "Ayodhya Dham", duration: "3N · 4D", price: "₹6,200", tag: "Ram Mandir", category: "Religious", inc: ["Ram Mandir", "AC Coach", "Meals", "Hotel"] },
  { name: "Kedarnath Yatra", duration: "5N · 6D", price: "₹7,000", tag: "Holy Trip", category: "Religious", inc: ["Pony / Heli Asst.", "Food Included", "Safe Drivers", "Hotel"] },
  { name: "Vaishno Devi", duration: "3N · 4D", price: "₹7,500", tag: "Maa Darshan", category: "Religious", inc: ["Helicopter Option", "AC Coach", "Meals", "Hotel"] },
  { name: "Char Dham Yatra", duration: "10N · 11D", price: "₹24,999", tag: "Premium", category: "Religious", inc: ["All 4 Dhams", "Luxury Coach", "All Meals", "3★ Stays"] },
  { name: "Manali Snow Escape", duration: "5N · 6D", price: "₹12,500", tag: "Bestseller", category: "Hill Station", inc: ["Volvo AC", "Solang Valley", "4★ Stay", "Breakfast"] },
  { name: "Shimla Heritage", duration: "3N · 4D", price: "₹8,500", tag: "Family Pick", category: "Hill Station", inc: ["Toy Train", "Hotel Stay", "Local Tour", "Meals"] },
  { name: "Haridwar Ganga", duration: "2N · 3D", price: "₹4,500", tag: "Weekend", category: "Religious", inc: ["Har Ki Pauri", "AC Coach", "Hotel", "Aarti"] },
  { name: "Rishikesh Adventure", duration: "2N · 3D", price: "₹5,500", tag: "Adventure", category: "Adventure", inc: ["Rafting", "Camp Stay", "Bonfire", "Meals"] },
  { name: "All Over India Tour", duration: "Custom", price: "On Request", tag: "Custom Plan", category: "Premium", inc: ["Pan India", "Luxury Fleet", "Curated Stays", "24/7 Support"] },
];

const features = [
  "Food Included", "Luxury Travel", "Comfortable Buses", "Safe Journey", "Family Trips", "Religious Tours",
];

function PackagesPage() {
  return (
    <Layout>
      <PageHero eyebrow="Tour packages" title="Pick a journey. We handle the rest." subtitle="Carefully curated packages with premium fleet, stays and unforgettable experiences." />
      <section className="px-6">
        <div className="mx-auto max-w-7xl flex flex-wrap justify-center gap-3">
          {features.map((f) => (
            <span key={f} className="px-4 py-2 rounded-full glass text-xs uppercase tracking-wider text-muted-foreground luxury-border">
              {f}
            </span>
          ))}
        </div>
      </section>
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
              <div className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">{p.category}</div>
              <div className="mt-4 font-display text-4xl gradient-text-gold font-semibold">{p.price}</div>
              <div className="text-xs text-muted-foreground">{p.price === "On Request" ? "Custom quote" : "per person"}</div>
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