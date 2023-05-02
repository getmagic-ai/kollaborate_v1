import BrandCard from "@/components/BrandCard";
import Loader from "@/components/Loader";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import Moment from "react-moment";

const allBrands = async () => {
  const response = await axios.get("/api/brands/getBrands");
  return response.data;
};

export default function Home() {
  const {
    isLoading: isBlogsLoading,
    error: blogsError,
    data,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles?populate=*`
      );
      return res.data;
    },
  });
  const {
    data: brands,
    error: brandsError,
    isLoading: isBrandsLoading,
  } = useQuery({
    queryFn: allBrands,
    queryKey: ["brands"],
  });
  if (isBlogsLoading || isBrandsLoading) return <Loader />;
  if (brandsError || blogsError)
    return (
      "An error has occurred: " + brandsError.message || blogsError.message
    );

  // if (brands) console.log(brands);
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 divide-y divide-gray-100'>
      <div className='space-y-4 divide-y divide-gray-100'>
        {brands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
      <div className='flex flex-col space-y-4'>
        {[...data.data, ...data.data].map((post) => (
          <Link
            key={post.attributes.Slug}
            href={`/blogs/${post.id}`}
            className='flex flex-col overflow-hidden rounded-lg shadow-lg'
          >
            <div className='flex-shrink-0 bg-black'>
              <img
                src={post.attributes.Hero.data.attributes.formats.medium.url}
                className='h-48 w-full object-contain'
                alt=''
              />
            </div>
            <div className='flex flex-1 flex-col justify-between bg-white p-6'>
              <div className='flex-1'>
                <p className='text-sm font-medium text-indigo-600'>
                  <a className='hover:underline'>Article</a>
                </p>
                <p className='text-xl font-semibold text-gray-900'>
                  {post.attributes.Title}
                </p>
                <p className='mt-3 text-base text-gray-500'>
                  {post.attributes.Excerpt}
                </p>
              </div>
              <div className='mt-6 flex items-center'>
                <div className='flex-shrink-0'>
                  <a>
                    <span className='sr-only'>Kollaborate Team</span>
                    <img
                      className='h-10 w-10 rounded-full'
                      src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      alt=''
                    />
                  </a>
                </div>
                <div className='ml-3'>
                  <p className='text-sm font-medium text-gray-900'>
                    <a className='hover:underline'>Kollaborate Team</a>
                  </p>
                  <div className='flex space-x-1 text-sm text-gray-500'>
                    <Moment
                      format='DD/MM/YYYY'
                      date={post.attributes.publishedAt}
                    />
                    <span aria-hidden='true'>&middot;</span>
                    <span>{"11 min"} read</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
