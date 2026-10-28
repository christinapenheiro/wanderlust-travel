import { Suspense } from "react";
import { connection } from "next/server";
import { API_BASE_URL } from "@/lib/api";
import { DestinationGrid, type Destination } from "./destination-grid";

async function getDestinations(): Promise<{
  destinations: Destination[];
  error: string | null;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/destination`, { cache: "no-store" });
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    const data: unknown = await res.json();
    return {
      destinations: Array.isArray(data) ? (data as Destination[]) : [],
      error: null,
    };
  } catch {
    return {
      destinations: [],
      error: "Could not load destinations. Make sure the API server is running.",
    };
  }
}

async function DestinationContent() {
  // Data must be fetched per-request (live API), so opt out of static prerender
  await connection();
  const { destinations, error } = await getDestinations();

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-6 pt-16 md:px-8">
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      </div>
    );
  }
  return <DestinationGrid destinations={destinations} />;
}

export default function AllDestinationPage() {
  return (
    <main>
      <Suspense
        fallback={
          <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
            <p className="text-sm text-neutral-500">Loading destinations...</p>
          </div>
        }
      >
        <DestinationContent />
      </Suspense>
    </main>
  );
}
