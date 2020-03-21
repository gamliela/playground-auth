import * as React from "react";
import style from "./style.module.scss";
import Head from "next/head";

const Page = () => (
  <div className={style.index}>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <h1 className={style.header}>Hello World!</h1>
  </div>
);

export default Page;
