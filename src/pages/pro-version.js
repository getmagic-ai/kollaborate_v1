import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

const ProVersion = () => {
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const { data, status } = useSession();

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

  return (
    <main>
      {status === "loading" && <p>Loading...</p>}
      {status === "unauthenticated" && (
        <button onClick={() => signIn()}>Sign In</button>
      )}
      {status === "authenticated" && (
        <button onClick={() => signOut()}>Sign Out</button>
      )}
      {data && (
        <div>
          <p>{JSON.stringify(data)}</p>
          <p>Add a payment method to start using this service!</p>
          <button
            onClick={() => {
              if (isCheckoutLoading) return;
              else goToCheckout();
            }}
          >
            {isCheckoutLoading ? "Loading..." : "Add Payment Method"}
          </button>
        </div>
      )}
    </main>
  );
};

export default ProVersion;
