import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

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
        queryClient.invalidateQueries(["liked-brands"]);
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
  const hasHeart = brand.hearts.filter(
    (heart) => heart.userEmail === session?.user.email
  );
  return (
    <div key={brand.id} className='bg-white flex justify-between gap-x-6 p-2'>
      <div className='flex gap-x-4'>
        <img
          className='h-12 w-12 flex-none bg-gray-50'
          src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          alt=''
        />
        <div className=''>
          <p className='text-sm font-semibold leading-6 text-gray-900'>
            {brand.name}
          </p>
          <p className='mt-0.5 text-xs leading-5 text-gray-500'>
            {brand.description}
          </p>
        </div>
      </div>
      <div className='flex items-center justify-end'>
        {hasHeart.length === 0 ? (
          <HeartIcon
            onClick={() => mutate({ brandId: brand.id })}
            className='cursor-pointer text-gray-600 group-hover:text-gray-700 mx-2 flex-shrink-0 h-6 w-6"'
          />
        ) : (
          <HeartIconSolid
            onClick={() => mutate({ brandId: brand.id })}
            className='text-red-500 cursor-pointer mx-2 flex-shrink-0 h-6 w-6"'
          />
        )}
      </div>
    </div>
  );
};

export default BrandCard;