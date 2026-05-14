import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { ContactCTA } from "@/components/site/ContactCTA";
import busExterior from "@/assets/bus-exterior.jpg";
import busInterior from "@/assets/bus-interior.jpg";
import hero from "@/assets/hero-bus.jpg";
import manali from "@/assets/dest-manali.jpg";
import shimla from "@/assets/dest-shimla.jpg";
import dharamshala from "@/assets/dest-dharamshala.jpg";
import dalhousie from "@/assets/dest-dalhousie.jpg";
import kasol from "@/assets/dest-kasol.jpg";
import ladakh from "@/assets/dest-ladakh.jpg";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  head: () => ({
    meta: [
      { title: "Gallery — Verma Tour & Travels" },
      { name: "description", content: "Cinematic moments from journeys with Verma Tour & Travels." },
    ],
  }),
});

const images = [hero, manali, busInterior, shimla, ladakh, busExterior, dharamshala, kasol, dalhousie];

function GalleryPage() {
  return (
    <Layout>
      <PageHero eyebrow="Gallery" title="Moments worth a thousand kilometers." subtitle="A glimpse into the journeys our travelers cherish forever." />
      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
              className="mb-5 break-inside-avoid rounded-2xl overflow-hidden group relative glass-strong"
            >
              <img src={img} alt={`Gallery ${i + 1}`} loading="lazy" className="w-full h-auto group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
            </motion.div>
          ))}
        </div>
      </section>
      <ContactCTA />
    </Layout>
  );
}