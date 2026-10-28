"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    photo: "/assets/person1.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    photo: "/assets/person2.png",
  },
  {
    quote:
      '"Santorini At Sunset Was Everything We Dreamed Of. The Private Tour And Local Dining Experiences Made This Our Best Vacation Yet."',
    name: "Amelia Ortiz",
    location: "Barcelona, Spain",
    photo: "/assets/destinations/image3.png",
  },
  {
    quote:
      '"Kyoto In Cherry Blossom Season Was stunning. Every Temple Visit And Tea Ceremony Was Flawlessly Organized By The Team."',
    name: "Daniel Park",
    location: "Toronto, Canada",
    photo: "/assets/destinations/image4.png",
  },
] as const;

const VISIBLE = 2;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const maxIndex = testimonials.length - VISIBLE;

  return (
    <section className="bg-white px-6 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-medium text-[#111827] md:text-5xl">
              What Travelers Say
            </h2>
            <p className="mt-3 text-sm text-neutral-500">
              Real experiences from our happy travelers
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              className="flex size-11 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition hover:border-[#0d97b1] hover:text-[#0d97b1] disabled:pointer-events-none disabled:opacity-40"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))}
              disabled={index === maxIndex}
              className="flex size-11 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition hover:border-[#0d97b1] hover:text-[#0d97b1] disabled:pointer-events-none disabled:opacity-40"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-10 overflow-hidden">
          <div
            className="grid grid-flow-col auto-cols-[calc(50%-8px)] gap-4 transition-transform duration-300 ease-out max-md:auto-cols-full"
            style={{ transform: `translateX(calc(${index} * (-50% - 8px)))` }}
          >
            {testimonials.map(({ quote, name, location, photo }) => (
              <article
                key={name}
                className="flex shrink-0 flex-col gap-6 border border-neutral-200 p-6 sm:flex-row sm:items-stretch sm:gap-8"
              >
                <div className="flex flex-1 flex-col">
                  <blockquote className="text-lg leading-snug text-[#111827]">
                    {quote}
                  </blockquote>
                  <footer className="mt-auto pt-8">
                    <p className="flex items-center gap-2 text-sm font-medium text-[#0d97b1]">
                      <span className="inline-block h-px w-4 bg-[#0d97b1]" />
                      {name}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">{location}</p>
                  </footer>
                </div>
                <div className="relative aspect-[4/4.2] w-full shrink-0 sm:w-2/5">
                  <Image
                    src={photo}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 260px"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
