import * as React from "react";
import Head from "next/head";
import FirebaseConfig from "../auth/firebase_config";
import { FirebaseAppProvider } from "../auth/firebase_app";
import AuthStatus from "./auth_status";
import { FirebaseAuthProvider } from "../auth/firebase_auth";

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
