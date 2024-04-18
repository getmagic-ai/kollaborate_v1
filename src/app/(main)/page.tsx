"use client";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckIcon, Loader } from "lucide-react";

export default function Component() {
  return (
    <div className='flex flex-col min-h-[100dvh] text-gray-100'>
      <section className='w-full py-12 md:py-24 lg:py-32'>
        <div className='container px-4 md:px-6'>
          <div className='grid gap-6 md:grid-cols-1 lg:gap-12 lg:grid-cols-3'>
            <div className='flex flex-col justify-center space-y-4 lg:col-span-2'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-medium tracking-tighter sm:text-5xl xl:text-6xl/none'>
                  The complete platform for building the Web
                </h1>
                <p className='max-w-[600px] text-gray-300 md:text-xl'>
                  Give your team the toolkit to stop configuring and start
                  innovating. Securely build, deploy, and scale the best web
                  experiences.
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
              <h2 className='text-3xl font-medium tracking-tighter sm:text-5xl'>
                Faster iteration. More innovation.
              </h2>
              <p className='mx-auto max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                The platform for rapid progress. Let your team focus on shipping
                features instead of managing infrastructure with automated
                CI/CD, built-in testing, and integrated collaboration.
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
                Enable code to run on-demand without needing to manage your own
                infrastructure or upgrade hardware.
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
              <h3 className='text-xl font-bold'>Personalization at the edge</h3>
              <p className='text-sm text-gray-300'>
                Deliver dynamic, personalized content, while ensuring users only
                see the best version of your site.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className='w-full py-12 md:py-24 lg:py-32'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <div className='space-y-2'>
              <div className='inline-block rounded-lg px-3 py-1 text-sm'>
                Pricing
              </div>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                Pricing for every team
              </h2>
              <p className='max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Choose the plan that's right for your business. No hidden fees,
                ever.
              </p>
            </div>
          </div>
          <div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12'>
            <Card className='flex flex-col justify-between rounded-lg border border-gray-200 bg-gray-800 p-6 shadow-sm transition-colors hover:border-gray-300'>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <h3 className='text-2xl font-bold'>Starter</h3>
                  <p className='text-gray-300'>
                    For small teams or individuals.
                  </p>
                </div>
                <div className='space-y-1'>
                  <p className='text-4xl font-bold'>$9</p>
                  <p className='text-sm text-gray-300'>per user / month</p>
                </div>
              </div>
              <div className='space-y-4'>
                <ul className='space-y-2 text-sm text-gray-300'>
                  <li className='flex items-center gap-2'>
                    <CheckIcon className='h-4 w-4 text-gray-100 ' />1 user
                  </li>
                  <li className='flex items-center gap-2'>
                    <CheckIcon className='h-4 w-4 text-gray-100 ' />1 GB storage
                  </li>
                  <li className='flex items-center gap-2'>
                    <CheckIcon className='h-4 w-4 text-gray-100 ' />
                    Basic analytics
                  </li>
                </ul>
                <Button className='w-full'>Get Started</Button>
              </div>
            </Card>
            <Card className='flex flex-col justify-between rounded-lg border border-gray-200 bg-gray-800 p-6 shadow-sm transition-colors hover:border-gray-300'>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <h3 className='text-2xl font-bold'>Pro</h3>
                  <p className='text-gray-300'>For growing teams.</p>
                </div>
                <div className='space-y-1'>
                  <p className='text-4xl font-bold'>$29</p>
                  <p className='text-sm text-gray-300'>per user / month</p>
                </div>
              </div>
              <div className='space-y-4'>
                <ul className='space-y-2 text-sm text-gray-300'>
                  <li className='flex items-center gap-2'>
                    <CheckIcon className='h-4 w-4 text-gray-100 ' />5 users
                  </li>
                  <li className='flex items-center gap-2'>
                    <CheckIcon className='h-4 w-4 text-gray-100 ' />
                    10 GB storage
                  </li>
                  <li className='flex items-center gap-2'>
                    <CheckIcon className='h-4 w-4 text-gray-100 ' />
                    Advanced analytics
                  </li>
                </ul>
                <Button className='w-full'>Get Started</Button>
              </div>
            </Card>
            <Card className='flex flex-col justify-between rounded-lg border border-gray-200 bg-gray-800 p-6 shadow-sm transition-colors hover:border-gray-300'>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <h3 className='text-2xl font-bold'>Enterprise</h3>
                  <p className='text-gray-300'>
                    For large teams and organizations.
                  </p>
                </div>
                <div className='space-y-1'>
                  <p className='text-4xl font-bold'>$99</p>
                  <p className='text-sm text-gray-300'>per user / month</p>
                </div>
              </div>
              <div className='space-y-4'>
                <ul className='space-y-2 text-sm text-gray-300'>
                  <li className='flex items-center gap-2'>
                    <CheckIcon className='h-4 w-4 text-gray-100 ' />
                    Unlimited users
                  </li>
                  <li className='flex items-center gap-2'>
                    <CheckIcon className='h-4 w-4 text-gray-100 ' />
                    Unlimited storage
                  </li>
                  <li className='flex items-center gap-2'>
                    <CheckIcon className='h-4 w-4 text-gray-100 ' />
                    Enterprise-grade analytics
                  </li>
                </ul>
                <Button className='w-full'>Get Started</Button>
              </div>
            </Card>
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
            <Link className='text-sm hover:text-gray-300' href='#'>
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
