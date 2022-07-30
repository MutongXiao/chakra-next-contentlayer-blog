import SEO from '@/components/seo';
import AboutHome from '@/components/about/about-home';

function AboutHomePage() {
  return (
    <>
      <SEO
        title="react next 博客"
        description="使用react next 服务端渲染框架开发的博客网站,chakra ui设计,使用contentlayer生成静态内容,支持 mdx"
      />
      <AboutHome />
    </>
  );
}

export default AboutHomePage;
