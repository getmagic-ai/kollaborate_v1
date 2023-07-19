import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserProfile,
} from "@clerk/nextjs";

function Profile() {
  return (
    <div className='px-14'>
      <SignedIn>
        {/* Signed in users will see their user profile */}

        <UserProfile />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}

export default Profile;
