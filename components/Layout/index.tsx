import { ReactNode } from 'react';
import { Container, Flex } from '@chakra-ui/react';

import Header from '../header';
import Footer from '../footer';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Flex flexDir="column" minH="100vh">
      <Header />
      <Container
        as="main"
        w="100%"
        maxW="8xl"
        mx="auto"
        px="1rem"
        flex="1 0 auto"
      >
        {children}
      </Container>
      <Footer />
    </Flex>
  );
}
