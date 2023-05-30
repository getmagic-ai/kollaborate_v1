import axios from "axios";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

import Loader from "@/components/Loader";
import BrandCard from "@/components/BrandCard";
import { useRouter } from "next/router";

const likedBrands = async () => {
  const response = await axios.get("/api/user/getLikedBrands");
  return response.data;
};

const Brands = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    status === "unauthenticated" && router.replace("/auth/signin");
  }, [status]);

  const { data, error, isLoading } = useQuery({
    queryFn: likedBrands,
    queryKey: ["liked-brands"],
  });

  if (isLoading) return <Loader />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className='grid grid-cols-1 gap-2 md:gap-6'>
      {data.data.map((brand) => (
        <BrandCard key={brand.id} brand={brand} />
      ))}
    </div>
  );
};

export default Brands;
