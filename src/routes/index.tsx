import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Facilities } from "@/components/site/Facilities";
import { VehicleShowcase } from "@/components/site/VehicleShowcase";
import { Destinations } from "@/components/site/Destinations";
import { Stats } from "@/components/site/Stats";
import { Testimonials } from "@/components/site/Testimonials";
import { ContactCTA } from "@/components/site/ContactCTA";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Verma Tour & Travels — Travel Beyond Limits" },
      { name: "description", content: "Luxury bus rentals & Himachal tour packages with comfort, safety & unforgettable experiences." },
    ],
  }),
});

function Index() {
  return (
    <Layout>
      <Hero />
      <Services />
      <Facilities />
      <VehicleShowcase />
      <Destinations />
      <Stats />
      <Testimonials />
      <ContactCTA />
    </Layout>
  );
}
