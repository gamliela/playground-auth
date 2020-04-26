import React from "react";
import whyDidYouRender from "@welldone-software/why-did-you-render";

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  whyDidYouRender(React);
}

// eslint-disable-next-line react/prop-types,react/display-name
export default ({ Component, pageProps }) => <Component {...pageProps} />;
