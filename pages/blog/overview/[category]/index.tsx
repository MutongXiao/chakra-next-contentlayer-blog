import { useRouter } from 'next/router';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next/types';
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

import BlogContainer from '@/components/page-container/blog-container';
import PostItem from '@/components/post-item';
import Pagination from '@choc-ui/paginator';
import {
  CoreContent,
  sortedBlogPost,
  getPostsCategoriesGroup,
  allCoreContent,
} from 'utils/contentlayer';
import { allBlogs, type Blog } from 'contentlayer/generated';
import { mainNavLinks } from '@/components/sidebar/blog-sidebar';

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
    router.push(`/blog/overview/${category}/${currentPage}`);
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
    <BlogContainer
      frontmatter={{ title: pageContainerTitle }}
      pagination={PostsPagination}
    >
      <Box mb="8">
        <Search />
      </Box>
      <VStack
        divider={<StackDivider borderColor={dividerColor} />}
        spacing={{ base: '3', md: '5' }}
        align="stretch"
      >
        {!initialDisplayPosts.length && NotMore}
        {initialDisplayPosts.map(post => (
          <PostItem
            key={post.slug}
            title={post.title}
            publishDate={post.date}
            tags={post.tags}
            href={`/blog/${post.slug}`}
          />
        ))}
      </VStack>
    </BlogContainer>
  );
};

export const POSTS_PER_PAGE = 10;

export const allSortedBlogPosts = sortedBlogPost(allBlogs);
export const postsCategoriesGroup = getPostsCategoriesGroup();

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postsCategoriesGroup.map(c => ({
    params: { category: c.category },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const {
    params: { category },
  } = context;

  const posts =
    category === 'all'
      ? allSortedBlogPosts
      : allSortedBlogPosts.reduce((posts: Blog[], post) => {
          post.slug.startsWith(category as string) && posts.push(post);
          return posts;
        }, []);

  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);
  const contianerTitle = mainNavLinks.find(nav =>
    nav.href.includes(category as string),
  ).label;

  const pagination = {
    defaultCurrent: 1,
    pageSize: POSTS_PER_PAGE,
    total: posts.length,
  };

  return {
    props: {
      initialDisplayPosts: allCoreContent(initialDisplayPosts),
      pagination,
      contianerTitle,
    },
  };
};

export default function PostsPage({
  initialDisplayPosts,
  pagination,
  contianerTitle,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PostsListPage
      pageContainerTitle={contianerTitle}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
    />
  );
}
