import CbecListContainer from '@/components/page-container/cbec-list-container';
import BaseLayout from 'layout/base-layout';
import { allCbecNotes, CbecNote } from 'contentlayer/generated';
import { GetStaticProps, InferGetStaticPropsType } from 'next/types';
import { allCoreContent } from 'utils/contentlayer';

export function dateSortDesc(a: string, b: string) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

export function sortedAllPosts(allPosts: CbecNote[]) {
  return allPosts.sort((a, b) => dateSortDesc(a.date, b.date));
}

export const POSTS_PER_PAGE = 10;

export default function NotesListPage({
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

export const getStaticProps: GetStaticProps = async () => {
  const posts = sortedAllPosts(allCbecNotes);
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return {
    props: {
      initialDisplayPosts: allCoreContent(initialDisplayPosts),
      pagination,
    },
  };
};
