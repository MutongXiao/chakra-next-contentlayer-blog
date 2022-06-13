import React, { useEffect } from 'react';
import type { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { useRouter } from 'next/router';

import BlogContainer from '@/components/page-container/blog-container';
import Pagination from '@/components/pagination';
import { MDXComponents } from '@/components/mdx-components';
import { allBlogs } from 'contentlayer/generated';
import { sortedBlogPost, coreContent } from 'utils/contentlayer';

// 目录锚点路由点击，跳转至锚点
function useHeadingFocusOnRouteChange() {
  const router = useRouter();

  useEffect(() => {
    const onRouteChange = () => {
      const [heading] = Array.from(document.getElementsByTagName('h1'));
      heading?.focus();
    };
    router.events.on('routeChangeComplete', onRouteChange);
    return () => {
      router.events.off('routeChangeComplete', onRouteChange);
    };
  }, [router.events]);
}

export default function PostDetail({
  post,
  prevPost,
  nextPost,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Component = useMDXComponent(post.body.code);
  const mainContent = coreContent(post);

  useHeadingFocusOnRouteChange();
  return (
    <BlogContainer
      frontmatter={post.frontMatter}
      pagination={
        <Pagination
          next={nextPost?.frontMatter}
          previous={prevPost?.frontMatter}
        />
      }
    >
      <Component content={mainContent} components={MDXComponents} />
    </BlogContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allBlogs.map(p => ({ params: { slug: p.slug.split('/') } })),
    fallback: false,
  };
};

export const getStaticProps = async ctx => {
  const params = Array.isArray(ctx.params.slug)
    ? ctx.params.slug
    : [ctx.params.slug];
  const sortedPosts = sortedBlogPost(allBlogs);
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
