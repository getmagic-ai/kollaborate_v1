"use client";
import toast from "react-hot-toast";
import {
  Accordion,
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
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter();
  const handleSubmit = async (e) => {
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
      const response = await axios.get(
        `http://api.kollaborate.co/open-search?message=${encodedQuery}&page=1`
      );
      console.log(response);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };
  useEffect(() => {
    if (router.query && router.query.query) {
      const urlQuery = router.query.query;
      const decodedQuery = decodeURIComponent(urlQuery);
      setQuery(decodedQuery);
      // Call the API with the query parameter from the URL
      axios
        .get(`/api/search?query=${urlQuery}`)
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          console.error("Error fetching results:", error);
        });
    }
  }, [router.query]);

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
          {results.map((brand) => (
            // <BrandCard key={result.brand_id} brand={result} />
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
                  </div>
                </div>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
