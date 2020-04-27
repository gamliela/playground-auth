import * as React from "react";
import Head from "next/head";
import { FirebaseAppProvider } from "../auth/firebase_app";
import { FirebaseAuthProvider } from "../auth/firebase_auth";
import FirebaseConfig from "../components/firebase_config";
import AuthStatus from "../components/auth_status";

const Page = () => (
  <div>
    <Head>
      <title>Protected</title>
    </Head>
    <div id="protected">
      <FirebaseAppProvider config={FirebaseConfig}>
        <div>This page is protected.</div>

        <FirebaseAuthProvider>
          <AuthStatus />
        </FirebaseAuthProvider>
      </FirebaseAppProvider>
    </div>
  </div>
);

export default Page;
