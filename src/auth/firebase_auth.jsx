import React, { useCallback, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "firebase/auth";
import { useFirebaseAppContext } from "./firebase_app";

// TODO: add logout
// TODO: add auto-login

const FirebaseAuthContext = React.createContext(null);

function FirebaseAuthProvider({ children }) {
  const app = useFirebaseAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const onSigninRequest = useCallback(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setUser(null);
    setError(null);

    let isActive = true;

    const unsubscribeAuthStateChange = app
      .auth()
      .onAuthStateChanged(function (user) {
        if (isActive) {
          setUser(user);
        }
      });

    app
      .auth()
      .getRedirectResult()
      .catch((reason) => {
        if (isActive) {
          setError(reason);
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });
    return () => {
      isActive = false;
      unsubscribeAuthStateChange();
    };
  }, [app]);

  return (
    <FirebaseAuthContext.Provider
      value={{ isLoading, user, error, onSigninRequest }}
    >
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

export { FirebaseAuthContext, FirebaseAuthProvider, useFirebaseAuthContext };
