import CTA from "@/components/CTA";
import Loader from "@/components/Loader";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Moment from "react-moment";

export default function Blogs() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["articles"],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles?populate=*`
      ).then((res) => res.json()),
  });
  if (isLoading) return <Loader />;
  if (error) return "An error has occurred: " + error.message;

  // if (data) console.log(data);

  return (
    <div className='relative pt-16 pb-20 lg:px-8'>
      <div className='relative mx-auto max-w-7xl'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            From the blog
          </h2>
          <p className='mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
            libero labore natus atque, ducimus sed.
          </p>
        </div>
        <div className='mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3'>
          {data.data.map((post) => (
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
      <CTA />
    </div>
  );
}
