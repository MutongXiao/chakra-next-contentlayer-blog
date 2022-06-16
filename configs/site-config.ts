const baseUrl = 'https://abcjs123.vip';

const siteConfig = {
  site: {
    siteUrl: baseUrl,
    siteName: '阿蛮陋室',
    sitePublicRecordNo: '37923267947934',
  },
  copyright: `Copyright © ${new Date().getFullYear()} Segun Adebayo. All Rights Reserved.`,
  author: {
    name: 'mutongxiao',
    github: 'https://github.com/mutongxiao',
    email: 'mutongxiao@hotmail.com',
  },
  repo: {
    url: baseUrl,
    blobUrl: `${baseUrl}/blob`,
  },
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports plausible, simpleAnalytics, umami or googleAnalytics
    plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    simpleAnalytics: false, // true or false
    umamiWebsiteId: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    googleAnalyticsId: '', // e.g. UA-000000-2 or G-XXXXXXX
  },
  seo: {
    title: '阿蛮陋室',
    titleTemplate: '%s - 阿蛮陋室',
    description:
      '阿蛮的个人空间Blog，记录我的前端学习笔记&跨境笔记，学习中的点点滴滴，分享我所知.',
    siteUrl: 'https://chakra-next-contentlayer-blog.vercel.app/',
    openGraph: {
      type: 'website',
      locale: 'cn_ZH',
      url: 'https://chakra-next-contentlayer-blog.vercel.app/',
      title: '阿蛮的博客网站',
      description:
        '使用React,Next,chakra ui,contentlayer,开发的支持mdx文档的博客项目',
      site_name:
        '阿蛮的博客: react next blog 个人博客，欢迎GitHub（https://github.com/MutongXiao/chakra-next-contentlayer-blog）上借鉴练手',
      images: [
        {
          url: 'https://chakra-ui.com/og-image.png',
          width: 1240,
          height: 480,
          alt: 'Chakra UI: Simple, Modular and Accessible UI Components for your React Applications.',
        },
        {
          url: 'https://chakra-ui.com/twitter-og-image.png',
          width: 1012,
          height: 506,
          alt: 'Chakra UI: Simple, Modular and Accessible UI Components for your React Applications.',
        },
      ],
    },
  },
};

export default siteConfig;
