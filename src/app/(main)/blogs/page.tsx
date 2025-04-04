import Link from 'next/link';

const posts = [
  {
    id: 1,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2023",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2023",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

export default function Blogs() {
  return (
    <div className='py-6'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl'>
            Our Top Reads
          </h2>
          <p className='mt-2 text-lg leading-8 text-gray-200'>
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className='mx-auto mt-10 grid grid-cols-1 gap-6 border-t border-gray-200 py-6'>
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blogs/${post.id}`}
              className='flex flex-col items-start justify-between bg-gray-950 p-5 w-full'
            >
              <div className='flex items-center gap-x-4 text-xs'>
                <time dateTime={post.datetime} className='text-gray-500'>
                  {post.date}
                </time>
                <a
                  href={post.category.href}
                  className='relative z-10 rounded-full bg-gray-800 px-3 py-1.5 font-medium text-gray-200 hover:bg-gray-700'
                >
                  {post.category.title}
                </a>
              </div>
              <div className='group relative'>
                <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-50 group-hover:text-gray-200'>
                  <a href={post.href}>
                    <span className='absolute inset-0' />
                    {post.title}
                  </a>
                </h3>
                <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-200'>
                  {post.description}
                </p>
              </div>
              <div className='relative mt-8 flex items-center gap-x-4'>
                <img
                  src={post.author.imageUrl}
                  alt=''
                  className='h-10 w-10 rounded-full bg-gray-50'
                />
                <div className='text-sm leading-6'>
                  <p className='font-semibold text-gray-50'>
                    <a href={post.author.href}>
                      <span className='absolute inset-0' />
                      {post.author.name}
                    </a>
                  </p>
                  <p className='text-gray-200'>{post.author.role}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
