import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";
import { useAsync } from "react-async";
import * as firebase from "firebase/app";
import "firebase/auth";
import { useFirebaseAppContext } from "./firebase_app";

// TODO: add autoSignIn

function useAuth() {
  const app = useFirebaseAppContext();
  // when returning from redirect, we will not consume the result of the initial promise.
  // running this promise will eventually trigger onAuthStateChanged event,
  // which will update user data and cancel this promise.
  const [promise, setPromise] = useState(null);

  const controller = useAsync({ promise, app, initialValue: null });

  useEffect(() => {
    setPromise(
      app
        .auth()
        .getRedirectResult()
        .then((userCredential) => userCredential.user)
    );
  }, [app]);

  const signIn = useCallback(
    (scopes = []) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      scopes.forEach(provider.addScope);
      setPromise(
        app
          .auth()
          .signInWithRedirect(provider)
          .then(() => null)
      );
    },
    [app]
  );

  const signOut = useCallback(() => {
    setPromise(
      app
        .auth()
        .signOut()
        .then(() => null)
    );
  }, [app]);

  useEffect(() => {
    const unsubscribe = app
      .auth()
      .onAuthStateChanged((user) => setPromise(Promise.resolve(user)));
    return () => {
      unsubscribe();
    };
  }, [app]);

  const isPending = !controller.isSettled;
  const user = controller.data || null;
  const error = controller.error || null;

  return useMemo(
    () => ({
      isPending,
      user,
      error,
      signIn,
      signOut,
    }),
    [isPending, user, error, signIn, signOut]
  );
}

const FirebaseAuthContext = React.createContext(null);

function FirebaseAuthProvider({ children }) {
  const auth = useAuth();

  return (
    <FirebaseAuthContext.Provider value={auth}>
      {children}
    </FirebaseAuthContext.Provider>
  );
}

FirebaseAuthProvider.propTypes = {
  children: PropTypes.node,
};

function useFirebaseAuthContext() {
  const auth = useContext(FirebaseAuthContext);
  if (auth == null) {
    throw new Error("FirebaseAuthContext does not exist");
  }
  return auth;
}

export { FirebaseAuthProvider, useFirebaseAuthContext };
