import { Banner } from "@/components/banner";
import { WhyChoose } from "@/components/why-choose";
import { Testimonials } from "@/components/testimonials";
import { CtaSection } from "@/components/cta-section";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Banner />
        <WhyChoose />
        <Testimonials />
        <CtaSection />
      </main>
    </>
  );
}
