import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import FontFace from '@/components/font-face';
import ToTop from '@/components/ToTop';
// import Analytics from '@/components/site-analytics'

import theme from 'theme';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="theme-color" content="#319795" />
        {/* 推荐 5 款免费开源的网站流量分析统计工具：对用户隐私友好（无 Cookie，不跟踪用户）的开源自建统计工具，经过试用，完全可以作为 Google Analytics、Cloudflare Web Analytics、CNZZ、51LA等统计工具的替代品，而且还有一个好处是可以避免向上面的主流公共统计工具一样被 Ad Block 工具拦截，统计数据更加准确。 
        1.Umami 官网：https://umami.is/ , 
                Github: https://github.com/mikecao/umami
        2.Shynet Github: https://github.com/milesmcc/shynet
        3.Plausible 官网： https://plausible.io/self-hosted-web-analytics， 
                 GIthub： https://github.com/plausible/analytics
        4.Fathom  官网：https://usefathom.com/
                GitHub：https://github.com/usefathom/fathom
        5.Ackee  官网： https://ackee.electerious.com/
               GitHub：https://github.com/electerious/Ackee
        */}
        {/* 网站数据分析第三方脚本，下面这是国外的分析脚本 */}
        {/* {process.env.NODE_ENV === 'production' && (
          <script
            async
            defer
            data-domain="abcjs123.vip"
            src="https://plausible.io/js/plausible.js"
          />
        )} */}
      </Head>
      {/* 站点数据分析脚本，同上的脚本引入 <Analytics /> */}
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <ToTop />
      </ChakraProvider>
      <FontFace />
    </>
  );
}

export default MyApp;
