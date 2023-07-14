"use client";
import { useAuth } from "@clerk/nextjs";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import axios from "axios";

const BrandCard = ({ brand }) => {
  const { userId } = useAuth();
  const addToBookmarks = async () => {
    const bookmark = await axios.post("/api/brands", {
      userId: userId,
      brandId: brand.id,
    });
  };

  const isSaved = brand.saved.find(
    (item) => item.userId === userId && item.brandId === brand.id
  );

  return (
    <div
      key={brand.id}
      className='bg-gray-800 flex justify-between gap-x-6 py-3 px-4'
    >
      <div className='flex gap-x-4'>
        <div className=''>
          <p className='text-base font-semibold leading-6 text-white'>
            {brand.name}
          </p>
        </div>
      </div>
      <div className='flex items-center justify-end'>
        {isSaved.length === 0 ? (
          <BookmarkIcon
            onClick={addToBookmarks}
            className='cursor-pointer text-gray-100 group-hover:text-gray-300 mx-2 flex-shrink-0 h-6 w-6"'
          />
        ) : (
          <BookmarkIconSolid
            onClick={addToBookmarks}
            className='text-red-500 cursor-pointer mx-2 flex-shrink-0 h-6 w-6"'
          />
        )}
      </div>
    </div>
  );
};

export default BrandCard;
