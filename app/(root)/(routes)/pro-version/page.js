import { CheckIcon } from "@heroicons/react/24/solid";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { stripe } from "@/lib/stripe";
import { SubscriptionButton } from "@/components/SubscriptionButton";
import { Button } from "@/components/ui/button";
import { checkSubscription } from "@/lib/subscription";

const getPrice = async () => {
  const { data } = await stripe.prices.list();
  const priceData = data.filter(
    (prices) => prices.id === process.env.STRIPE_PRICE_ID
  );
  return priceData[0];
};

export default async function ProVersion() {
  const price = await getPrice();
  const isPro = await checkSubscription();

  const tiers = [
    {
      name: "Free",
      priceMonthly: `${price.currency.toUpperCase()} 0`,
      description:
        "Unleash the power of automation take your work to next level",
      includedFeatures: ["5 leads per day", "Discord Community"],
    },
    {
      name: "Professional",
      priceMonthly: `${price.currency.toUpperCase()} ${
        price?.unit_amount / 100
      }`,
      description:
        "Unleash the power of Automation. Advance tools to take your work to next level",
      includedFeatures: [
        "10 leads per day",
        "10 AI based dossiers",
        "5 Contracts reviewed per week",
        "Discord Community",
      ],
    },
  ];

  return (
    <div>
      <SignedIn>
        <div className='bg-gray-900'>
          <div className='mx-auto max-w-7xl py-24 px-6 lg:px-8'>
            <div className='sm:align-center sm:flex sm:flex-col'>
              <h1 className='text-5xl font-bold tracking-tight text-gray-200 sm:text-center'>
                Pricing Plans
              </h1>
              <p className='mt-5 text-xl text-gray-300 sm:text-center'>
                Whether your time-saving automation needs are large or small,
                we’re here to help you scale.
              </p>
              {isPro && (
                <div>
                  <p className='mt-2 text-md text-gray-400 max-w-4xl sm:text-center'>
                    You already have a premium subscription. Manage your
                    subscription by clicking button below.
                  </p>
                  <SubscriptionButton
                    className='mt-4 block mx-auto max-w-2xl'
                    isPro={isPro}
                  />
                </div>
              )}

              <div className='relative mt-6 flex self-center rounded-lg bg-gray-800 p-0.5 sm:mt-8'>
                <button
                  type='button'
                  className='relative w-1/2 whitespace-nowrap rounded-md border-gray-200 bg-gray-700 py-2 text-sm font-medium text-gray-200 shadow-sm focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-auto sm:px-8'
                >
                  Monthly billing
                </button>
              </div>
            </div>
            <div className='mt-12 space-y-4 sm:mt-16 sm:grid md:grid-cols-2 sm:gap-4 sm:space-y-0'>
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
                          {tier.priceMonthly}
                        </span>{" "}
                        <span className='text-base font-medium text-gray-500'>
                          /mo
                        </span>
                      </p>
                    )}
                    {!isPro &&
                      (tier.name === "Professional" ? (
                        <SubscriptionButton
                          className='mt-8 block w-full'
                          isPro={isPro}
                        />
                      ) : (
                        <Button
                          variant={"outline"}
                          className='mt-8 block w-full'
                          disabled
                        >
                          Currently on Free Plan
                        </Button>
                      ))}
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
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
