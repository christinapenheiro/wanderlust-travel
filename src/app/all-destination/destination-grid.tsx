"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import DestinationCard from "./destinationCard";

export type Destination = {
  _id:string,
  name: string;
  country?: string;
  category?: string;
  price?: number;
  duration?: string;
  imageUrl?: string;
  description?: string;
  rating?: number;
};

const priceRanges = [
  { label: "Under $1000", test: (p: number) => p < 1000 },
  { label: "$1000 - $2000", test: (p: number) => p >= 1000 && p <= 2000 },
  { label: "$2000+", test: (p: number) => p > 2000 },
] as const;

const sortOptions = [
  "Price: Low to High",
  "Price: High to Low",
  "Duration: Shortest First",
] as const;

// function DestinationCard({ destination }: { destination: Destination }) {
//   return (
//     <Link href={`/all-destination/${destination._id} `}>
//       <article className="group">
//         {/* Image */}
//         <div className="relative aspect-[16/10] overflow-hidden">
//           <Image
//             src={destination.imageUrl || "/assets/destinations/image1.png"}
//             alt={destination.name}
//             fill
//             className="object-cover transition-transform duration-300 group-hover:scale-105"
//             sizes="(max-width: 768px) 100vw, 33vw"
//           />
//           {typeof destination.rating === "number" && (
//             <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-sm bg-black/55 px-2.5 py-1 text-xs font-semibold text-white">
//               {destination.rating}
//               <Star className="size-3 fill-white" />
//             </span>
//           )}
//         </div>

//         {/* Body */}
//         <div className="mt-4">
//           <p className="flex items-center gap-1.5 text-sm text-gray-600">
//             <MapPin className="size-4 text-gray-500" />
//             {destination.country || "—"}
//           </p>
//           <div className="mt-1.5 flex items-baseline justify-between gap-3">
//             <h3 className="text-lg font-medium text-[#111827]">
//               {destination.name}
//             </h3>
//             <p className="shrink-0 text-lg font-semibold text-[#111827]">
//               {destination.price ?? 0}
//               <span className="text-xs font-normal text-gray-500">/Person</span>
//             </p>
//           </div>
//           <p className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-600">
//             <CalendarDays className="size-4 text-gray-500" />
//             {destination.duration || "—"}
//           </p>
//           <Link
//             href="#"
//             className="mt-3 inline-flex items-center gap-1 text-sm font-semibold tracking-wide text-[#0d97b1] underline underline-offset-4 hover:text-[#0b82a0]"
//           >
//             BOOK NOW
//             <ArrowUpRight className="size-4" />
//           </Link>
//         </div>
//       </article>
//     </Link>
//   );
// }

export function DestinationGrid({ destinations }: { destinations: Destination[] }) {
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(destinations.map((d) => d.category).filter(Boolean))),
    [destinations]
  );

  const visible = useMemo(() => {
    let list = [...destinations];
    if (category) list = list.filter((d) => d.category === category);
    if (priceRange) {
      const range = priceRanges.find((r) => r.label === priceRange);
      if (range) list = list.filter((d) => range.test(d.price ?? 0));
    }
    if (sortBy === "Price: Low to High")
      list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    else if (sortBy === "Price: High to Low")
      list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    else if (sortBy === "Duration: Shortest First")
      list.sort((a, b) => (parseInt(a.duration ?? "0") || 0) - (parseInt(b.duration ?? "0") || 0));
    return list;
  }, [destinations, category, priceRange, sortBy]);

  const selectClass = "h-10 w-full justify-between rounded-md bg-[#fafafa] border-gray-200 pr-3 pl-3 text-sm uppercase";

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">
      <h1 className="text-4xl font-medium text-[#111827] md:text-5xl">
        Explore All Destinations
      </h1>
      <p className="mt-3 text-sm text-neutral-500 md:text-base">
        Find your perfect travel experience from our curated collection
      </p>

      {/* Filters */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Select
          value={category}
          onValueChange={(v) => setCategory(v as string)}
        >
          <SelectTrigger
            className={cn(selectClass, !category && "text-neutral-500")}
          >
            <SelectValue placeholder="Category">
              {category || "Category"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c as string}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={priceRange}
          onValueChange={(v) => setPriceRange(v as string)}
        >
          <SelectTrigger
            className={cn(selectClass, !priceRange && "text-neutral-500")}
          >
            <SelectValue placeholder="Price Range">
              {priceRange || "Price Range"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map((r) => (
              <SelectItem key={r.label} value={r.label}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={(v) => setSortBy(v as string)}>
          <SelectTrigger
            className={cn(selectClass, !sortBy && "text-neutral-500")}
          >
            <SelectValue placeholder="Sort By">
              {sortBy || "Sort By"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="mt-4 text-sm text-neutral-600">
        Showing {visible.length} destinations
      </p>

      {/* Grid */}
      {visible.length > 0 ? (
        <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((destination, i) => (  
              <DestinationCard
                destination={destination}
                key={`${destination.name}-${i}`}
              />
          ))}
        </div>
      ) : (
        <div className="mt-6 border border-dashed border-gray-300 px-6 py-16 text-center">
          <p className="text-sm text-neutral-500">
            No destinations match your filters yet.
          </p>
          <p className="mt-1 text-xs text-neutral-400">
            Add travel packages from the admin page to populate this list.
          </p>
        </div>
      )}
    </div>
  );
}
