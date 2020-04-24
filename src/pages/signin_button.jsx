import React from "react";
import { useFirebaseGoogleSignIn } from "../auth/firebase_sign_in";

function SignInButton() {
  const signIn = useFirebaseGoogleSignIn();
  return <button onClick={signIn}>Sign-in to Google</button>;
}

export default SignInButton;
