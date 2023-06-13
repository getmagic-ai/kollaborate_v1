import { BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

const BrandCard = ({ brand }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async ({ brandId }) => {
      return axios.post("/api/brands/addLike", { brandId });
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["brands"]);
        queryClient.invalidateQueries(["saved-brands"]);
        // console.log(data);
      },
      onError: (error) => {
        console.log(error);
        setIsDisabled(false);
        if (error) {
          console.log(error);
        }
      },
    }
  );
  const isSaved = brand.saved_leads.filter(
    (saved) => saved.userEmail === session?.user.email
  );

  return (
    <div
      key={brand.id}
      className='bg-gray-800 flex justify-between gap-x-6 p-2'
    >
      <div className='flex gap-x-4'>
        <img
          className='h-12 w-12 flex-none bg-gray-50'
          src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          alt=''
        />
        <div className=''>
          <p className='text-base font-semibold leading-6 text-white'>
            {brand.name}
          </p>
          {/* <p className='mt-0.5 text-xs leading-5 text-gray-300'>
            {brand.description}
          </p> */}
        </div>
      </div>
      <div className='flex items-center justify-end'>
        {isSaved.length === 0 ? (
          <BookmarkIcon
            onClick={
              session?.user
                ? () => mutate({ brandId: brand.id })
                : () => toast.error("You need to login first")
            }
            className='cursor-pointer text-gray-100 group-hover:text-gray-300 mx-2 flex-shrink-0 h-6 w-6"'
          />
        ) : (
          <BookmarkIconSolid
            onClick={
              session?.user
                ? () => mutate({ brandId: brand.id })
                : () => toast.error("You need to login first")
            }
            className='text-red-500 cursor-pointer mx-2 flex-shrink-0 h-6 w-6"'
          />
        )}
      </div>
    </div>
  );
};

export default BrandCard;
