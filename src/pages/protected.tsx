import * as React from "react";
import Head from "next/head";

const Page = () => (
  <div>
    <Head>
      <title>Protected</title>
    </Head>

    <div>This page is protected.</div>
  </div>
);

export default Page;
