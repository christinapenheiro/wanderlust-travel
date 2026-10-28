import { Headphones, Map, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
] as const;

export function WhyChoose() {
  return (
    <section className="bg-[#e3f3f8] px-6 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl font-medium text-[#111827] md:text-5xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-sm text-neutral-500 md:text-base">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white px-6 py-8 md:px-8 md:py-10"
            >
              <Icon className="size-9 text-[#0d97b1]" strokeWidth={1.8} />
              <h3 className="mt-8 text-xl font-medium text-[#111827] md:text-2xl">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
