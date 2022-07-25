import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';

import { mainNavLinks } from '@/components/sidebar/blog-sidebar';
import BaseLayout from 'layout/base-layout';
import { allCoreContent } from 'utils/contentlayer';
import {
  PostsListPage,
  POSTS_PER_PAGE,
  allSortedBlogPosts,
  postsCategoriesGroup,
} from './index';
import { type Blog } from 'contentlayer/generated';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postsCategoriesGroup.reduce((paths, categoryObj) => {
    const categoryTotalPage = Math.ceil(categoryObj.total / POSTS_PER_PAGE);
    const subPaths = Array.from({ length: categoryTotalPage }, (_, i) => ({
      params: { category: categoryObj.category, page: (i + 1).toString() },
    }));
    return [...paths, ...subPaths];
  }, []);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const {
    params: { page, category },
  } = context;

  const posts =
    category === 'all'
      ? allSortedBlogPosts
      : allSortedBlogPosts.reduce((posts: Blog[], post) => {
          post.slug.startsWith(category as string) && posts.push(post);
          return posts;
        }, []);
  const contianerTitle = mainNavLinks.find(nav =>
    nav.href.includes(category as string),
  ).label;

  const pageNumber = parseInt(page as string);
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber,
  );

  const pagination = {
    defaultCurrent: pageNumber,
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
    <BaseLayout>
      <PostsListPage
        pageContainerTitle={contianerTitle}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
      />
    </BaseLayout>
  );
}
