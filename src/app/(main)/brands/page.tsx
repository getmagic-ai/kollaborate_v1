"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import BrandCard from "@/components/brand-card";
import { Loader } from "lucide-react";
import SearchPage from "../search/page";
import CustomLoader from "@/components/custom-loader";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page =
    typeof searchParams.get("page") === "string"
      ? Number(searchParams.get("page"))
      : 1;
  const getData = async () =>
    await axios.get(`/api/brands?page=${page ? page : 0}`);
  const { data, error, isLoading } = useQuery({
    queryFn: getData,
    queryKey: ["brands", page],
  });

  console.log(data);

  isLoading && <CustomLoader />;
  error && <div>Error...</div>;

  return (
    <div className='py-6'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          {/* to do: comment Trending brand */}
          {/*
           <h2 className="text-xl font-semibold tracking-tight text-gray-50 sm:text-4xl">
            Trending brand of the day Amazon
          </h2>
          */}
        </div>
        {/* to do: add the search bar here on top - first pass done on 28 march 2024*/}
        <SearchPage />
        <Tabs defaultValue='sponsorships' className='my-4'>
          {/* to do: maybe remove tabs */}
          <TabsList className='bg-gray-700'>
            <TabsTrigger value='sponsorships'>Sponsorships</TabsTrigger>
            <TabsTrigger value='ugc'>UGC</TabsTrigger>
            <TabsTrigger value='all'>All</TabsTrigger>
          </TabsList>
          <TabsContent value='sponsorships' className='mt-5'>
            <h2 className='text-xl font-semibold tracking-tight text-gray-50'>
              Sponsorships
            </h2>
            <div className='flex flex-col space-y-4 mt-4 border-t border-gray-200 py-6'>
              {data &&
                data.data.map(
                  (brand: any) =>
                    brand.name && <BrandCard key={brand.id} brand={brand} />
                )}
            </div>
          </TabsContent>
          <TabsContent value='ugc' className='mt-5'>
            <h2 className='text-xl font-semibold tracking-tight text-gray-50'>
              UGC
            </h2>
            <div className='flex flex-col space-y-4 mt-4 border-t border-gray-200 py-6'>
              {data &&
                data.data.map(
                  (brand: any) =>
                    brand.name && <BrandCard key={brand.id} brand={brand} />
                )}
            </div>
          </TabsContent>
          <TabsContent value='all' className='mt-5'>
            <h2 className='text-xl font-semibold tracking-tight text-gray-50'>
              All
            </h2>
            <div className='flex flex-col space-y-4 mt-4 border-t border-gray-200 py-6'>
              {data &&
                data.data.map(
                  (brand: any) =>
                    brand.name && <BrandCard key={brand.id} brand={brand} />
                )}
            </div>
          </TabsContent>
        </Tabs>
        <Button
          onClick={() =>
            router.push(`/brands?page=${page > 1 ? page - 1 : 1}`, {
              scroll: false,
            })
          }
        >
          Previous
        </Button>
        <Button
          onClick={() =>
            router.push(`/brands?page=${page + 1}`, {
              scroll: false,
            })
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}
