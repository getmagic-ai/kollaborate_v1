import axios from "axios";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Loader from "@/components/Loader";
import BrandCard from "@/components/BrandCard";

const likedBrands = async () => {
  const response = await axios.get("/api/user/getLikedBrands");
  return response.data;
};
const Brands = () => {
  const { data, error, isLoading } = useQuery({
    queryFn: likedBrands,
    queryKey: ["liked-brands"],
  });
  if (isLoading) return <Loader />;
  if (error) return "An error has occurred: " + error.message;

  // console.log(data.data);

  return (
    <div className='grid grid-cols-1 gap-2 md:gap-6'>
      {data.data.map((brand) => (
        <BrandCard key={brand.id} brand={brand} />
      ))}
    </div>
  );
};

export default Brands;
