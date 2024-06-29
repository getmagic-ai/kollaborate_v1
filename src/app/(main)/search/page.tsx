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
import { Loader } from "lucide-react";
import TagManager from "react-gtm-module";
import BrandCard from "@/components/brand-card";

const SearchPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter();
  const params = useSearchParams();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      TagManager.dataLayer({
        dataLayer: {
          event: "conversion",
          send_to: "AW-984235993/bdurCP_C5wUQ2f-o1QM",
          value: 1.0,
          currency: "USD",
        },
      });
      const encodedQuery = encodeURIComponent(query);
      router.push(`/search?query=${encodedQuery}`);
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

      await fetchResults(encodedQuery, true);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchResults = async (encodedQuery: any, isNewSearch = false) => {
    // If it's a new search, clear the cache for this query
    if (isNewSearch) {
      localStorage.removeItem(`searchResults_${encodedQuery}`);
    }

    // Check if we have cached results for this query
    const cachedResults = localStorage.getItem(`searchResults_${encodedQuery}`);

    if (cachedResults && !isNewSearch) {
      setResults(JSON.parse(cachedResults));
    } else {
      const response = await axios.get(`/api/search?query=${encodedQuery}`);
      setResults(response.data);

      // Cache the results
      localStorage.setItem(
        `searchResults_${encodedQuery}`,
        JSON.stringify(response.data)
      );
    }
  };

  useEffect(() => {
    if (params.get("query")) {
      setIsLoading(true);
      const urlQuery = params.get("query");
      if (urlQuery === query) return;
      const decodedQuery = decodeURIComponent(urlQuery as string);
      setQuery(decodedQuery);
      fetchResults(urlQuery)
        .then(() => setIsLoading(false))
        .catch((error) => {
          console.error("Error fetching results:", error);
          setIsLoading(false);
        });
    }
  }, [params]);

  return (
    <div className='py-6'>
      <div className=''>
        <h3 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
          Search for Brands
        </h3>

        <form onSubmit={handleSubmit} className='mt-4 max-w-lg flex space-x-2'>
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
            type='submit'
          >
            {isLoading ? <Loader className='h-6 w-6 animate-spin' /> : "Search"}
          </Button>
        </form>

        <div className='flex flex-col space-y-4 mt-4 border-t border-gray-200 py-6'>
          {isLoading
            ? null
            : results && results.length > 0
            ? results.map((brand: any) => (
                <BrandCard key={brand.id} brand={brand} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
