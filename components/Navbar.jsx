import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import MainNav from "@/components/MainNav";
import { dark } from "@clerk/themes";

const Navbar = async () => {
  return (
    <div className=''>
      <div className='flex space-x-4 h-16 items-center px-4'>
        <div className='flex flex-1 justify-end'>
          <MainNav />
        </div>

        <div className='ml-auto flex items-center space-x-4'>
          <SignedIn>
            {/* Mount the UserButton component */}
            <UserButton
              appearance={{
                baseTheme: dark,
              }}
              afterSignOutUrl='/'
            />
          </SignedIn>
          <SignedOut>
            {/* Signed out users get sign in button */}
            <SignInButton afterSignInUrl='/' mode='modal'>
              <button className='text-gray-200 text-xm font-medium bg-indigo-600 rounded-lg py-1.5 px-3'>
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
