import { Button } from "@/components/ui/button";
import React from "react";

const page = () => {
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
          />
          <Button variant='outline' className='text-black'>
            Search
          </Button>
        </div>

        <div className='flex flex-col space-y-4 mt-10 border-t border-gray-200 py-6'></div>
      </div>
    </div>
  );
};

export default page;
