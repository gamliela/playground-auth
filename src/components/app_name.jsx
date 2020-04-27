import { useFirebaseAppContext } from "../auth/firebase_app";

function AppName() {
  const fbApp = useFirebaseAppContext();
  return fbApp.name;
}

export default AppName;
