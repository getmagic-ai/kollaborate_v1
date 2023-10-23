"use client";
import BrandCard from "@/components/BrandCard";
import { Button } from "@/components/ui/button";
import axios from "axios";
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
      router.push(`?query=${encodedQuery}`);
      const response = await axios.get(`/api/search?query=${encodedQuery}`);
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
            className='py-2.5 px-2 block bg-gray-700 w-full rounded-md border-gray-300 shadow-sm sm:text-sm'
            placeholder='Amazon'
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
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
