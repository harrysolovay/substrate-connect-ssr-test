import Document, { Head, Html, Main, NextScript } from "next/document";
import * as React from "react";

export default class Doc extends Document {
  static getInitialProps: typeof Document.getInitialProps = async (ctx) => {
    return Document.getInitialProps(ctx);
  };

  render(): React.ReactElement {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
