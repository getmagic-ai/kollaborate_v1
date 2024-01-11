"use client";
import React from "react";
import axios from "axios";
import { useParams, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import ChatScreen from "../../chat/page";

const BrandDetails = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryFn: async () => await axios.post(`/api/brand`, { id: id }),
    queryKey: ["brand"],
  });

  if (isLoading) return <Loader />;

  const brandData = data?.data[0];

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

      <ChatScreen />
    </div>
  );
};

export default BrandDetails;
