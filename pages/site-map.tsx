import React from 'react';
import { Box, chakra, Flex, VStack, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';

interface CardProps {
  title: string;
  siteUrl: string;
  desc: string;
  imgUrl?: string;
}

const Card: React.FC<CardProps> = props => {
  const { title, siteUrl, desc } = props;
  const {
    imgUrl = 'https://images.unsplash.com/photo-1494726161322-5360d4d0eeae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
  } = props;
  return (
    <Flex
      w="full"
      bg="white"
      _dark={{
        bg: 'gray.800',
      }}
      shadow="lg"
      rounded="lg"
      overflow="hidden"
    >
      <Box
        w={1 / 3}
        h="154px"
        bgSize="cover"
        bgRepeat="no-repeat"
        style={{
          backgroundImage: `url('${imgUrl}')`,
        }}
      ></Box>

      <Box
        flex="1"
        p={{
          base: 4,
          md: 4,
        }}
      >
        <chakra.h1
          fontSize={{ base: 'lg', md: '2xl' }}
          noOfLines={1}
          fontWeight="bold"
          color="gray.800"
          _dark={{
            color: 'white',
          }}
        >
          {title}
        </chakra.h1>

        <chakra.p
          mt={2}
          fontSize="sm"
          color="gray.600"
          _dark={{
            color: 'gray.400',
          }}
          style={{
            wordBreak: 'break-all',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {desc}
        </chakra.p>

        <Flex mt={3} alignItems="center" justifyContent="end">
          <NextLink href={siteUrl} passHref>
            <Box as="a" color="teal.400" fontWeight="bold">
              VIEW
            </Box>
          </NextLink>
        </Flex>
      </Box>
    </Flex>
  );
};

export default function UtilsRescoursPage() {
  const siteData = [
    {
      siteGroup: 'UI & 设计',
      siteMap: [
        {
          title: '全自动去除背景',
          desc: '有时候想要把一张图的背景给抠掉，只留下关键部分，这个网站可以帮助我们100%自动搞定。',
          siteUrl: 'https://www.remove.bg/zh',
          imgUrl:
            'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1bc78e786d8846089cd46e1f7df5d0b1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp',
        },
        {
          title: '随机美图',
          desc: '写文章没配图？其他地方找担心有版权问题？那这个网站绝对值得收藏，它有海量免费照片供你选择。',
          siteUrl: 'https://unsplash.com/',
          imgUrl:
            'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/49862dd63f26432a950c2a7025343891~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp',
        },
        {
          title: '插图也很美',
          desc: '也许你不经常使用，但真的超级实用，一个免费海量的插图网站',
          siteUrl: 'https://www.manypixels.co/gallery',
          imgUrl:
            'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/790864aea5bd4a8280d44cea3416d4c9~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp',
        },
        {
          title: '好看的背景渐变色',
          desc: '你经常为你的UI寻找好看的背景渐变吗？有一个集合180种免费的线性渐变网站，可在任何网站使用，你还不心动吗？甚至它连代码都给你写好，直接复制粘贴搞定。',
          siteUrl: 'http://color.oulu.me/',
          imgUrl:
            'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc0ac9e5a381498fa7f65e4ad10663b8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp',
        },
        {
          title: '在线颜色 - colorhunt',
          desc: '漂亮好看的色彩，来选一个自己喜欢的颜色',
          siteUrl: 'https://colorhunt.co/',
          imgUrl:
            'https://cdn4.buysellads.net/uu/1/50174/1564282856-carbon.png',
        },
      ],
    },
    {
      siteGroup: '在线工具',
      siteMap: [
        {
          title: '可视化正则表达式',
          desc: '你是不是和我一样，看到正则表达式犹如遇见魔鬼，看不懂也学不会？别担心，推荐一个能将正则表达式可视化的工具，是不是写起来简单多了？',
          siteUrl: 'https://jex.im/regulex/',
          imgUrl:
            'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d1ac0105e2704e5688c0ef93ad1f862d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp',
        },
        {
          title: '正则校验',
          desc: '也不知道写的正则对不对，那就在线校验一下吧',
          siteUrl: 'https://regexr.com/',
          imgUrl:
            'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d1ac0105e2704e5688c0ef93ad1f862d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp',
        },
        {
          title: 'JSON 格式化',
          desc: 'copy 了一堆json数据集，需要格式化一下吗？',
          siteUrl: 'https://www.jsont.run/',
        },
        {
          title: '接口调试 hoppscotch',
          desc: '开源的在线API接口调试工具，需要的时候用的上',
          siteUrl: 'https://hoppscotch.io/cn',
        },
        {
          title: '美化你的代码',
          desc: '一个可以将代码保存为图片的神奇网站，关键还支持多种主题、语言，不管你是哪种工种，都能为你的代码穿上漂亮的衣裳。',
          siteUrl: 'https://carbon.now.sh/',
          imgUrl:
            'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11bac4486a15405aa82b64785006449d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp',
        },
        {
          title: '在线绘制流程图',
          desc: '可能大家都用过processon画流程图，但是它有文件数量限制，用起来多少有点麻烦，而iodraw全免费，无文件限制，使用方式和其他流程软件几乎一致，爽',
          siteUrl: 'https://www.iodraw.com/',
          imgUrl:
            'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3427bd8a08041809acd098525eec81a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp',
        },
        {
          title: '在线文档DevDocs',
          desc: '遇到问题你还在到处找文档，查答案吗？也许你需要一个在线文档，当然也支持离线噢。',
          siteUrl: 'https://devdocs.io/',
          imgUrl:
            'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54129647598641b7b146ddac261fc149~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp',
        },
        {
          title: '图片压缩 picdiet',
          desc: '在线图片压缩 picdiet',
          siteUrl: 'https://picdiet.eula.club/',
          imgUrl:
            'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4f77d1698234901a3cb0bd24a4e14d0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp',
        },
        {
          title: '图片压缩 tinypng',
          desc: '在线图片压缩神器 tinypng',
          siteUrl: 'https://tinypng.com/',
          imgUrl:
            'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4f77d1698234901a3cb0bd24a4e14d0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp',
        },
      ],
    },
    {
      siteGroup: 'IT资源在线',
      siteMap: [
        {
          title: '海量CDN资源',
          desc: '有时候想本地写个例子不想安装各种依赖，一个在线cdn.js就可以帮我们搞定，但是哪里有海量又稳定的资源呢？没错就是这里啦。',
          siteUrl: 'https://cdnjs.com/',
          imgUrl:
            'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bdf080d15ca34bcba1ff2d471099f614~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp',
        },
      ],
    },
  ];
  return (
    <Box mb="10">
      {siteData.map(item => {
        return (
          <VStack
            key={item.siteGroup}
            maxW="8xl"
            mx="auto"
            px={{ base: '5', md: '10' }}
            my={{ base: '5', md: '10' }}
            spacing="4"
          >
            <Heading
              size={{ base: 'md', md: 'lg' }}
              w="full"
              overflow="hidden"
              textAlign="start"
              borderBottom="1px"
              borderColor="gray.400"
            >
              {item.siteGroup}
            </Heading>
            <Flex justify="start" pb="3" w="full" flexWrap="wrap">
              {item.siteMap.map(data => (
                <Box
                  key={data.siteUrl}
                  width={[
                    '100%', // 0-30em
                    '100%', // 30em-48em
                    '50%', // 48em-62em
                    '50%',
                    '33.33%',
                  ]}
                  pr={{ base: '0', md: '10' }}
                  mt="5"
                  boxSizing="border-box"
                >
                  <Card
                    title={data.title}
                    siteUrl={data.siteUrl}
                    desc={data.desc}
                    imgUrl={data.imgUrl}
                  />
                </Box>
              ))}
            </Flex>
          </VStack>
        );
      })}
    </Box>
  );
}
