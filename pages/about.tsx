import type { NextPage } from 'next';
import SEO from '@/components/seo';
import AboutHome from '@/components/about/about-home';

const About: NextPage = () => {
  return (
    <>
      <SEO
        title="react next 博客"
        description="使用react next 服务端渲染框架开发的博客网站,chakra ui设计,使用contentlayer生成静态内容,支持 mdx"
      />
      <AboutHome />
      {/* <Script type="text/javascript" src="/js/jquery.min.js"></Script>
      <Script type="text/javascript" src="/js/fetch.min.js"></Script>
      <Script type="text/javascript" src="/js/main.js"></Script> */}
    </>
  );
};

export default About;
