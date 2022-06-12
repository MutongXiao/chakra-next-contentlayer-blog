import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';
import React from 'react';

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    return NextDocument.getInitialProps(ctx);
  }
  render() {
    return (
      <Html lang="zh">
        <Head>
          {/* <link
            rel="preload"
            href="/fonts/FiraCode-Regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          /> */}
        </Head>
        <body>
          {/* 👇 Here's the script */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
