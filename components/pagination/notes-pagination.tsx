import NextLink from 'next/link';
import { Box, Button, Flex, Link, Text } from '@chakra-ui/react';

interface Props {
  totalPages: number;
  currentPage: number;
}

export default function NotesPagination({ totalPages, currentPage }: Props) {
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  return (
    <Box py="5" mb="10">
      <Flex justifyContent="space-between">
        {!prevPage && (
          <Button colorScheme="teal" variant="link" disabled={!prevPage}>
            Previous
          </Button>
        )}
        {prevPage && (
          <NextLink
            href={
              currentPage - 1 === 1
                ? `/cbec-note/`
                : `/cbec-note/page/${currentPage - 1}`
            }
            passHref
          >
            <Button
              as={Link}
              colorScheme="teal"
              variant="link"
              _hover={{
                textDecoration: 'none',
              }}
            >
              Previous
            </Button>
          </NextLink>
        )}
        <Text fontWeight="semibold">
          {currentPage} of {totalPages}
        </Text>
        {!nextPage && (
          <Button colorScheme="teal" variant="link" disabled={!nextPage}>
            Next
          </Button>
        )}
        {nextPage && (
          <NextLink href={`/cbec-note/page/${currentPage + 1}`} passHref>
            <Button
              as={Link}
              colorScheme="teal"
              variant="link"
              _hover={{
                textDecoration: 'none',
              }}
            >
              Next
            </Button>
          </NextLink>
        )}
      </Flex>
    </Box>
  );
}
