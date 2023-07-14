"use client";
import BrandCard from "@/components/BrandCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Brands() {
  const { data, error, isLoading } = useQuery({
    queryFn: async () => await axios.get("/api/brands"),
    queryKey: ["brands"],
  });
  isLoading && <div>Loading...</div>;
  error && <div>Error...</div>;

  return (
    <div>
      {data &&
        data.data.map((brand) => <BrandCard key={brand.id} brand={brand} />)}
    </div>
  );
}
