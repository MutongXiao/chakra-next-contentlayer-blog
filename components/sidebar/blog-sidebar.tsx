import {
  Box,
  Center,
  Flex,
  List,
  Text,
  ListItem,
  ListProps,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { ReactElement, ReactNode } from 'react';
import { FaReact, FaVuejs, FaCss3Alt, FaNodeJs } from 'react-icons/fa';
import { DiJavascript } from 'react-icons/di';
import { SiWebpack } from 'react-icons/si';
import { FiPenTool } from 'react-icons/fi';
import { CalendarIcon } from '@chakra-ui/icons';
import { getPostsCategoriesGroup } from 'utils/contentlayer';

type MainNavLinkProps = {
  href: string;
  icon: ReactElement;
  children: ReactNode;
  label?: string;
};

export const isMainNavLinkActive = (href: string, path: string) => {
  return path.includes(href);
};

const MainNavLink = ({ href, icon, children }: MainNavLinkProps) => {
  const { asPath } = useRouter();
  const active = isMainNavLinkActive(href, asPath);
  const linkColor = useColorModeValue('gray.900', 'whiteAlpha.900');

  return (
    <NextLink href={href} passHref>
      <Flex
        as="a"
        align="center"
        fontSize="sm"
        fontWeight="semibold"
        transitionProperty="colors"
        transitionDuration="200ms"
        color={active ? linkColor : 'gray.500'}
        _hover={{ color: linkColor }}
      >
        <Center w="6" h="6" bg="teal.400" rounded="base" mr="3">
          {icon}
        </Center>
        {children}
      </Flex>
    </NextLink>
  );
};

export const mainNavLinks = [
  {
    icon: <CalendarIcon color="white" />,
    href: '/blog/all',
    label: '全部文章',
    postsCount:
      getPostsCategoriesGroup().find(c => '/blog/all'.includes(c.category))
        ?.total || 0,
  },
  {
    icon: <DiJavascript color="white" />,
    href: '/blog/javascript',
    label: 'JavaScript',
    postsCount:
      getPostsCategoriesGroup().find(c =>
        '/blog/javascript'.includes(c.category),
      )?.total || 0,
  },
  {
    icon: <FaCss3Alt color="white" />,
    href: '/blog/css',
    label: 'CSS',
    postsCount:
      getPostsCategoriesGroup().find(c => '/blog/css'.includes(c.category))
        ?.total || 0,
  },
  {
    icon: <FaReact color="white" />,
    href: '/blog/react',
    label: 'React',
    postsCount:
      getPostsCategoriesGroup().find(c => '/blog/react'.includes(c.category))
        ?.total || 0,
  },
  {
    icon: <FaVuejs color="white" />,
    href: '/blog/vue',
    label: 'Vue',
    postsCount:
      getPostsCategoriesGroup().find(c => '/blog/vue'.includes(c.category))
        ?.total || 0,
  },
  {
    icon: <SiWebpack color="white" />,
    href: '/blog/module',
    label: '工程&模块化',
    postsCount:
      getPostsCategoriesGroup().find(c => '/blog/module'.includes(c.category))
        ?.total || 0,
  },
  {
    icon: <FiPenTool color="white" />,
    href: '/blog/other',
    label: '其他',
    postsCount:
      getPostsCategoriesGroup().find(c => '/blog/other'.includes(c.category))
        ?.total || 0,
  },
  {
    icon: <FaNodeJs color="white" />,
    href: '/blog/node',
    label: 'node后端',
    postsCount:
      getPostsCategoriesGroup().find(c => '/blog/node'.includes(c.category))
        ?.total || 0,
  },
];

export const MainNavLinkGroup = (props: ListProps) => {
  return (
    <List spacing="4" styleType="none" {...props}>
      {mainNavLinks.map(item => (
        <ListItem key={item.label}>
          <MainNavLink icon={item.icon} href={item.href} label={item.label}>
            <Flex flex="1" justify="space-between">
              <Text>{item.label}</Text>
              <Text>{item.postsCount}</Text>
            </Flex>
          </MainNavLink>
        </ListItem>
      ))}
    </List>
  );
};

const Sidebar = () => {
  return (
    <Box
      aria-label="Main Navigation"
      as="nav"
      pos="sticky"
      overscrollBehavior="contain"
      top="6.5rem"
      w="280px"
      h="calc(100vh - 8.125rem)"
      pr="8"
      pb="6"
      pl="6"
      pt="4"
      overflowY="auto"
      className="sidebar-content"
      flexShrink={0}
      display={{ base: 'none', md: 'block' }}
    >
      <MainNavLinkGroup mb="10" />
    </Box>
  );
};

export default Sidebar;
