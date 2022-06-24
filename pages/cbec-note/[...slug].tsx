import { useMDXComponent } from 'next-contentlayer/hooks';
import CbecPostContainer from '@/components/page-container/cbec-post-container';
import { MDXComponents } from '@/components/mdx-components';

import { coreContent } from 'utils/contentlayer';
import { allCbecNotes } from 'contentlayer/generated';
import { GetStaticPaths, InferGetStaticPropsType } from 'next/types';
import { sortedAllPosts } from './index';

export default function CbecPostDetail({
  post,
  prevPost,
  nextPost,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Component = useMDXComponent(post.body.code);
  const mainContent = coreContent(post);
  return (
    <CbecPostContainer content={mainContent} prev={prevPost} next={nextPost}>
      <Component components={MDXComponents} />
    </CbecPostContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allCbecNotes.map(p => ({ params: { slug: p.slug.split('/') } })),
    fallback: false,
  };
};

export const getStaticProps = async ctx => {
  const params = Array.isArray(ctx.params.slug)
    ? ctx.params.slug
    : [ctx.params.slug];
  const sortedPosts = sortedAllPosts(allCbecNotes);
  let postIndex: number | null;
  const post = sortedPosts.find((p, i) => {
    if (p.slug === params.join('/')) {
      postIndex = i;
      return true;
    }
  });
  const prevPost =
    postIndex !== null && sortedPosts[postIndex - 1]
      ? coreContent(sortedPosts[postIndex - 1])
      : null;
  const nextPost =
    postIndex !== null && sortedPosts[postIndex + 1]
      ? coreContent(sortedPosts[postIndex + 1])
      : null;

  return { props: { post, prevPost, nextPost } };
};
