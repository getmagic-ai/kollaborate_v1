"use client";
import React from "react";
import axios from "axios";
import { useParams, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const BrandDetails = () => {
  const { id } = useParams();
  console.log(id);
  const { data, error, isLoading } = useQuery({
    queryFn: async () => await axios.post(`/api/brand`, { id: id }),
    queryKey: ["brand"],
  });
  console.log(data);
  if (isLoading) return <div>Loading....</div>;

  const brandData = data?.data[0];
  console.log(brandData);
  return (
    <div className='mx-auto max-w-7xl py-24 px-6 lg:px-8'>
      <h1 className='text-5xl font-bold tracking-tight text-gray-200'>
        {brandData.name}
      </h1>
      <p className='mt-2 text-lg text-gray-400'>
        Category: {brandData.category_main}
      </p>
      <p className='mt-5 text-xl text-gray-300'>
        {brandData.brand_description
          ? brandData.brand_description
          : "contact us for brand details"}
      </p>
    </div>
  );
};

export default BrandDetails;
