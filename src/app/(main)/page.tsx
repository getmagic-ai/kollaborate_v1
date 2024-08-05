"use client";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckIcon, Loader } from "lucide-react";
import { useEffect, useState } from "react";

export default function Component() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <div className='flex flex-col min-h-[100dvh] text-gray-100'>
      <section className='w-full py-12 md:py-24 lg:py-32'>
        <div className='container px-4 md:px-6'>
          <div className='grid gap-6 md:grid-cols-1 lg:gap-12 lg:grid-cols-3'>
            <div className='flex flex-col justify-center space-y-4 lg:col-span-2'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-medium  sm:text-5xl xl:text-6xl/none'>
                  Amplify your brand through authentic creator collaborations.
                  <h3 className='text-xl font-medium  sm:text-3xl xl:text-4xl/none'>
                    Find the right YouTube, TikTok, podcast and other creators
                    to expand your reach and drive business growth.
                  </h3>
                  <div className='mt-4 space-y-2'>
                    <p className='text-lg text-gray-300 font-body'>
                      For Creators:
                    </p>
                    <p className='text-gray-400 font-body text-sm'>
                      Monetize your creativity by partnering with leading brands
                      aligned with your audience and values. Get paid for
                      integrated promotions and sponsored content opportunities.
                    </p>
                    <p className='text-lg text-gray-300 mt-4 font-body'>
                      For Brands:
                    </p>
                    <p className='text-base text-gray-400 font-body'>
                      Leverage a diverse network of influential creators across
                      channels. Collaborate on engaging campaigns that resonate
                      and convert through trusted voices.
                    </p>
                  </div>
                </h1>
                <p className='max-w-[600px] text-gray-300 md:text-xl'>
                  Give your business the toolkit to drive growth at scale. Let
                  our AI help you find, collaborate with and scale custom
                  content for your business, across all the channels <s>your</s>{" "}
                  audience uses.
                </p>
                <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                  <Link
                    className={buttonVariants({ variant: "secondary" })}
                    href='/brands'
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </section>
      <section className='w-full py-12 md:py-24 lg:py-32'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <div className='space-y-2'>
              <div className='inline-block rounded-lg px-3 py-1 text-sm'>
                New Features
              </div>
              <h2 className='text-3xl font-medium  sm:text-5xl'>
                Faster iteration. More innovation.
              </h2>
              <p className='mx-auto max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                The platform for rapid progress. Let your team focus on
                executing the perfect campaign acorss top social channels.
              </p>
            </div>
          </div>
          <div className='mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12'>
            <div className='grid gap-1'>
              <CheckIcon className='h-10 w-10 text-gray-100 ' />
              <h3 className='text-xl font-bold'>
                Infinite scalability, zero config
              </h3>
              <p className='text-sm text-gray-300'>
                Enable cretive collaborations and campaigns to run on-demand
                without needing to manage your own infrastructure or invest in
                additional resources.
              </p>
            </div>
            <div className='grid gap-1'>
              <CheckIcon className='h-10 w-10 text-gray-100 ' />
              <h3 className='text-xl font-bold'>
                Real-time insights and controls
              </h3>
              <p className='text-sm text-gray-300'>
                Get granular, first-party, real-user metrics on site performance
                per deployment.
              </p>
            </div>
            <div className='grid gap-1'>
              <CheckIcon className='h-10 w-10 text-gray-100 ' />
              <h3 className='text-xl font-bold'>
                100% Personalization to your brand
              </h3>
              <p className='text-sm text-gray-300'>
                Bring a fully personalized message to life be it on YouTube,
                Podcasts, Tiktok or Instagram.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className='w-full bg-gray-900 text-gray-400 py-8'>
        <div className='container mx-auto flex flex-col md:flex-row items-center justify-between gap-6'>
          <div className='flex items-center gap-2'>
            <Loader className='h-6 w-6 text-gray-400' />
            <span className='text-lg font-semibold'>Kollaborate.co</span>
          </div>
          <p className='max-w-md text-sm'>Kollaborate.co is a leading SaaS</p>
          <nav className='flex items-center gap-4'>
            <Link className='text-sm hover:text-gray-300' href='/privacy'>
              Privacy
            </Link>
            <Link className='text-sm hover:text-gray-300' href='#'>
              Terms
            </Link>
            <Link className='text-sm hover:text-gray-300' href='#'>
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
