import {
  Box,
  Flex,
  Heading,
  VStack,
  Text,
  HStack,
  Tag,
  chakra,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Search from '@/components/search/omni-search';
import PageTransition from './page-transition';
import NotesPagination from '../pagination/notes-pagination';
import { CoreContent } from 'utils/contentlayer';
import { CbecNote } from 'contentlayer/generated';
import { ComponentProps } from 'react';

interface Props {
  title: string;
  initialDisplayPosts: CoreContent<CbecNote>[];
  pagination?: ComponentProps<typeof NotesPagination>;
}

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const now = new Date(date).toLocaleDateString('en-US', options);

  return now;
};

export default function CbecNotesContainer({
  title,
  initialDisplayPosts = [],
  pagination,
}: Props) {
  return (
    <Box maxW="6xl" w="100%" mx="auto" mb={{ base: '12', mb: '20' }} px="2rem">
      <PageTransition>
        <Box maxW="lg" my="10">
          <Heading mb="5" as="h1" fontSize={{ base: '2xl', md: '4xl' }}>
            {title}
          </Heading>
          <Search />
        </Box>
        <VStack spacing={{ base: '7', md: '10' }}>
          {!initialDisplayPosts.length && 'No posts found.'}
          {initialDisplayPosts.map(post => {
            const { slug, date, title, tags, description } = post;
            return (
              <Flex alignItems="start" key={slug}>
                <Text mr="28" display={{ base: 'none', md: 'block' }}>
                  <time dateTime={date}>{formatDate(date)}</time>
                </Text>
                <LinkBox as="article" flex="1">
                  <Heading
                    as="h2"
                    fontSize={{ base: 'xl', md: '2xl' }}
                    style={{
                      wordBreak: 'break-all',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    <NextLink href={`/cbec-note/${slug}`} passHref>
                      <LinkOverlay>{title}</LinkOverlay>
                    </NextLink>
                  </Heading>
                  <HStack>
                    {tags.map(tag => (
                      <Tag
                        key={tag}
                        size={{ base: 'sm', md: 'md' }}
                        variant="subtle"
                        colorScheme="cyan"
                      >
                        {tag}
                      </Tag>
                    ))}
                  </HStack>
                  <chakra.p
                    my="5"
                    style={{
                      wordBreak: 'break-all',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {description}
                  </chakra.p>
                </LinkBox>
              </Flex>
            );
          })}
        </VStack>
        <NotesPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      </PageTransition>
    </Box>
  );
}
