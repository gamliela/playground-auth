import * as React from "react";
import style from "./style.module.scss";
import Head from "next/head";
import Link from "next/link";
import { FirebaseAppContext, FirebaseAppProvider } from "../auth/firebase_auth";
import { useState } from "react";
import { useContext } from "react";

function AppName() {
  const fbApp = useContext(FirebaseAppContext);
  return fbApp.name;
}

function Page() {
  const [name, setName] = useState(0);
  return (
    <div className={style.index}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FirebaseAppProvider config={{}} name={"name" + name}>
        <h1 className={style.header}>Hello World!</h1>
        <button onClick={() => setName((name) => name + 1)}>New name!</button>
        <div>
          Current name is: <AppName />
        </div>

        <div>
          <Link href="/protected">
            <a>Go to protected page</a>
          </Link>
        </div>
      </FirebaseAppProvider>
    </div>
  );
}

export default Page;
