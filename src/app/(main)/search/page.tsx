"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import TagManager from "react-gtm-module";
import BrandCard from "@/components/brand-card";

const SearchPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [searchType, setSearchType] = useState("brand"); // New state for search type
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
      router.push(`/search?query=${encodedQuery}&type=${searchType}`);

      const existingSearchHistory = localStorage.getItem("searchHistory");
      let searchHistory = existingSearchHistory
        ? JSON.parse(existingSearchHistory)
        : [];

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

  const fetchResults = async (
    encodedQuery: string | null,
    isNewSearch = false
  ) => {
    if (isNewSearch) {
      localStorage.removeItem(`searchResults_${encodedQuery}_${searchType}`);
    }

    const cachedResults = localStorage.getItem(
      `searchResults_${encodedQuery}_${searchType}`
    );

    if (cachedResults && !isNewSearch) {
      setResults(JSON.parse(cachedResults));
    } else {
      const apiEndpoint =
        searchType === "brand" ? "/api/search" : "/api/company-search";
      const response = await axios.get(`${apiEndpoint}?query=${encodedQuery}`);
      setResults(response.data);

      localStorage.setItem(
        `searchResults_${encodedQuery}_${searchType}`,
        JSON.stringify(response.data)
      );
    }
  };

  useEffect(() => {
    if (params.get("query")) {
      setIsLoading(true);
      const urlQuery = params.get("query");
      const urlType = params.get("type") || "brand";
      if (urlQuery === query && urlType === searchType) return;
      const decodedQuery = decodeURIComponent(urlQuery || "");
      setQuery(decodedQuery);
      setSearchType(urlType);
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
          Search for {searchType === "brand" ? "Brands" : "Companies"}
        </h3>

        <form onSubmit={handleSubmit} className='mt-4 max-w-lg space-y-4'>
          <div className='flex space-x-4'>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                className='form-radio'
                name='searchType'
                value='brand'
                checked={searchType === "brand"}
                onChange={() => setSearchType("brand")}
              />
              <span className='ml-2 text-white'>Brands</span>
            </label>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                className='form-radio'
                name='searchType'
                value='company'
                checked={searchType === "company"}
                onChange={() => setSearchType("company")}
              />
              <span className='ml-2 text-white'>Companies</span>
            </label>
          </div>
          <div className='flex space-x-2'>
            <input
              type='text'
              name='search'
              id='search'
              className='italic py-2.5 px-2 block text-white bg-gray-700 w-full rounded-md border-gray-300 shadow-sm sm:text-sm'
              placeholder={`Tell our AI what ${searchType} suits you best...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              onClick={handleSubmit}
              variant='outline'
              className='text-black'
              type='submit'
            >
              {isLoading ? (
                <Loader className='h-6 w-6 animate-spin' />
              ) : (
                "Search"
              )}
            </Button>
          </div>
        </form>

        <div className='flex flex-col space-y-4 mt-4 border-t border-gray-200 py-6'>
          {isLoading
            ? null
            : results && results.length > 0
            ? results.map((item) => <BrandCard key={item.id} brand={item} />)
            : null}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
