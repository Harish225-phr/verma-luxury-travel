import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Verma Tour & Travels" },
      { name: "description", content: "Talk to our 24/7 travel concierge. Plan your luxury Himalayan journey today." },
    ],
  }),
});

const numbers = ["98164 92182", "70184 74668", "70181 82353", "98168 29511"];

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <Layout>
      <PageHero eyebrow="Contact" title="Let's plan your next escape." subtitle="Drop a message or just call us — we are available 24/7." />
      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-5 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-3 rounded-3xl glass-strong p-8 luxury-border">
            <h2 className="font-display text-2xl font-semibold">Send us a message</h2>
            <p className="text-sm text-muted-foreground mt-1">We'll get back to you within an hour.</p>
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[
                { name: "name", label: "Full Name", type: "text" },
                { name: "phone", label: "Phone Number", type: "tel" },
                { name: "email", label: "Email", type: "email", full: true },
                { name: "destination", label: "Destination", type: "text", full: true },
              ].map((f) => (
                <div key={f.name} className={f.full ? "md:col-span-2" : ""}>
                  <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{f.label}</label>
                  <input
                    required
                    type={f.type}
                    className="mt-2 w-full px-4 py-3 rounded-xl glass border border-border focus:outline-none focus:border-accent focus:glow-neon transition bg-transparent"
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Message</label>
                <textarea rows={4} className="mt-2 w-full px-4 py-3 rounded-xl glass border border-border focus:outline-none focus:border-accent focus:glow-neon transition bg-transparent resize-none" />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium text-white" style={{ background: "var(--gradient-luxury)", boxShadow: "var(--shadow-glow)" }}>
                  {sent ? "Message sent ✓" : (<><Send className="h-4 w-4" /> Send Message</>)}
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2 space-y-4">
            <div className="rounded-3xl glass-strong p-6">
              <div className="text-xs uppercase tracking-[0.2em] text-accent">Call us 24/7</div>
              <div className="mt-3 grid grid-cols-1 gap-2">
                {numbers.map((n) => (
                  <a key={n} href={`tel:${n.replace(/\s/g, "")}`} className="flex items-center justify-between px-4 py-3 rounded-xl glass hover:glow-neon transition group">
                    <span className="flex items-center gap-2 font-medium"><Phone className="h-4 w-4 text-accent" /> {n}</span>
                    <span className="text-xs text-muted-foreground group-hover:text-accent">Call →</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="rounded-3xl glass-strong p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-accent mt-1" />
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</div>
                  <div className="mt-1">info@vermatravels.in</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent mt-1" />
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Location</div>
                  <div className="mt-1">Himachal Pradesh, India</div>
                </div>
              </div>
              <a href="https://wa.me/919816492182" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white font-medium" style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>
            <a href="https://maps.app.goo.gl/KWc73Cf2veWwVNuWA" target="_blank" rel="noopener noreferrer" className="block rounded-3xl glass-strong p-2 overflow-hidden group relative">
              <iframe
                title="Map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d432418.9!2d77.0!3d31.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1700000000000"
                className="w-full h-64 rounded-2xl border-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition duration-500 pointer-events-none"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition rounded-3xl">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium">
                  <MapPin className="h-4 w-4 text-accent" />
                  Open in Google Maps
                </div>
              </div>
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}