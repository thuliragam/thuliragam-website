
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import CategoryProductGrid from "./CategoryProductGrid";

interface Microgreen {
  id: number;
  name: string;
  image: string | null;
  description: string | null;
  harvest_days: string | null;
  price_50g: number | string | null;
  status:
    | "Germinating"
    | "Growing"
    | "Ready to Harvest"
    | "Out of Stock"
    | "Request Microgreens";
  taste: string | null;
  texture: string | null;
  uses: string | null;
  nutrition: string | null;
}

export default function LiveMicrogreensGrid() {
  const [products, setProducts] = useState<Microgreen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadMicrogreens() {
      const { data, error } = await supabase
        .from("microgreens")
        .select("*")
        .order("id", { ascending: true });

      if (!mounted) return;

      if (error) {
        console.error("MICROGREENS FETCH ERROR:", error);
        setError(error.message);
      } else {
        setProducts((data ?? []) as Microgreen[]);
        setError("");
      }

      setLoading(false);
    }

    loadMicrogreens();

    const channel = supabase
      .channel("microgreens-live-updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "microgreens",
        },
        () => {
          loadMicrogreens();
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <p className="py-10 text-center text-emerald-800">
        Loading fresh microgreens...
      </p>
    );
  }

  if (error) {
    return (
      <p className="py-10 text-center text-red-600">
        Unable to load microgreens: {error}
      </p>
    );
  }

  const displayProducts = products.map((product) => ({
    name: product.name,
    image: product.image || "/images/products/sunflower.jpg",
    description: product.description || "",
    harvestDays: product.harvest_days || undefined,
    price50g:
      product.price_50g === null
        ? undefined
        : Number(product.price_50g),

    status:
      product.status === "Out of Stock"
        ? ("Request Microgreens" as const)
        : product.status,

    taste: product.taste || undefined,
    texture: product.texture || undefined,
    uses: product.uses || undefined,
    nutrition: product.nutrition || undefined,
  }));

  return <CategoryProductGrid products={displayProducts} />;
}
