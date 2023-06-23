import { signIn, getCsrfToken, getProviders } from "next-auth/react";

export default function SignIn({ providers }) {
  return (
    <div className='flex h-screen w-full bg-black'>
      <div className='flex flex-1 flex-col space-y-4 justify-center items-center'>
        {providers &&
          Object.values(providers).map((provider) => (
            <div
              key={provider.name}
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl: `${window.location.origin}`,
                })
              }
              className='cursor-pointer px-8 py-4 text-gray-900 max-w-xs bg-white hover:bg-gray-100 font-medium text-sm text-center'
            >
              <p>Sign in with {provider.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      providers,
      csrfToken: csrfToken || null,
    },
  };
}
