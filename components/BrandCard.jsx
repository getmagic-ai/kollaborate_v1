"use client";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import {
  ArrowTrendingUpIcon,
  ArrowUpOnSquareIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSetBrandStore from "@/hooks/useSetBrand";
import Link from "next/link";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";

const BrandCard = ({ brand }) => {
  const { userId } = useAuth();

  const { select, onOpen } = useSetBrandStore();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async () => {
      return await axios.post("/api/brands", {
        brandId: brand.id,
      });
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["brands"]);
        queryClient.invalidateQueries(["bookmarks"]);
      },
      onError: (error) => {
        if (error) {
          console.log(error);
        }
      },
    }
  );

  console.log(brand);
  return (
    <div
      key={brand.id}
      className='bg-gray-800 flex justify-between gap-x-6 py-3 px-4'
    >
      <div className='w-3/5 truncate flex'>
        <Link
          href={`/brands/${brand.id}`}
          className='cursor-pointer'
          // onClick={() => {
          //   select(brand);
          //   onOpen();
          // }}
        >
          <p className='text-sm lg:text-base font-medium lg:font-semibold leading-6 text-white'>
            {brand.name}
          </p>
        </Link>
      </div>

      <p className='w-1/5 text-sm lg:text-base font-medium lg:font-semibold text-left leading-6 text-white'>
        {brand.category_main.toLowerCase()}
      </p>

      <div className='flex items-center justify-end'>
        <ArrowTrendingUpIcon className='text-gray-100 group-hover:text-gray-300 mx-2 flex-shrink-0 h-6 w-6"' />
        <ArrowUpOnSquareIcon
          onClick={() => {
            copy(brand.url);
            toast.success(`${brand.name} Copied to clipboard`);
          }}
          className='text-gray-100 cursor-pointer group-hover:text-gray-300 mx-2 flex-shrink-0 h-6 w-6"'
        />
        {brand.saved.find(
          (item) => item.userId === userId && item.brandId === brand.id
        ) ? (
          <BookmarkIconSolid
            onClick={mutate}
            className='text-red-500 cursor-pointer mx-2 flex-shrink-0 h-6 w-6"'
          />
        ) : (
          <BookmarkIcon
            onClick={mutate}
            className='cursor-pointer text-gray-100 group-hover:text-gray-300 mx-2 flex-shrink-0 h-6 w-6"'
          />
        )}
      </div>
    </div>
  );
};

export default BrandCard;
