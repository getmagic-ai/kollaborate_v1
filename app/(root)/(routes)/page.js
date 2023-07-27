"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BrandCard from "@/components/BrandCard";
import Loader from "@/components/Loader";

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryFn: async () => await axios.get("/api/brands"),
    queryKey: ["brands"],
  });
  isLoading && <Loader />;
  error && <div>Error...</div>;

  return (
    <div className='py-6'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl'>
            Brands
          </h2>
        </div>

        <div className='flex flex-col space-y-4 mt-10 border-t border-gray-200 py-6'>
          {data &&
            data.data.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
        </div>
      </div>
    </div>
  );
}
