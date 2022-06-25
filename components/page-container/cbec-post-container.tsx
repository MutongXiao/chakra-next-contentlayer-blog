import {
  Box,
  Container,
  Text,
  Heading,
  VStack,
  HStack,
  Tag,
  Link,
  Button,
  Flex,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { CoreContent } from 'utils/contentlayer';
import type { CbecNote } from 'contentlayer/generated';
import SEO from '../seo';
import PageTransition from './page-transition';

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

interface Props {
  content: CoreContent<CbecNote>;
  next?: { slug: string; title: string };
  prev?: { slug: string; title: string };
  children: ReactNode;
}

export default function CbecPostContainer({
  content,
  next,
  prev,
  children,
}: Props) {
  const { date, title, tags, description } = content;
  const { push } = useRouter();
  return (
    <>
      <SEO title={title} description={description} />
      <Container
        as="article"
        maxW="5xl"
        w="100vw"
        mx="auto"
        my={{ base: '7', md: '14' }}
        boxSizing="border-box"
      >
        <PageTransition>
          <Heading
            as="header"
            mb={{ base: '7', md: '14' }}
            w="full"
            textAlign="center"
            fontSize={{ base: '2xl', md: '4xl' }}
          >
            {title}
          </Heading>
          <Flex px="1rem" w="full">
            <VStack
              spacing="14"
              alignItems="start"
              position="sticky"
              top="20"
              mr="16"
              w="48"
              as="nav"
              overscrollBehavior="contain"
              h="calc(100vh - 8.125rem)"
              display={{ base: 'none', md: 'block' }}
            >
              <Box w="full">
                <Box my="4">
                  <Text>DATE</Text>
                  <Box as="time" color="teal" dateTime={date}>
                    {new Date(date).toLocaleDateString(
                      'en-US',
                      postDateTemplate,
                    )}
                  </Box>
                </Box>
                {tags && (
                  <Box w="full">
                    <Text>TAGS</Text>
                    <HStack>
                      {tags.map(tag => (
                        <Tag key={tag} variant="outline" colorScheme="teal">
                          {tag}
                        </Tag>
                      ))}
                    </HStack>
                  </Box>
                )}
              </Box>
              {(next || prev) && (
                <VStack spacing={5} w="full">
                  {prev && (
                    <Box w="full">
                      <Text>PREVIOUS ARTICLE</Text>
                      <NextLink href={`/cbec-note/${prev.slug}`} passHref>
                        <Link
                          w="full"
                          colorScheme="teal"
                          color="teal"
                          wordBreak="break-all"
                          overflowWrap="break-word"
                        >
                          {prev.title}
                        </Link>
                      </NextLink>
                    </Box>
                  )}
                  {next && (
                    <Box w="full">
                      <Text>NEXT ARTICLE</Text>
                      <NextLink href={`/cbec-note/${next.slug}`} passHref>
                        <Link
                          w="full"
                          colorScheme="teal"
                          color="teal"
                          wordBreak="break-all"
                          overflowWrap="break-word"
                        >
                          {next.title}
                        </Link>
                      </NextLink>
                    </Box>
                  )}
                </VStack>
              )}
              <Button
                p="0"
                m="0"
                w="full"
                textAlign="left"
                color="teal"
                variant="unstyled"
                onClick={() => push('/cbec-note')}
              >
                &larr; Back to the list page
              </Button>
            </VStack>
            <Box flex="1">{children}</Box>
          </Flex>
        </PageTransition>
      </Container>
    </>
  );
}
