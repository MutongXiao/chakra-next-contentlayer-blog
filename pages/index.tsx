import type { NextPage } from 'next';
import {
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  VStack,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import SEO from '@/components/seo';

const Home: NextPage = () => {
  return (
    <>
      <SEO
        title="react next 博客"
        description="使用react next 服务端渲染框架开发的博客网站,chakra ui设计,使用contentlayer生成静态内容,支持 mdx"
      />
      <Container maxW={'5xl'}>
        <VStack py={{ base: 20, md: 28 }} spacing={{ base: 8, md: 10 }}>
          <Heading
            w="full"
            textAlign="center"
            fontSize={{
              base: '3xl',
              sm: '4xl',
              md: '6xl',
            }}
            fontWeight={600}
            lineHeight={'110%'}
            letterSpacing={{
              base: 'normal',
              md: 'tight',
            }}
            color="gray.900"
            _dark={{
              color: 'gray.100',
            }}
          >
            Hello,{' '}
            <Text
              as={'span'}
              display={{
                base: 'block',
                lg: 'inline',
              }}
              bgClip="text"
              bgGradient="linear(to-r, green.400,purple.500)"
              fontWeight="extrabold"
            >
              欢迎访问
            </Text>{' '}
            我的博客网站.
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'}>
            此博客网站借鉴了chakra文档，采用chakra
            ui进行设计，使用服务端渲染（SSR）Next框架开发，相比客户端渲染，更利于SEO。
            通过contentlayer生成静态文档内容，支持MDX文档格式，
            相比md格式功能更加强大。项目部署在vercel，简单快捷，一键部署，个人完全免费使用。
          </Text>
          <Stack spacing={6} direction={'row'}>
            <Button
              px={6}
              as="a"
              href="/blog/overview/all"
              rounded={'full'}
              colorScheme="teal"
              bg={'teal.400'}
              _hover={{ bg: 'teal.500' }}
              variant="solid"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              {'Let' + "'" + 's' + ' ' + 'Go' + ' '}
              <Icon boxSize={4} ml={1} viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </Icon>
            </Button>
            <Button
              rounded={'full'}
              px={6}
              as="a"
              href="https://github.com/MutongXiao/chakra-next-contentlayer-blog"
              variant="solid"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <Icon as={FaGithub} mr="1" /> 仓库地址
            </Button>
          </Stack>
        </VStack>
      </Container>
    </>
  );
};

export default Home;
