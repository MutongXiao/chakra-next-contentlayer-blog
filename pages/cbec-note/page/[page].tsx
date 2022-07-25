import CbecListContainer from '@/components/page-container/cbec-list-container';
import BaseLayout from 'layout/base-layout';
import { allCbecNotes } from 'contentlayer/generated';
import { GetStaticPaths, InferGetStaticPropsType } from 'next/types';
import { allCoreContent } from 'utils/contentlayer';
import { POSTS_PER_PAGE, sortedAllPosts } from '../index';

export const getStaticPaths: GetStaticPaths = async () => {
  const totalPosts = allCbecNotes;
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async context => {
  const {
    params: { page },
  } = context;
  const posts = sortedAllPosts(allCbecNotes);
  const pageNumber = parseInt(page as string);
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber,
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return {
    props: {
      initialDisplayPosts: allCoreContent(initialDisplayPosts),
      pagination,
    },
  };
};

export default function PostPage({
  initialDisplayPosts,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <BaseLayout>
      <CbecListContainer
        title="我的跨境笔记"
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
      />
    </BaseLayout>
  );
}
