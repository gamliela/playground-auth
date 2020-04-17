import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "firebase/auth";
import { useFirebaseAppContext } from "./firebase_app";

const FirebaseAuthContext = React.createContext({
  isLoading: false,
  user: null,
  error: null,
});

function FirebaseAuthProvider({ children }) {
  const app = useFirebaseAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

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
    <FirebaseAuthContext.Provider value={{ isLoading, user, error }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
}

FirebaseAuthProvider.propTypes = {
  children: PropTypes.node,
};

export { FirebaseAuthContext, FirebaseAuthProvider };
