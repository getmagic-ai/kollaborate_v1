"use client";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowUpOnSquareIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import copy from "copy-to-clipboard";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchPage = () => {
  const [checked, setChecked] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter();
  const params = useSearchParams();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const encodedQuery = encodeURIComponent(query);

      // Retrieve the existing search history from localStorage
      const existingSearchHistory = localStorage.getItem("searchHistory");
      let searchHistory = [];

      if (existingSearchHistory) {
        searchHistory = JSON.parse(existingSearchHistory);
      }

      // Add the new search text to the search history array
      if (query && !searchHistory.includes(query)) {
        searchHistory.push(query);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      }
      router.push(`?query=${encodedQuery}`);
      // const response = await axios.get(`/api/search?${encodedQuery}`);
      const response = await axios.get(`/api/search?query=${encodedQuery}`);
      console.log(response);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  useEffect(() => {
    if (params.get("query")) {
      const urlQuery = params.get("query");
      if (urlQuery === query) return;
      const decodedQuery = decodeURIComponent(urlQuery as string);
      setQuery(decodedQuery);
      axios
        .get(`/api/search?query=${urlQuery}`)
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          console.error("Error fetching results:", error);
        });
    }
  }, [params]);

  return (
    <div className='py-6'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <h3 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
          Search for Brands
        </h3>

        <div className='mt-4 max-w-lg flex space-x-2'>
          <input
            type='text'
            name='brandsearch'
            id='brandsearch'
            className='italic py-2.5 px-2 block text-white bg-gray-700 w-full rounded-md border-gray-300 shadow-sm sm:text-sm'
            placeholder='Tell our AI what brand suits you best...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            variant='outline'
            className='text-black'
          >
            Search
          </Button>
        </div>

        <div className='flex flex-col space-y-4 mt-4 border-t border-gray-200 py-6'>
          {results.length > 0
            ? results.map((brand: any) => (
                <Accordion type='single' collapsible>
                  <AccordionItem value={brand.id}>
                    <div className='bg-gray-800 flex justify-between items-center gap-x-6 px-4'>
                      <div className='w-3/5 truncate flex'>
                        <AccordionTrigger className='hover:no-underline text-sm lg:text-base font-medium lg:font-semibold leading-6 text-white'>
                          {brand.name}
                        </AccordionTrigger>
                      </div>
                      <p className='w-1/5 text-sm lg:text-base font-medium lg:font-semibold text-left leading-6 text-white'>
                        {brand.category_main &&
                          brand.category_main.toLowerCase()}
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
                            Email me when this brand shows above average
                            activity.
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
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
