import { ReactNode } from 'react';
import Sidebar from '@/components/sidebar/blog-sidebar';
import BlogPageContainer, {
  BlogContainerProps,
} from '@/components/page-container/blog-container';

type BlogLayoutProps = Pick<BlogContainerProps, 'frontmatter'> & {
  children?: ReactNode;
  pagination?: React.ReactElement;
};

export default function BlogLayout(props: BlogLayoutProps) {
  const { frontmatter, children, pagination } = props;
  return (
    <BlogPageContainer
      frontmatter={frontmatter}
      sidebar={<Sidebar />}
      pagination={pagination}
    >
      {children}
    </BlogPageContainer>
  );
}
