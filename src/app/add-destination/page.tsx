"use client";

import { useState } from "react";
import { ClipboardList, Trash2 } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const initialForm = {
  name: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

const categories = ["Beach", "Adventure", "Cultural", "Luxury", "Family"];

const emptyForm = initialForm;

// Backend endpoint for creating travel packages
const DESTINATION_API_URL = `${API_BASE_URL}/destination`;

type SubmitState = "idle" | "submitting" | "success" | "error";

function FormField({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <Label className="mb-2 block text-sm font-medium text-gray-800">
        {label}
      </Label>
      {children}
    </div>
  );
}

export default function AddDestinationPage() {
  const [form, setForm] = useState(initialForm);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const set = (key: keyof typeof initialForm) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit() {
    setSubmitState("submitting");
    setErrorMessage("");
    try {
      const response = await fetch(DESTINATION_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          country: form.country,
          category: form.category,
          price: Number(form.price) || 0,
          duration: form.duration,
          departureDate: form.departureDate,
          imageUrl: form.imageUrl,
          description: form.description,
        }),
      });
      if (!response.ok) {
        let detail = `HTTP ${response.status}`;
        try {
          const body = await response.json();
          if (body?.message || body?.error) detail = body.message ?? body.error;
        } catch {
          // non-JSON error body, keep status detail
        }
        throw new Error(detail);
      }
      setSubmitState("success");
      setForm(emptyForm);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
      setSubmitState("error");
    }
  }

  const inputClasses = "h-10 rounded-md bg-[#fafafa] border-gray-200";

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:px-8">
      <h1 className="text-4xl font-medium text-[#111827] md:text-5xl">
        Add New Travel Package
      </h1>

      <div className="mx-auto mt-10 max-w-2xl">
        <Card className="rounded-md border-gray-200 shadow-sm">
          <CardHeader className="pb-2" />
          <CardContent className="space-y-6">
            {submitState === "success" && (
              <p className="rounded-md bg-green-50 px-4 py-2.5 text-sm text-green-700">
                Travel package added successfully.
              </p>
            )}
            {submitState === "error" && errorMessage && (
              <p className="rounded-md bg-red-50 px-4 py-2.5 text-sm text-red-600">
                Failed to add package: {errorMessage}
              </p>
            )}

            <FormField label="Destination Name">
              <Input
                value={form.name}
                onChange={(e) => set("name")(e.target.value)}
                placeholder="Bali Paradise"
                className={inputClasses}
              />
            </FormField>

            <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-7">
              <FormField label="Country">
                <Input
                  value={form.country}
                  onChange={(e) => set("country")(e.target.value)}
                  placeholder="Indonesia"
                  className={inputClasses}
                />
              </FormField>
              <FormField label="Category">
                <Select
                  value={form.category}
                  onValueChange={(value) => set("category")(value as string)}
                >
                  <SelectTrigger className={`h-10 w-full rounded-md bg-[#fafafa] px-3 ${form.category ? "text-gray-800" : "text-muted-foreground"}`}>
                    <SelectValue placeholder="Beach">
                      {form.category || ""}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Price (USD)">
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) => set("price")(e.target.value)}
                  placeholder="e.g., 1299"
                  className={inputClasses}
                />
              </FormField>
              <FormField label="Duration">
                <Input
                  value={form.duration}
                  onChange={(e) => set("duration")(e.target.value)}
                  placeholder="e.g., 7 Days/6 Nights"
                  className={inputClasses}
                />
              </FormField>
            </div>

            <FormField label="Departure Date">
              <Input
                type="date"
                value={form.departureDate}
                onChange={(e) => set("departureDate")(e.target.value)}
                className={inputClasses}
              />
            </FormField>

            <FormField label="Image URL">
              <Input
                value={form.imageUrl}
                onChange={(e) => set("imageUrl")(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className={inputClasses}
              />
            </FormField>

            <FormField label="Description">
              <Textarea
                value={form.description}
                onChange={(e) => set("description")(e.target.value)}
                placeholder="Describe the travel experience..."
                className="min-h-28 rounded-md bg-[#fafafa] border-gray-200"
              />
            </FormField>
          </CardContent>

          <CardFooter className="justify-end gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setForm(emptyForm)}
              className="h-10 gap-2 rounded-md border-red-400 bg-white text-sm text-red-500 hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 data-icon="inline-start" />
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={submitState === "submitting"}
              className="h-10 gap-2 rounded-md bg-[#0d97b1] text-sm text-white hover:bg-[#0b82a0]"
            >
              <ClipboardList data-icon="inline-start" />
              {submitState === "submitting" ? "Adding..." : "Add Travel Package"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
