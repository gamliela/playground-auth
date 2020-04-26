import React from "react";
import { useFirebaseAuthContext } from "../auth/firebase_auth";

function AuthStatus() {
  const auth = useFirebaseAuthContext();
  return (
    <div>
      isPending: <pre>{"" + auth.isPending}</pre>
      <br />
      User: <pre>{JSON.stringify(auth.user, null, 2)}</pre>
      <br />
      Error: <pre>{JSON.stringify(auth.error, null, 2)}</pre>
    </div>
  );
}

AuthStatus.whyDidYouRender = true; //{ logOnDifferentValues: true };

export default AuthStatus;
