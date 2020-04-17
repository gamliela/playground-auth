import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as firebase from "firebase/app";
import "firebase/auth";

const FirebaseAppContext = React.createContext(undefined);

function FirebaseAppProvider({ config, name, children }) {
  const [app, setApp] = useState(null);

  useEffect(() => {
    const newApp = firebase.initializeApp(config, name);
    setApp(newApp);

    return () => {
      newApp.delete();
    };
  }, [config, name]);

  return app ? (
    <FirebaseAppContext.Provider value={app}>
      {children}
    </FirebaseAppContext.Provider>
  ) : null;
}

FirebaseAppProvider.propTypes = {
  config: PropTypes.object.isRequired,
  name: PropTypes.string,
  children: PropTypes.node,
};

export { FirebaseAppContext, FirebaseAppProvider };
