import React, { useContext } from "react";
import { FirebaseAuthContext } from "../auth/firebase_auth";

function AuthStatus() {
  const auth = useContext(FirebaseAuthContext);
  return (
    <div>
      isLoading: <pre>{"" + auth.isLoading}</pre>
      <br />
      User: <pre>{JSON.stringify(auth.user, null, 2)}</pre>
      <br />
      Error: <pre>{JSON.stringify(auth.error, null, 2)}</pre>
    </div>
  );
}

export default AuthStatus;
