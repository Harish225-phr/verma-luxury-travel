import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Services } from "@/components/site/Services";
import { Facilities } from "@/components/site/Facilities";
import { ContactCTA } from "@/components/site/ContactCTA";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — Verma Tour & Travels" },
      { name: "description", content: "Luxury bus rentals, Himachal tour packages, corporate tours, weddings & more." },
    ],
  }),
});

function ServicesPage() {
  return (
    <Layout>
      <PageHero eyebrow="Services" title="Travel, perfected." subtitle="From a single airport pickup to a 10-day Himalayan expedition — we handle it all." />
      <Services />
      <Facilities />
      <ContactCTA />
    </Layout>
  );
}