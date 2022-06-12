import {
  Box,
  Flex,
  chakra,
  VStack,
  HStack,
  Text,
  Tag,
  Heading,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import * as React from 'react';
import PageTransition from './page-transition';
import Footer from 'components/footer';
import Header from 'components/header';
import SEO from 'components/seo';
import TableOfContent from 'components/table-of-content';
import BlogTags from '@/components/post-tags';
import { convertBackticksToInlineCode } from 'utils/convert-backticks-to-inline-code';

function useHeadingFocusOnRouteChange() {
  const router = useRouter();

  React.useEffect(() => {
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

export interface Heading {
  level: 'h2' | 'h3';
  text: string;
  id: string;
}

export interface BlogContainerProps {
  frontmatter: {
    title: string;
    slug?: string;
    description?: string;
    authors?: string[];
    categories?: string[];
    tags?: string[];
    date?: string;
    headings?: Heading[];
  };
  children?: React.ReactNode;
  sidebar?: React.ReactElement;
  pagination?: React.ReactElement;
}

function BlogPageContainer(props: BlogContainerProps) {
  const { frontmatter, children, sidebar, pagination } = props;
  useHeadingFocusOnRouteChange();

  if (!frontmatter) return <></>;
  const isPostDetail = frontmatter.tags && frontmatter.slug;
  const {
    title,
    date,
    tags = [],
    categories = [],
    description = '',
    headings = [],
  } = frontmatter;

  return (
    <>
      <SEO title={title} description={description} />
      <Header />
      <Box as="main" className="main-content" w="full" maxW="8xl" mx="auto">
        <Box display={{ md: 'flex' }}>
          {sidebar || null}
          <Box flex="1" minW="0" mb={{ base: '8', md: '12' }}>
            <Box id="content" mx="auto" minH="76vh">
              <Flex>
                <Box
                  minW="0"
                  flex="auto"
                  px={{ base: '4', sm: '6', xl: '8' }}
                  pt={{ base: '2', sm: '4', md: '8', xl: '10' }}
                >
                  <PageTransition style={{ maxWidth: '48rem' }}>
                    <Box
                      minH="20"
                      w="full"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      px={{ base: '0', md: '6' }}
                    >
                      <chakra.h1
                        tabIndex={-1}
                        outline={0}
                        apply="mdx.h1"
                        fontSize={{ base: 'xl', md: '2xl' }}
                        textAlign={isPostDetail ? 'left' : 'center'}
                      >
                        {convertBackticksToInlineCode(title)}
                      </chakra.h1>
                      {isPostDetail && (
                        <VStack
                          spacing={4}
                          align="stretch"
                          mt={{ base: '0', md: '2' }}
                        >
                          <HStack display={{ base: 'none', md: 'flex' }}>
                            <Text>分类：</Text>
                            <HStack spacing={8}>
                              <BlogTags tags={categories} />
                              <HStack spacing={4}>
                                <Text>日期:</Text> <Tag>{date}</Tag>
                              </HStack>
                            </HStack>
                          </HStack>
                          <HStack>
                            <Text>标签：</Text>
                            <BlogTags tags={tags} />
                          </HStack>
                        </VStack>
                      )}
                    </Box>
                    <Box
                      boxShadow={{ base: '0', md: '2xl' }}
                      rounded={{ base: '0', md: 'lg' }}
                      p={{ base: '0', md: '6' }}
                    >
                      {children}
                      <Box mt="40px">{pagination || null}</Box>
                    </Box>
                  </PageTransition>
                </Box>
                <TableOfContent
                  visibility={headings.length === 0 ? 'hidden' : 'initial'}
                  headings={headings}
                />
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default BlogPageContainer;
