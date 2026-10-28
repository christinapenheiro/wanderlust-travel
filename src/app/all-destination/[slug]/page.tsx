import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Edit2,
  MapPin,
  Star,
  Trash2,
} from "lucide-react";

const destinationDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const res = await fetch(`http://localhost:8000/destination/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Destination not found</h1>
          <p className="mt-2 text-gray-600">We couldn&apos;t find a destination matching {slug}.</p>
        </div>
      </div>
    );
  }
  const data = await res.json();

  const highlights: string[] = Array.isArray(data.highlights) ? data.highlights : [];
  const benefits: string[] = Array.isArray(data.benefits) ? data.benefits : [
    "Free cancelation up to 7 days",
    "Travel Insurance included",
    "24/7 customer support",
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2 text-sm text-gray-600 hover:cursor-pointer group">
          <ArrowLeft className="w-4 h-4 group-hover:text-blue-600 transition-colors" />
          <span className="group-hover:text-blue-600 transition-colors">
            Back to Destinations
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition">
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-red-500 rounded-md text-red-500 hover:bg-red-50 transition">
            <Trash2 className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </nav>

      {/* Hero image */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden rounded-2xl shadow-md">
          <Image
            src={
              data.imageUrl ||
              "https://images.unsplash.com/photo-1469843038725-bb6910b76547?q=80&w=2070&auto=format&fit=crop"
            }
            alt={data.name || "Destination"}
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left column: details */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>{data.country}</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {data.name}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-medium">{data.rating}</span>
              </div>
              <span>({data.reviews} reviews)</span>
              <span className="w-px h-4 bg-gray-300 mx-2" aria-hidden="true" />
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{data.duration}</span>
              </div>
            </div>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Overview
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {data.description}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Highlights
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {data.highlightsSummary || data.overview}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {highlights.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                    <span className="text-sm text-gray-600 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right column: booking card */}
          <div className="lg:col-span-5">
            <div className="sticky top-8 border border-gray-200 rounded-xl p-6 bg-gray-50 shadow-sm">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Starting from
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {data.price}
              </div>
              <div className="text-sm text-gray-600 mb-6">per person</div>

              <div className="mb-6">
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Select date
                </label>
                <div className="flex items-center justify-between px-3 py-2.5 border border-gray-300 rounded-md bg-white">
                  <span className="text-gray-900">{data.date}</span>
                </div>
              </div>

              <button className="w-full mb-6 inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                Book Now
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="space-y-3 text-sm text-gray-600">
                {benefits.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default destinationDetailsPage;
