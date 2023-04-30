import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";

import styles from "@/styles/Blogs.module.css";
import axios from "axios";
import Loader from "@/components/Loader";

export default function Article() {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, error, data } = useQuery({
    queryKey: ["article"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:1337/api/articles/1?populate=*`
      );
      return res.data;
    },
  });
  if (isLoading) return <Loader />;
  if (error) return "An error has occurred: " + error.message;
  return (
    <div className='relative overflow-hidden bg-white py-16'>
      <div className='hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full lg:[overflow-anchor:none]'>
        <div
          className='relative mx-auto h-full max-w-prose text-lg'
          aria-hidden='true'
        >
          <svg
            className='absolute top-12 left-full translate-x-32 transform'
            width={404}
            height={384}
            fill='none'
            viewBox='0 0 404 384'
          >
            <defs>
              <pattern
                id='74b3fd99-0a6f-4271-bef2-e80eeafdf357'
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits='userSpaceOnUse'
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className='text-gray-200'
                  fill='currentColor'
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill='url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)'
            />
          </svg>
          <svg
            className='absolute top-1/2 right-full -translate-y-1/2 -translate-x-32 transform'
            width={404}
            height={384}
            fill='none'
            viewBox='0 0 404 384'
          >
            <defs>
              <pattern
                id='f210dbf6-a58d-4871-961e-36d5016a0f49'
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits='userSpaceOnUse'
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className='text-gray-200'
                  fill='currentColor'
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill='url(#f210dbf6-a58d-4871-961e-36d5016a0f49)'
            />
          </svg>
          <svg
            className='absolute bottom-12 left-full translate-x-32 transform'
            width={404}
            height={384}
            fill='none'
            viewBox='0 0 404 384'
          >
            <defs>
              <pattern
                id='d3eb07ae-5182-43e6-857d-35c643af9034'
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits='userSpaceOnUse'
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className='text-gray-200'
                  fill='currentColor'
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill='url(#d3eb07ae-5182-43e6-857d-35c643af9034)'
            />
          </svg>
        </div>
      </div>
      <div className='max-w-4xl mx-auto relative px-6 lg:px-8'>
        <div className='mx-auto max-w-prose text-lg'>
          <h1>
            <span className='block text-center text-lg font-semibold text-indigo-600'>
              Introducing
            </span>
            <span className='mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl'>
              {data.data.attributes.Title}
            </span>
          </h1>
        </div>
        <div className='mt-6 flex justify-center items-center'>
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
                date={data.data.attributes.publishedAt}
              />
              <span aria-hidden='true'>&middot;</span>
              <span>{"11 min"} read</span>
            </div>
          </div>
        </div>
        {/* <p className='w-full text-center mt-4 text-xl leading-8 text-gray-500'>
          {data.data.attributes.Excerpt}
        </p> */}
        <figure className='my-12'>
          <img
            className='w-full rounded-lg'
            src={data.data.attributes.Hero.data.attributes.formats.large.url}
            alt=''
            width={1310}
            height={873}
          />
        </figure>
        <div
          className={`${styles.content} mx-auto mt-6 text-gray-700 sm:text-lg`}
        >
          <ReactMarkdown>{data.data.attributes.Content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
