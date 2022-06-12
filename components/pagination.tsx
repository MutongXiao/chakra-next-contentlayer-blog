import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Link, SimpleGrid, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';

export const PaginationLink = props => {
  const { label, href, children, ...rest } = props;

  return (
    <NextLink href={href} passHref>
      <Link
        _hover={{
          textDecor: 'none',
        }}
        flex="1"
        borderRadius="md"
        {...rest}
        _focus={{
          outline: 'none',
        }}
      >
        <Text fontSize="sm" px="2">
          {label}
        </Text>
        <Text mt="1" fontSize="lg" fontWeight="bold" color="teal.400">
          {children}
        </Text>
      </Link>
    </NextLink>
  );
};

export const Pagination = ({ previous, next, ...rest }) => {
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
        <PaginationLink
          textAlign="left"
          label="Previous"
          href={`/blog/detail/${previous.slug}`}
          rel="prev"
        >
          <ChevronLeftIcon mr="1" fontSize="1.2em" />
          {previous.title}
        </PaginationLink>
      ) : (
        <div />
      )}
      {next ? (
        <PaginationLink
          textAlign="right"
          label="Next"
          href={`/blog/detail/${next.slug}`}
          rel="next"
        >
          {next.title}
          <ChevronRightIcon ml="1" fontSize="1.2em" />
        </PaginationLink>
      ) : (
        <div />
      )}
    </SimpleGrid>
  );
};

export default Pagination;
