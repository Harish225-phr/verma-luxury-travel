import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Facilities } from "@/components/site/Facilities";
import { ContactCTA } from "@/components/site/ContactCTA";
import busExterior from "@/assets/bus-exterior.jpg";
import busInterior from "@/assets/bus-interior.jpg";

export const Route = createFileRoute("/fleet")({
  component: FleetPage,
  head: () => ({
    meta: [
      { title: "Fleet — Verma Tour & Travels" },
      { name: "description", content: "Premium Volvo coaches, AC sleepers, tempo travellers — meet the Verma fleet." },
    ],
  }),
});

const vehicles = [
  { img: busExterior, name: "Volvo 9400 — 45 Seater", desc: "Premium AC luxury coach with reclining seats, ambient lighting, GPS, on-board entertainment.", capacity: "45 Pax" },
  { img: busInterior, name: "Premium Sleeper Coach", desc: "Cinematic interiors with leather sleeper berths, reading lights and Wi-Fi.", capacity: "30 Berths" },
  { img: busExterior, name: "Mercedes Mini Coach", desc: "Compact luxury for small groups, families & corporate offsites.", capacity: "20 Pax" },
  { img: busInterior, name: "Tempo Traveller Lux", desc: "9 to 17-seater for weekends & quick mountain getaways.", capacity: "9-17 Pax" },
];

function FleetPage() {
  return (
    <Layout>
      <PageHero eyebrow="The Fleet" title="Engineered for the road. Tuned for luxury." subtitle="Every vehicle in our fleet is hand-picked, premium-maintained, and travel-ready." />
      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-6">
          {vehicles.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className="rounded-3xl overflow-hidden glass-strong group"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={v.img} alt={v.name} loading="lazy" width={1280} height={896} className="h-full w-full object-cover group-hover:scale-110 transition duration-[1.4s]" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-semibold">{v.name}</h3>
                  <span className="text-xs px-3 py-1 rounded-full glass">{v.capacity}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <Facilities />
      <ContactCTA />
    </Layout>
  );
}