import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { useRouter } from "next/router";

const plans = [
  {
    title: "Starter",
    featured: false,
    description: "All your essential business finances, taken care of.",
    priceMonthly: 5,
    priceYearly: 56,
    mainFeatures: [
      { id: 1, value: "Basic invoicing" },
      { id: 2, value: "Easy to use accounting" },
      { id: 3, value: "Mutli-accounts" },
    ],
  },
  {
    title: "Scale",
    featured: true,
    description: "The best financial services for your thriving business.",
    priceMonthly: 19,
    priceYearly: 220,
    mainFeatures: [
      { id: 1, value: "Advanced invoicing" },
      { id: 2, value: "Easy to use accounting" },
      { id: 3, value: "Mutli-accounts" },
      { id: 4, value: "Tax planning toolkit" },
      { id: 5, value: "VAT & VATMOSS filing" },
      { id: 6, value: "Free bank transfers" },
    ],
  },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
    <main className='bg-white'>
      {status === "loading" && <p>Loading...</p>}
      {session && (
        <div className='bg-gray-900 py-6'>
          <div>
            <div className='relative mx-auto max-w-2xl px-6 pt-16 text-center lg:max-w-7xl lg:px-8'>
              <h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>
                <span className='block lg:inline'>Simple pricing,</span>
                <span className='block lg:inline'>no commitment.</span>
              </h1>
              <p className='mt-4 text-xl text-indigo-100'>
                Everything you need, nothing you don't. Pick a plan that best
                suits your business.
              </p>
            </div>
            <h2 className='sr-only'>Plans</h2>
            {/* Toggle */}
            <div className='relative mt-12 flex justify-center sm:mt-16'>
              <div className='flex rounded-lg bg-gray-500 p-0.5'>
                <div className='relative whitespace-nowrap rounded-md border-gray-500 bg-gray-800 py-2 px-6 text-sm font-medium text-gray-200 shadow-sm focus:z-10'>
                  Monthly billing
                </div>
              </div>
            </div>
            {/* Cards */}
            <div className='relative mx-auto mt-8 max-w-2xl px-6 pb-8 sm:mt-12 lg:max-w-7xl lg:px-8 lg:pb-0'>
              {/* Decorative background */}
              <div
                aria-hidden='true'
                className='absolute inset-0 top-4 bottom-6 left-8 right-8 hidden rounded-tl-lg rounded-tr-lg bg-gray-800 lg:block'
              />

              <div className='relative space-y-6 lg:grid lg:grid-cols-2 lg:space-y-0'>
                {plans.map((plan) => (
                  <div
                    key={plan.title}
                    className={classNames(
                      plan.featured
                        ? "bg-gray-900 ring-2 ring-indigo-700 shadow-md"
                        : "bg-indigo-700 lg:bg-transparent",
                      "pt-6 px-6 pb-3 rounded-lg lg:px-8 lg:pt-12"
                    )}
                  >
                    <div>
                      <h3
                        className={classNames(
                          "text-white",
                          "text-base font-semibold"
                        )}
                      >
                        {plan.title}
                      </h3>
                      <div className='flex flex-col items-start sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-start'>
                        <div className='mt-3 flex items-center'>
                          <p
                            className={classNames(
                              "text-white",
                              "text-4xl font-bold tracking-tight"
                            )}
                          >
                            ${plan.priceMonthly}
                          </p>
                          <div className='ml-4'>
                            <p
                              className={classNames(
                                plan.featured ? "text-gray-700" : "text-white",
                                "text-sm"
                              )}
                            >
                              USD / mo
                            </p>
                            <p
                              className={classNames(
                                plan.featured
                                  ? "text-gray-500"
                                  : "text-indigo-200",
                                "text-sm"
                              )}
                            >
                              Billed yearly (${plan.priceYearly})
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            goToCheckout();
                            setIsCheckoutLoading(true);
                          }}
                          className={classNames(
                            plan.featured
                              ? "bg-indigo-600 text-white hover:bg-indigo-700"
                              : "bg-white text-indigo-600 hover:bg-indigo-50",
                            "mt-6 w-full inline-block py-2 px-8 border border-transparent rounded-md shadow-sm text-center text-sm font-medium sm:mt-0 sm:w-auto lg:mt-6 lg:w-full"
                          )}
                        >
                          Buy {plan.title}
                        </button>
                      </div>
                    </div>
                    <h4 className='sr-only'>Features</h4>
                    <ul
                      role='list'
                      className={classNames(
                        plan.featured
                          ? "border-gray-200 divide-gray-200"
                          : "border-indigo-500 divide-indigo-500 divide-opacity-75",
                        "mt-7 border-t divide-y lg:border-t-0"
                      )}
                    >
                      {plan.mainFeatures.map((mainFeature) => (
                        <li
                          key={mainFeature.id}
                          className='flex items-center py-3'
                        >
                          <CheckIcon
                            className={classNames(
                              plan.featured
                                ? "text-indigo-500"
                                : "text-indigo-200",
                              "w-5 h-5 flex-shrink-0"
                            )}
                            aria-hidden='true'
                          />
                          <span
                            className={classNames(
                              plan.featured ? "text-gray-600" : "text-white",
                              "ml-4 text-sm font-medium"
                            )}
                          >
                            {mainFeature.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
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
