import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";

export type Destination = {
  _id: string;
  name: string;
  country?: string;
  category?: string;
  price?: number;
  duration?: string;
  imageUrl?: string;
  description?: string;
  rating?: number;
};





export default function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link href={`/all-destination/${destination._id} `}>
      <article className="group">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={destination.imageUrl || "/assets/destinations/image1.png"}
            alt={destination.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {typeof destination.rating === "number" && (
            <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-sm bg-black/55 px-2.5 py-1 text-xs font-semibold text-white">
              {destination.rating}
              <Star className="size-3 fill-white" />
            </span>
          )}
        </div>

        {/* Body */}
        <div className="mt-4">
          <p className="flex items-center gap-1.5 text-sm text-gray-600">
            <MapPin className="size-4 text-gray-500" />
            {destination.country || "—"}
          </p>
          <div className="mt-1.5 flex items-baseline justify-between gap-3">
            <h3 className="text-lg font-medium text-[#111827]">
              {destination.name}
            </h3>
            <p className="shrink-0 text-lg font-semibold text-[#111827]">
              {destination.price ?? 0}
              <span className="text-xs font-normal text-gray-500">/Person</span>
            </p>
          </div>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-600">
            <CalendarDays className="size-4 text-gray-500" />
            {destination.duration || "—"}
          </p>
          <span
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold tracking-wide text-[#0d97b1] underline underline-offset-4 hover:text-[#0b82a0]"
          >
            BOOK NOW
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </article>
    </Link>
  );
}
