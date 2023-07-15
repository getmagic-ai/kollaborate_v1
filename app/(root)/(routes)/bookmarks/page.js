"use client";
import axios from "axios";
import Loader from "@/components/Loader";
import BrandCard from "@/components/BrandCard";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryFn: async () => await axios.get("/api/brands/bookmarks"),
    queryKey: ["bookmarks"],
  });
  isLoading && <Loader />;
  error && <div>Error...</div>;

  return (
    <div className='py-6'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl'>
            Bookmarks
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
