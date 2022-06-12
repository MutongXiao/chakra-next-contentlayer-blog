import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';

import { mainNavLinks } from '@/components/sidebar/blog-sidebar';
import { allCoreContent } from 'utils/contentlayer';
import {
  PostsListPage,
  POSTS_PER_PAGE,
  allSortedBlogPosts,
  postsCategoriesGroup,
} from '../index';
import { type Blog } from 'contentlayer/generated';

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
