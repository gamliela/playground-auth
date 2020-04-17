import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as firebase from "firebase/app";

// from Firebase docs. this value cannot be obtained dynamically.
// https://firebase.google.com/docs/reference/js/firebase.app.App#name
const DEFAULT_NAME = "[DEFAULT]";

const FirebaseAppContext = React.createContext(undefined);

function FirebaseAppProvider({ config, name, children }) {
  const [app, setApp] = useState(null);

  useEffect(() => {
    const existingApp = firebase.apps.find(
      (app) => app.name === (name || DEFAULT_NAME)
    );
    if (existingApp == null) {
      // we're only initializing, never deleting. that's best practice for Firebase on web.
      setApp(firebase.initializeApp(config, name));
    } else {
      setApp(existingApp);
    }
  }, [config, name]);

  return app ? (
    <FirebaseAppContext.Provider value={app}>
      <div>{children}</div>
    </FirebaseAppContext.Provider>
  ) : null;
}

FirebaseAppProvider.propTypes = {
  config: PropTypes.object.isRequired,
  name: PropTypes.string,
  children: PropTypes.node,
};

function useFirebaseAppContext() {
  const app = useContext(FirebaseAppContext);
  if (app == null) {
    throw new Error("FirebaseAppContext does not exists");
  }
  return app;
}

export { FirebaseAppProvider, useFirebaseAppContext };
