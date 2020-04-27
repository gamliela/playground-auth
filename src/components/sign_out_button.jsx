import React from "react";
import { useFirebaseAuthContext } from "../auth/firebase_auth";

function SignOutButton() {
  const { signOut } = useFirebaseAuthContext();
  return <button onClick={() => signOut()}>Sign-out from Google</button>;
}

export default SignOutButton;
