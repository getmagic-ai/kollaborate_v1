import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { CheckIcon } from "@heroicons/react/20/solid";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";

const tiers = [
  {
    name: "Free",
    priceMonthly: 0,
    description: "Unleash the power of automation",
    includedFeatures: ["5 leads per day", "Discord Community"],
  },
  {
    name: "Professional",
    priceMonthly: 9,
    description: "Advance tools to take your work to next level",
    includedFeatures: [
      "10 leads per day",
      "10 AI based dossiers",
      "5 Contracts reviewed per week",
      "Discord Community",
    ],
  },
  {
    name: "Enterprise",
    priceMonthly: "Contact us",
    description: "Automation plus enterprise grade features",
    includedFeatures: [
      "20 leads per day",
      "Manually curated dossiers",
      "10 Contracts reviewed per week",
      "Pro Discord channel access",
    ],
  },
];

const ProVersion = () => {
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const goToCheckout = async () => {
    setIsCheckoutLoading(true);
    const res = await fetch(`/api/stripe/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { redirectUrl } = await res.json();
    if (redirectUrl) {
      window.location.assign(redirectUrl);
    } else {
      setIsCheckoutLoading(false);
      console.log("Error creating checkout session");
    }
  };

  useEffect(() => {
    status === "unauthenticated" && router.replace("/auth/signin");
  }, [status]);

  return (
    <main className='bg-black'>
      {status === "loading" && <p>Loading...</p>}
      {session &&
        (isCheckoutLoading ? (
          <Loader />
        ) : (
          <div className='bg-gray-900'>
            <div className='mx-auto max-w-7xl py-24 px-6 lg:px-8'>
              <div className='sm:align-center sm:flex sm:flex-col'>
                <h1 className='text-5xl font-bold tracking-tight text-gray-200 sm:text-center'>
                  Pricing Plans
                </h1>
                <p className='mt-5 text-xl text-gray-500 sm:text-center'>
                  Whether your time-saving automation needs are large or small,
                  we’re here to help you scale.
                </p>
                <div className='relative mt-6 flex self-center rounded-lg bg-gray-800 p-0.5 sm:mt-8'>
                  <button
                    type='button'
                    className='relative w-1/2 whitespace-nowrap rounded-md border-gray-200 bg-gray-700 py-2 text-sm font-medium text-gray-200 shadow-sm focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-auto sm:px-8'
                  >
                    Monthly billing
                  </button>
                  <button
                    type='button'
                    className='relative ml-0.5 w-1/2 whitespace-nowrap rounded-md border border-transparent py-2 text-sm font-medium text-gray-300 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-auto sm:px-8'
                  >
                    Yearly billing
                  </button>
                </div>
              </div>
              <div className='mt-12 space-y-4 sm:mt-16 sm:grid md:grid-cols-3 sm:gap-4 sm:space-y-0'>
                {tiers.map((tier) => (
                  <div
                    key={tier.name}
                    className={`${
                      tier.name === "Enterprise" && "bg-gray-800"
                    } divide-y divide-gray-200 rounded-lg border border-gray-200 shadow-sm`}
                  >
                    <div className='p-6'>
                      <h2 className='text-lg font-medium leading-6 text-gray-200'>
                        {tier.name}
                      </h2>
                      <p className='mt-4 text-sm text-gray-500'>
                        {tier.description}
                      </p>
                      {tier.name === "Enterprise" ? (
                        <p className='mt-8'>
                          <span className='text-4xl font-bold tracking-tight text-gray-200'>
                            {tier.priceMonthly}
                          </span>
                        </p>
                      ) : (
                        <p className='mt-8'>
                          <span className='text-4xl font-bold tracking-tight text-gray-200'>
                            ${tier.priceMonthly}
                          </span>{" "}
                          <span className='text-base font-medium text-gray-500'>
                            /mo
                          </span>
                        </p>
                      )}

                      <button
                        onClick={
                          tier.name == "Professional" && !isCheckoutLoading
                            ? goToCheckout
                            : () => {}
                        }
                        className='cursor-pointer mt-8 block w-full rounded-md border border-gray-800 bg-indigo-700 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-900'
                      >
                        Buy {tier.name}
                      </button>
                    </div>
                    <div className='px-6 pt-6 pb-8'>
                      <h3 className='text-sm font-medium text-gray-100'>
                        What's included
                      </h3>
                      <ul role='list' className='mt-6 space-y-4'>
                        {tier.includedFeatures.map((feature) => (
                          <li key={feature} className='flex space-x-3'>
                            <CheckIcon
                              className='h-5 w-5 p-0.5 flex-shrink-0 text-gray-900 bg-gray-300 rounded-full'
                              aria-hidden='true'
                            />
                            <span className='text-sm text-gray-300'>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
    </main>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  };
}

export default ProVersion;
