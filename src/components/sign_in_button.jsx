import React from "react";
import { useFirebaseAuthContext } from "../auth/firebase_auth";

function SignInButton() {
  const { signIn } = useFirebaseAuthContext();
  return <button onClick={() => signIn()}>Sign-in to Google</button>;
}

export default SignInButton;
