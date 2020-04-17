import { useCallback } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import { useFirebaseAppContext } from "./firebase_app";

function useFirebaseGoogleSignIn({ scopes = [] } = {}) {
  const app = useFirebaseAppContext(); // TODO: we should use auth context, and not allow sign while in redirect
  const signin = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    scopes.forEach(provider.addScope);
    app.auth().signInWithRedirect(provider);
    // TODO: we should update the context, so loading can be seen until redirect happens
  }, [app, scopes]);

  return signin;
}

export { useFirebaseGoogleSignIn };
