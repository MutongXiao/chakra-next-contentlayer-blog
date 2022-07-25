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
          {/* 页面加载进度条样式 */}
          {/* <link rel="stylesheet" href="/css/pace-theme-default.min.css"></link> */}
          {/* 页面加载进度条脚本 */}
          <script
            defer
            src="/js/pace.min.js"
            data-pace-options='{ "restartOnPushState": false }'
          ></script>
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
