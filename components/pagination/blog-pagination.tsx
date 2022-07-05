import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  HStack,
  SimpleGrid,
  type SimpleGridProps,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
interface Props extends SimpleGridProps {
  previous: {
    title: string;
    path: string;
  };
  next: {
    title: string;
    path: string;
  };
}

export default function BlogPagination({ previous, next, ...rest }: Props) {
  return (
    <SimpleGrid
      as="nav"
      aria-label="Pagination"
      spacing="40px"
      my="64px"
      columns={2}
      {...rest}
    >
      {previous ? (
        <NextLink href={previous.path} passHref>
          <Box as="a" rel="previous" flex="1" textAlign="start">
            <HStack spacing="1">
              <ChevronLeftIcon fontSize="1.2em" />
              <span>上一篇</span>
            </HStack>
            <Box
              color="teal.400"
              fontWeight="semibold"
              fontSize="md"
              mt="1"
              css={{
                wordBreak: 'break-all',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {previous.title}
            </Box>
          </Box>
        </NextLink>
      ) : (
        <Box className="pagination__empty" flex="1" />
      )}
      {next ? (
        <NextLink href={next.path} passHref>
          <Box as="a" rel="next" flex="1" textAlign="end">
            <HStack spacing="1" justify="flex-end">
              <span>下一篇</span>
              <ChevronRightIcon fontSize="1.2em" />
            </HStack>
            <Box
              color="teal.400"
              fontWeight="semibold"
              fontSize="md"
              mt="1"
              css={{
                wordBreak: 'break-all',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {next.title}
            </Box>
          </Box>
        </NextLink>
      ) : (
        <Box className="pagination__empty" flex="1" />
      )}
    </SimpleGrid>
  );
}
