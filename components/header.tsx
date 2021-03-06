import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Collapse,
  Icon,
  Text,
  PopoverContent,
  Popover,
  PopoverTrigger,
  IconButton,
  LinkBox,
  LinkOverlay,
  chakra,
  HTMLChakraProps,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { BsFillMoonStarsFill, BsSunFill } from 'react-icons/bs';
import { AiOutlineHome } from 'react-icons/ai';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EditIcon,
  RepeatIcon,
} from '@chakra-ui/icons';
import { useEffect, useRef, useState } from 'react';
import { useViewportScroll } from 'framer-motion';

import { mainNavLinks } from '@/components/sidebar/blog-sidebar';

interface INavItem {
  label: string;
  subLabel?: string;
  children?: Array<INavItem>;
  href?: string;
  navTaggle?: () => void;
}

const DeskTopNavItems: INavItem[] = [
  {
    label: '文章',
    href: '/blog/overview/all',
  },
  {
    label: '小作品',
    href: '#',
  },
  {
    label: '跨境笔记',
    href: '/cbec-note',
  },
  {
    label: '站点导航',
    href: '/site-map',
  },
  {
    label: '留言板',
    href: '/message-board',
  },
  {
    label: '友链',
    href: '#',
  },
  {
    label: '关于',
    href: '/about',
  },
];

const MobilNavItems: INavItem[] = [
  {
    label: '文章',
    children: mainNavLinks,
  },
  {
    label: '小作品',
    href: '#',
  },
  {
    label: '跨境笔记',
    href: '/cbec-note',
  },
  {
    label: '站点导航',
    href: '/site-map',
  },
  {
    label: '留言板',
    href: '/message-board',
  },
  {
    label: '友链',
    href: '#',
  },
  {
    label: '关于',
    href: '/about',
  },
];

const MobileNavItem = ({ label, children, href, navTaggle }: INavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <NextLink href={href ?? '#'} passHref>
        <Flex
          py={2}
          as={Link}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}
          onClick={() => {
            !children && navTaggle && navTaggle();
          }}
        >
          <Text fontWeight={600} fontSize="md">
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>
      </NextLink>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map(child => (
              <NextLink href={child.href || '#'} key={child.label} passHref>
                <Link
                  py={2}
                  fontWeight={500}
                  fontSize="md"
                  w="full"
                  onClick={() => {
                    navTaggle && navTaggle();
                  }}
                >
                  {child.label}
                </Link>
              </NextLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const MobileNav = ({ navTaggle }: { navTaggle: () => void }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
      borderBottomWidth={2}
      borderBottomColor={useColorModeValue('gray.200', 'gray.900')}
      borderBottomRadius="md"
      shadow="sm"
      transition="box-shadow 0.2s"
    >
      {MobilNavItems.map(navItem => {
        return (
          <MobileNavItem
            key={navItem.label}
            {...navItem}
            navTaggle={navTaggle}
          />
        );
      })}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: INavItem) => {
  return (
    <LinkBox
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('teal.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <NextLink href={href || '#'} passHref>
            <LinkOverlay
              transition={'all .3s ease'}
              _groupHover={{ color: 'teal.400' }}
              fontWeight={500}
            >
              {label}
            </LinkOverlay>
          </NextLink>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'teal.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </LinkBox>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {DeskTopNavItems.map(navItem => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'} isLazy>
            <PopoverTrigger>
              <Link
                href={navItem.href ?? '#'}
                p={2}
                fontSize="larger"
                fontWeight={600}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: 'teal.400',
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map(child => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

export default function Header(props: HTMLChakraProps<'header'>) {
  const { maxW = '8xl', maxWidth = '8xl' } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();

  const [y, setY] = useState(0);
  const ref = useRef<HTMLHeadingElement>();
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {};
  const { scrollY } = useViewportScroll();
  useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  return (
    <chakra.header
      ref={ref}
      bg="white"
      _dark={{ bg: 'gray.800' }}
      width="full"
      pos="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="9"
      shadow={y > height ? 'sm' : undefined}
      transition="box-shadow 0.2s, background-color 0.2s"
      {...props}
    >
      <chakra.div height="4.5rem" mx="auto" maxW={maxW} maxWidth={maxWidth}>
        <Flex w="100%" h="100%" px="6" align="center" justify="space-between">
          {/* 移动端 汉堡菜单图片 */}
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          {/* 左侧首页图标 文字 */}
          <Flex align={'center'} display={{ base: 'none', md: 'flex' }}>
            <NextLink href="/" passHref>
              <Link
                colorScheme="teal"
                _focus={{
                  outline: 'none',
                }}
                _hover={{
                  textDecoration: 'none',
                  color: 'teal',
                }}
              >
                <Icon as={AiOutlineHome} w={7} h={7} />
              </Link>
            </NextLink>
          </Flex>
          {/* 中间菜单选项 */}
          <Flex display={{ base: 'none', md: 'flex' }}>
            <DesktopNav />
          </Flex>
          {/* 右侧用户选项 */}
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? (
                  <BsFillMoonStarsFill />
                ) : (
                  <BsSunFill />
                )}
              </Button>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                  _focus={{
                    outline: 'none',
                  }}
                >
                  <Avatar
                    name="molin"
                    size={'sm'}
                    src={
                      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    icon={<RepeatIcon />}
                    onClick={() => {
                      //location.href = 'https://abcjs123.vip/service/discuss';
                      window.open(
                        'https://abcjs123.vip/service/discuss',
                        '_blank',
                      );
                    }}
                  >
                    评论管理
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem
                    icon={<EditIcon />}
                    onClick={() => {
                      window.open('https://wiki.abcjs123.vip', '_blank');
                      //location.href = 'https://wiki.abcjs123.vip';
                    }}
                  >
                    My WiKi
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
        {/* 移动端菜单 */}
        <Collapse in={isOpen} animateOpacity>
          <Box
            bg="blackAlpha.600"
            _dark={{
              bg: 'whiteAlpha.10',
            }}
            w="full"
            minH="100vh"
          >
            <MobileNav navTaggle={onToggle} />
          </Box>
        </Collapse>
      </chakra.div>
    </chakra.header>
  );
}
