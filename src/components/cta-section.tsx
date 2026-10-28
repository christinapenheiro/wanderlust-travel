import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden px-6 py-24 text-center">
      <Image
        src="/assets/CTA.png"
        alt="Aerial view of a plane flying over a tropical coastline"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative">
        <h2 className="text-4xl font-medium text-white md:text-5xl lg:text-6xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-sm text-white/90 md:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Button className="mt-8 h-14 gap-2.5 rounded-md bg-white px-8 text-xs font-semibold tracking-wider text-black uppercase hover:bg-white/85">
          Book Your Trip Today
          <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
    </section>
  );
}
