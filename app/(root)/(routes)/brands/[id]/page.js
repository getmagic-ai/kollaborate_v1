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

  const brandData = data.data[0];
  return (
    <div>
      {brandData.name}
      {brandData.category_main}
    </div>
  );
};

export default BrandDetails;
