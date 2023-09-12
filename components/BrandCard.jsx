"use client";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSetBrandStore from "@/hooks/useSetBrand";

const BrandCard = ({ brand }) => {
  const { userId } = useAuth();
  const { select, brand: selectedBrand } = useSetBrandStore();
  console.log(selectedBrand);
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
        console.log(error);
        if (error) {
          console.log(error);
        }
      },
    }
  );
  return (
    <div
      key={brand.id}
      className='bg-gray-800 flex justify-between gap-x-6 py-3 px-4 cursor-pointer'
<<<<<<< HEAD
=======
      onClick={() => select(brand)}
>>>>>>> parent of 71098e2 (Added brand details modal)
    >
      <div className='flex gap-x-4'>
        <div
          onClick={() => {
            select(brand);
            onOpen();
          }}
        >
          <p className='text-base font-semibold leading-6 text-white'>
            {brand.name}
          </p>
        </div>
      </div>
      <div className='flex items-center justify-end'>
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
