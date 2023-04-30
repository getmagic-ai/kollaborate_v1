import BrandCard from "@/components/BrandCard";
import Loader from "@/components/Loader";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const allBrands = async () => {
  const response = await axios.get("/api/brands/getBrands");
  return response.data;
};
const Brands = () => {
  const {
    data: brands,
    error,
    isLoading,
  } = useQuery({
    queryFn: allBrands,
    queryKey: ["brands"],
  });
  if (isLoading) return <Loader />;
  if (error) return "An error has occurred: " + error.message;

  // if (brands) console.log(brands);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 divide-y divide-gray-100'>
      {brands.map((brand) => (
        <BrandCard key={brand.id} brand={brand} />
      ))}
    </div>
  );
};

export default Brands;
