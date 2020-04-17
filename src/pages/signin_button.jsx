import React from "react";
import { useFirebaseGoogleSignIn } from "../auth/firebase_sign_in";

function SignInButton() {
  const signin = useFirebaseGoogleSignIn();
  return <button onClick={signin}>SignIn to Google</button>;
}

export default SignInButton;
