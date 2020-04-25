import * as React from "react";
import style from "./style.module.scss";
import Head from "next/head";
import Link from "next/link";
import FirebaseConfig from "../auth/firebase_config";
import { FirebaseAppProvider } from "../auth/firebase_app";
import { FirebaseAuthProvider } from "../auth/firebase_auth";
import AppName from "./app_name";
import AuthStatus from "./auth_status";
import SignInButton from "./sign_in_button";
import SignOutButton from "./sign_out_button";

function Page() {
  return (
    <div className={style.index}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="index">
        <FirebaseAppProvider config={FirebaseConfig}>
          <h1 className={style.header}>Hello World!</h1>

          <div>
            Application name is: <AppName />
          </div>

          <FirebaseAuthProvider>
            <AuthStatus />

            <div>
              <SignInButton />
              <SignOutButton />
            </div>
          </FirebaseAuthProvider>

          <div>
            <Link href="/protected">
              <a>Go to protected page</a>
            </Link>
          </div>
        </FirebaseAppProvider>
      </div>
    </div>
  );
}

export default Page;
