"use client";
import React from "react";
import axios from "axios";
import { useParams, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const BrandDetails = () => {
  const { id } = useParams();
  console.log(id);
  // const { data, error, isLoading } = useQuery({
  //   queryFn: async () => await axios.get("/api/bookmarks"),
  //   queryKey: ["brand"],
  // });
  // console.log(data);
  return <div>BrandDetails</div>;
};

export default BrandDetails;
