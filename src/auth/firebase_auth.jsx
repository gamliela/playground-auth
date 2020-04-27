import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import PropTypes from "prop-types";
import { useAsync } from "react-async";
import * as firebase from "firebase/app";
import "firebase/auth";
import { useFirebaseAppContext } from "./firebase_app";

// TODO: add autoSignIn

function authReducer(state, action) {
  switch (action.type) {
    case "getRedirectResult":
      return {
        ...state,
        gotRedirectResult: false,
        promiseFn: () => action.meta.app.auth().getRedirectResult(),
        user: null,
      };
    case "signIn":
      return {
        ...state,
        promiseFn: () =>
          action.meta.app.auth().signInWithRedirect(action.meta.provider),
        user: null,
      };
    case "signOut":
      return {
        ...state,
        promiseFn: () => action.meta.app.auth().signOut(),
      };
    case "onAuthStateChanged":
      return {
        ...state,
        gotRedirectResult: true,
        user: action.meta.user,
      };
    default:
      throw new Error(`unknown authReducer action ${action.type}`);
  }
}

function useAuth() {
  const app = useFirebaseAppContext();

  // React currently does not batch external state updates (https://github.com/facebook/react/issues/14259)
  // We use useReducer to force batching, and to avoid multiple render cycles.
  const [authState, dispatch] = useReducer(authReducer, {
    gotRedirectResult: false,
    promiseFn: null,
    user: null,
  });

  const controller = useAsync({
    promiseFn: authState.promiseFn,
    app,
    initialValue: null,
  });

  useEffect(() => dispatch({ type: "getRedirectResult", meta: { app } }), [
    app,
  ]);

  const signIn = useCallback(
    (scopes = []) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      scopes.forEach(provider.addScope);
      dispatch({ type: "signIn", meta: { app, provider } });
    },
    [app]
  );

  const signOut = useCallback(
    () => dispatch({ type: "signOut", meta: { app } }),
    [app]
  );

  useEffect(() => {
    const unsubscribe = app.auth().onAuthStateChanged((user) => {
      dispatch({ type: "onAuthStateChanged", meta: { user } });
    });
    return () => {
      unsubscribe();
    };
  }, [app]);

  const isPending = !controller.isSettled || !authState.gotRedirectResult;
  const user = (!isPending && authState.user) || null;
  const error = (!isPending && controller.error) || null;

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
