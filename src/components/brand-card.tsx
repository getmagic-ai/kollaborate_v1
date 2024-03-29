"use client";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowTrendingUpIcon,
  //insert a Arrow Down Icon here
  ArrowTrendingDownIcon,
  ArrowUpOnSquareIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { Button, buttonVariants } from "./ui/button";
import { useState } from "react";

interface BrandCardProps {
  brand: {
    id: string;
    name: string;
    category_main: string;
    brand_description: string;
    url: string;
    Saved: {
      userId: string;
      brandId: string;
    }[];
  };
}

const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  const { userId } = useAuth();
  const [checked, setChecked] = useState(false);

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

  return (
    <Accordion type='single' collapsible>
      <AccordionItem value={brand.id}>
        <div className='bg-gray-800 flex justify-between items-center gap-x-6 px-4'>
          <div className='w-3/5 truncate flex'>
            <AccordionTrigger className='hover:no-underline text-sm lg:text-base font-medium lg:font-semibold leading-6 text-white'>
              {brand.name}
            </AccordionTrigger>
          </div>

          <p className='w-1/5 text-sm lg:text-base font-medium lg:font-semibold text-left leading-6 text-white'>
            {brand.category_main && brand.category_main.toLowerCase()}
          </p>

          <div className='flex items-center justify-end'>
            {brand?.name?.length > 15 ? (
              <ArrowTrendingUpIcon className='text-green-800 group-hover:text-gray-300 mx-2 flex-shrink-0 h-6 w-6"' />
            ) : (
              <ArrowTrendingDownIcon className='text-red-800 group-hover:text-gray-300 mx-2 flex-shrink-0 h-6 w-6"' />
            )}

            <ArrowUpOnSquareIcon
              onClick={() => {
                copy(brand.url);
                toast.success(`${brand.name} Copied to clipboard`);
              }}
              className='text-gray-100 cursor-pointer group-hover:text-gray-300 mx-2 flex-shrink-0 h-6 w-6"'
            />
            {brand.Saved &&
              (brand.Saved.find(
                (item) => item.userId === userId && item.brandId === brand.id
              ) ? (
                <BookmarkIconSolid
                  onClick={(
                    event: React.MouseEvent<SVGSVGElement, MouseEvent>
                  ) => mutate()}
                  className='text-red-500 cursor-pointer mx-2 flex-shrink-0 h-6 w-6"'
                />
              ) : (
                <BookmarkIcon
                  className='text-gray-100 cursor-pointer mx-2 flex-shrink-0 h-6 w-6"'
                  onClick={(
                    event: React.MouseEvent<SVGSVGElement, MouseEvent>
                  ) => mutate()}
                />
              ))}
          </div>
        </div>

        <AccordionContent className='py-1 px-4 h-full bg-gray-800 text-gray-300 text-xs'>
          <p className='text-sm mb-2 font-medium text-left leading-6 text-white'>
            Description
          </p>
          {brand.brand_description ? brand.brand_description : ""}
          <Link
            href={`/brands/${brand.id}`}
            className='block bg-gray-700 px-6 py-2 max-w-fit mt-4'
          >
            View in detail
          </Link>

          <div className='my-8 p-3 bg-gray-700'>
            <div className='py-3 flex items-center'>
              <input
                checked={checked}
                id='checked-checkbox'
                type='checkbox'
                onChange={() => {
                  setChecked(!checked);
                }}
                className='w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <label
                htmlFor='checked-checkbox'
                className='ms-2 text-sm font-medium text-left leading-6 text-white'
              >
                Email me when this brand shows above average activity.
              </label>
            </div>
            <p className='text-sm font-medium text-left leading-6 text-white'>
              No Risks, No hassles, We handle it all.
            </p>
            <p className='text-sm font-medium text-left leading-6 text-white'>
              Only pay once the contract is officially signed.
            </p>
            <Button className='block bg-indigo-600 px-6 py-2 max-w-fit mt-4'>
              Represent Me
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default BrandCard;
