import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const searchFields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime / 3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
] as const;

export function Banner() {
  return (
    <section className="relative flex min-h-[560px] flex-col">
      {/* Background */}
      <Image
        src="/assets/Banner.png"
        alt="Coastal destination"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/25" />

      {/* Hero content */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-20 text-center text-white">
        <h1 className="max-w-3xl text-5xl font-semibold leading-tight md:text-6xl lg:text-7xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-6 max-w-xl text-base text-white/90 md:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button className="h-12 gap-2 rounded-md bg-[#0d97b1] px-8 text-xs font-semibold tracking-wider text-white uppercase hover:bg-[#0b82a0]">
            Explore Now
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button className="h-12 rounded-md bg-white/85 px-8 text-xs font-semibold tracking-wider text-black uppercase hover:bg-white/70">
            View Destination
          </Button>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative">
        <div className="grid grid-cols-2 gap-px bg-white/20 md:grid-cols-5">
          {searchFields.map((field) => (
            <label
              key={field.label}
              className="flex cursor-text flex-col gap-0.5 bg-black/30 px-5 py-3 backdrop-blur-[2px]"
            >
              <span className="text-sm font-semibold text-white">
                {field.label}
              </span>
              <input
                type="text"
                placeholder={field.placeholder}
                className="w-full bg-transparent text-xs text-white placeholder:text-white/70 focus:outline-none"
              />
            </label>
          ))}
          <Button className="col-span-2 h-auto rounded-none bg-[#0d97b1] py-3 text-sm font-medium text-white hover:bg-[#0b82a0] md:col-span-1">
            Search
          </Button>
        </div>
        <div className="h-1 bg-[#0d97b1]" />
      </div>
    </section>
  );
}
