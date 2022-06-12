import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import {
  Box,
  Heading,
  Text,
  Link,
  VStack,
  StackDivider,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { FC, ComponentProps } from 'react';
import NextLink from 'next/link';
import Search from '@/components/search/omni-search';

import BlogLayout from 'layout/blog-layout';
import PostItem from '@/components/post-item';
import Pagination from '@choc-ui/paginator';
import {
  CoreContent,
  sortedBlogPost,
  getPostsCategoriesGroup,
} from 'utils/contentlayer';
import { allBlogs, type Blog } from 'contentlayer/generated';

interface PostsListProps {
  pageContainerTitle: string;
  initialDisplayPosts?: CoreContent<Blog>[];
  pagination?: ComponentProps<typeof Pagination>;
}

const NotMore: React.ReactNode = (
  <Box textAlign="center" py={10} px={6}>
    <Heading
      display="inline-block"
      as="h4"
      size={{ base: 'md', md: 'xl' }}
      bgGradient="linear(to-r, teal.400, teal.600)"
      backgroundClip="text"
    >
      暂无更多数据
    </Heading>
    <Text
      fontSize={{ base: '14px', md: '18px' }}
      color={'gray.500'}
      mt={3}
      mb={6}
    >
      空空如也, 什么也没找到
    </Text>
    <NextLink href="/home" passHref>
      <Link
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid"
        fontSize="sm"
        size={{ base: 'sm', md: 'md' }}
        p="2"
        borderRadius="md"
        _hover={{ textDecoration: 'none' }}
      >
        回首页看看
      </Link>
    </NextLink>
  </Box>
);

export const PostsListPage: FC<PostsListProps> = ({
  pageContainerTitle,
  initialDisplayPosts = [],
  pagination,
}) => {
  const router = useRouter();
  const dividerColor = useColorModeValue('gray.300', 'gray.600');

  const changePageCallback = (currentPage?: number) => {
    const { category } = router.query;
    router.push(`/blog/${category}/${currentPage}`);
  };
  const PostsPagination = (
    <>
      {pagination && pagination.total > 1 && (
        <Flex mt="12" justify={{ base: 'center', md: 'end' }}>
          <Pagination
            size="sm"
            defaultCurrent={pagination.defaultCurrent}
            pageSize={pagination.pageSize}
            total={pagination.total}
            paginationProps={{ display: 'flex' }}
            onChange={changePageCallback}
            activeStyles={{ bg: 'teal.400', color: 'whiteAlpha.900' }}
            baseStyles={{
              border: '1px',
              borderColor: 'teal.400',
            }}
          />
        </Flex>
      )}
    </>
  );
  return (
    <BlogLayout
      frontmatter={{ title: pageContainerTitle }}
      pagination={PostsPagination}
    >
      <Box mb="8">
        <Search />
      </Box>
      <VStack
        divider={<StackDivider borderColor={dividerColor} />}
        spacing={{ base: '2', md: '4' }}
        align="stretch"
      >
        {!initialDisplayPosts.length && NotMore}
        {initialDisplayPosts.map(post => (
          <PostItem
            key={post.slug}
            title={post.title}
            publishDate={post.date}
            tags={post.tags}
            href={`/blog/detail/${post.slug}`}
          />
        ))}
      </VStack>
    </BlogLayout>
  );
};

export const POSTS_PER_PAGE = 10;

export const allSortedBlogPosts = sortedBlogPost(allBlogs);
export const postsCategoriesGroup = getPostsCategoriesGroup();

export default function Blog() {
  return <></>;
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    redirect: {
      destination: '/blog/all',
      //permanent: false,
      statusCode: 301, //permanent and statusCode are not both
    },
  };
};
