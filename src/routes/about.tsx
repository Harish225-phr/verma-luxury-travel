import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { ContactCTA } from "@/components/site/ContactCTA";
import { Stats } from "@/components/site/Stats";
import { Award, Shield, Users, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Verma Tour & Travels" },
      { name: "description", content: "Premium Himachal travel since over a decade. Meet the team behind the journeys." },
    ],
  }),
});

const values = [
  { icon: Shield, title: "Safety First", desc: "ABS, GPS-tracked fleet, trained drivers — non-negotiables on every trip." },
  { icon: Award, title: "Premium Experience", desc: "Luxury Volvos, curated stays, and thoughtful itineraries." },
  { icon: Users, title: "10,000+ Travelers", desc: "Trusted by families, corporates and adventure groups across India." },
  { icon: Sparkles, title: "Always 24/7", desc: "Round-the-clock concierge so you're never alone on the road." },
];

function AboutPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Our story"
        title="Crafting Himalayan journeys with cinematic care."
        subtitle="Verma Tour & Travels was born out of a passion for the Himalayas — and a refusal to compromise on comfort, safety, or experience."
      />
      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-display text-4xl font-semibold">Beyond a travel company. <span className="gradient-text">A travel companion.</span></h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              For over a decade, we have engineered journeys that travelers remember for a lifetime. From luxury Volvo coaches to bespoke Himalayan itineraries, every detail is handled with cinematic care.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our promise is simple — you board a Verma fleet, you arrive happier, safer and with stories worth telling.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-2 gap-4">
            {values.map((v, i) => (
              <div key={i} className="rounded-2xl glass-strong p-6 luxury-border">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "var(--gradient-luxury)" }}>
                  <v.icon className="h-5 w-5 text-white" />
                </div>
                <div className="font-display font-semibold">{v.title}</div>
                <p className="text-xs text-muted-foreground mt-1">{v.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      <Stats />
      <ContactCTA />
    </Layout>
  );
}