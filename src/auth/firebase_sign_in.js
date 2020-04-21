import { useCallback } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import { useFirebaseAppContext } from "./firebase_app";
import { useFirebaseAuthContext } from "./firebase_auth";

function useFirebaseGoogleSignIn({ scopes = [] } = {}) {
  const app = useFirebaseAppContext();
  const { isLoading, onSigninRequest } = useFirebaseAuthContext();
  const signin = useCallback(() => {
    if (isLoading) {
      console.warn("Auth is currently loading; signin request ignored");
    } else {
      const provider = new firebase.auth.GoogleAuthProvider();
      scopes.forEach(provider.addScope);
      app.auth().signInWithRedirect(provider);
      onSigninRequest();
    }
  }, [app, isLoading, onSigninRequest, scopes]);

  return signin;
}

export { useFirebaseGoogleSignIn };
