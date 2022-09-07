import { mainNavLinks } from '@/components/sidebar/blog-sidebar';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  EditIcon,
  HamburgerIcon,
  RepeatIcon,
} from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  chakra,
  Collapse,
  Flex,
  HTMLChakraProps,
  Icon,
  IconButton,
  Link,
  LinkBox,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useViewportScroll } from 'framer-motion';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { memo, useEffect, useRef, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BsFillMoonStarsFill, BsSunFill } from 'react-icons/bs';
import useSound from 'use-sound';

interface INavItem {
  label: string;
  subLabel?: string;
  children?: Array<INavItem>;
  href?: string;
  navTaggle?: () => void;
  activeUnderLine?: {
    w: string;
    h: string;
    d: string;
    dash: number;
  };
}

// const dropAnimation = keyframes`
// strokeDashoffset: 0;
// `;
// const PathCss = css`
//   strokedasharray: 60;
//   strokedashoffset: 60;
//   animation: 500ms cubic-bezier(0.27, 0.22, 0.44, 1.03) 250ms 1 normal both
//     running ${dropAnimation};
// `;
// const ChakraSvg = chakra('svg', {
//   baseStyle: {
//     pos: 'absolute',
//     display: 'block',
//     left: '0px',
//     right: '0px',
//     bottom: '0px',
//     margin: 'auto',
//   },
// });

const DeskTopNavItems: INavItem[] = [
  {
    label: '文章',
    href: '/blog/overview/all',
    activeUnderLine: {
      w: '38',
      h: '7',
      d: 'M1 5.39971C7.48565 -1.08593 6.44837 -0.12827 8.33643 6.47992C8.34809 6.52075 11.6019 2.72875 12.3422 2.33912C13.8991 1.5197 16.6594 2.96924 18.3734 2.96924C21.665 2.96924 23.1972 1.69759 26.745 2.78921C29.7551 3.71539 32.6954 3.7794 35.8368 3.7794',
      dash: 45,
    },
  },
  {
    label: '小作品',
    href: '#',
    activeUnderLine: {
      w: '58',
      h: '5',
      d: 'M1 3.18471C4.34436 3.18471 7.48008 1 10.8705 1C13.2525 1 15.1058 1.72336 17.3165 2.34614C20.3083 3.18891 22.9386 4.09106 26.1351 3.62607C28.8438 3.23203 31.8901 3.01248 34.5396 3.59297C35.6272 3.83127 36.5433 3.92663 37.55 3.29505C38.1957 2.88991 39.4841 3.07684 39.6651 3.87985C39.809 4.51858 43.0217 2.41818 43.6827 2.09236C44.6745 1.60342 45.105 1.98753 46.0216 2.48958C47.7503 3.43649 49.2982 3.62537 51.259 3.19575C51.6076 3.11937 52.011 3.20318 52.3669 3.18471C52.8876 3.1577 53.3662 2.78749 53.8777 2.78749C54.9479 2.78749 55.8858 2.39027 57 2.39027',
      dash: 60,
    },
  },
  {
    label: '跨境笔记',
    href: '/cbec-note',
    activeUnderLine: {
      w: '83',
      h: '7',
      d: 'M1.36658 3.43961C5.25984 2.21819 9.10198 2.35113 13.042 1.74498C16.5973 1.19801 20.2829 1.33594 23.9226 1.33594C27.3725 1.33594 30.9056 1.5463 34.2891 1.5463C35.5441 1.5463 37.2693 2.05276 38.3912 2.55139C39.6341 3.10379 41.4642 3.25919 42.8089 3.4513C44.602 3.70745 46.3029 3.86034 48.1616 3.86034C49.0606 3.86034 49.9761 3.43961 50.9081 3.43961C51.4475 3.43961 52.841 3.17686 53.3273 2.97213C55.1318 2.21235 56.3597 3.3818 57.5346 4.49145C58.2657 5.18187 59.2379 3.46932 60.0123 3.18249C60.9779 2.82484 61.679 2.53519 62.4783 3.33443C62.7994 3.65557 63.8588 5.51258 64.3716 5.22773C65.485 4.60917 66.7235 4.15447 67.7258 3.33443C69.0587 2.24383 71.3278 2.48068 73 2.38777C74.4626 2.30652 75.525 2.05998 77 2.38777C77.7415 2.55256 78.7556 2.38777 79.518 2.38777C80.2804 2.38777 81.1728 1.74498 82 1.74498',
      dash: 84,
    },
  },
  {
    label: '站点导航',
    href: '/site-map',
    activeUnderLine: {
      w: '83',
      h: '7',
      d: 'M1.36658 3.43961C5.25984 2.21819 9.10198 2.35113 13.042 1.74498C16.5973 1.19801 20.2829 1.33594 23.9226 1.33594C27.3725 1.33594 30.9056 1.5463 34.2891 1.5463C35.5441 1.5463 37.2693 2.05276 38.3912 2.55139C39.6341 3.10379 41.4642 3.25919 42.8089 3.4513C44.602 3.70745 46.3029 3.86034 48.1616 3.86034C49.0606 3.86034 49.9761 3.43961 50.9081 3.43961C51.4475 3.43961 52.841 3.17686 53.3273 2.97213C55.1318 2.21235 56.3597 3.3818 57.5346 4.49145C58.2657 5.18187 59.2379 3.46932 60.0123 3.18249C60.9779 2.82484 61.679 2.53519 62.4783 3.33443C62.7994 3.65557 63.8588 5.51258 64.3716 5.22773C65.485 4.60917 66.7235 4.15447 67.7258 3.33443C69.0587 2.24383 71.3278 2.48068 73 2.38777C74.4626 2.30652 75.525 2.05998 77 2.38777C77.7415 2.55256 78.7556 2.38777 79.518 2.38777C80.2804 2.38777 81.1728 1.74498 82 1.74498',
      dash: 84,
    },
  },
  {
    label: '留言板',
    href: '/message-board',
    activeUnderLine: {
      w: '58',
      h: '5',
      d: 'M1 3.18471C4.34436 3.18471 7.48008 1 10.8705 1C13.2525 1 15.1058 1.72336 17.3165 2.34614C20.3083 3.18891 22.9386 4.09106 26.1351 3.62607C28.8438 3.23203 31.8901 3.01248 34.5396 3.59297C35.6272 3.83127 36.5433 3.92663 37.55 3.29505C38.1957 2.88991 39.4841 3.07684 39.6651 3.87985C39.809 4.51858 43.0217 2.41818 43.6827 2.09236C44.6745 1.60342 45.105 1.98753 46.0216 2.48958C47.7503 3.43649 49.2982 3.62537 51.259 3.19575C51.6076 3.11937 52.011 3.20318 52.3669 3.18471C52.8876 3.1577 53.3662 2.78749 53.8777 2.78749C54.9479 2.78749 55.8858 2.39027 57 2.39027',
      dash: 60,
    },
  },
  {
    label: 'Goodies',
    href: '#',
    activeUnderLine: {
      w: '83',
      h: '7',
      d: 'M1.36658 3.43961C5.25984 2.21819 9.10198 2.35113 13.042 1.74498C16.5973 1.19801 20.2829 1.33594 23.9226 1.33594C27.3725 1.33594 30.9056 1.5463 34.2891 1.5463C35.5441 1.5463 37.2693 2.05276 38.3912 2.55139C39.6341 3.10379 41.4642 3.25919 42.8089 3.4513C44.602 3.70745 46.3029 3.86034 48.1616 3.86034C49.0606 3.86034 49.9761 3.43961 50.9081 3.43961C51.4475 3.43961 52.841 3.17686 53.3273 2.97213C55.1318 2.21235 56.3597 3.3818 57.5346 4.49145C58.2657 5.18187 59.2379 3.46932 60.0123 3.18249C60.9779 2.82484 61.679 2.53519 62.4783 3.33443C62.7994 3.65557 63.8588 5.51258 64.3716 5.22773C65.485 4.60917 66.7235 4.15447 67.7258 3.33443C69.0587 2.24383 71.3278 2.48068 73 2.38777C74.4626 2.30652 75.525 2.05998 77 2.38777C77.7415 2.55256 78.7556 2.38777 79.518 2.38777C80.2804 2.38777 81.1728 1.74498 82 1.74498',
      dash: 84,
    },
  },
  {
    label: '关于',
    href: '/about',
    activeUnderLine: {
      w: '58',
      h: '5',
      d: 'M1 3.18471C4.34436 3.18471 7.48008 1 10.8705 1C13.2525 1 15.1058 1.72336 17.3165 2.34614C20.3083 3.18891 22.9386 4.09106 26.1351 3.62607C28.8438 3.23203 31.8901 3.01248 34.5396 3.59297C35.6272 3.83127 36.5433 3.92663 37.55 3.29505C38.1957 2.88991 39.4841 3.07684 39.6651 3.87985C39.809 4.51858 43.0217 2.41818 43.6827 2.09236C44.6745 1.60342 45.105 1.98753 46.0216 2.48958C47.7503 3.43649 49.2982 3.62537 51.259 3.19575C51.6076 3.11937 52.011 3.20318 52.3669 3.18471C52.8876 3.1577 53.3662 2.78749 53.8777 2.78749C54.9479 2.78749 55.8858 2.39027 57 2.39027',
      dash: 60,
    },
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
    label: 'Goodies',
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

const ActiveUnderLine = memo(
  ({ underLine }: { underLine: INavItem['activeUnderLine'] }) => {
    const dropAnimation = keyframes`
    100% {
      stroke-dashoffset: 0;
    }
  `;

    const MySvg = styled.svg({
      position: 'absolute',
      display: 'block',
      left: '0px',
      right: '0px',
      bottom: '-8px',
      margin: 'auto',
    });

    const MyPath = styled.path({
      stroke: '#38B2AC',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeDasharray: underLine.dash,
      strokeDashoffset: underLine.dash,
      animation: `500ms cubic-bezier(0.27, 0.22, 0.44, 1.03) 250ms 1 normal both
      running ${dropAnimation}`,
    });
    return (
      <MySvg
        width={underLine.w}
        height={underLine.h}
        viewBox={`0 0 ${underLine.w} ${underLine.h}`}
        fill="none"
      >
        <MyPath d={underLine.d}></MyPath>
      </MySvg>
    );
  },
);

// const dropAnimation = keyframes`
//   100% {
//     stroke-dashoffset: 0;
//   }
// `;

// const MySvg = styled.svg({
//   position: 'absolute',
//   display: 'block',
//   left: '0px',
//   right: '0px',
//   bottom: '-8px',
//   margin: 'auto',
// });

// const MyPath = styled.path({
//   stroke: '#38B2AC',
//   strokeWidth: 2,
//   strokeLinecap: 'round',
//   strokeLinejoin: 'round',
//   strokeDasharray: 60,
//   strokeDashoffset: 60,
//   animation: `500ms cubic-bezier(0.27, 0.22, 0.44, 1.03) 250ms 1 normal both
//     running ${dropAnimation}`,
// });

const DesktopNav = memo(() => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  const { asPath } = useRouter();

  return (
    <Stack direction={'row'} spacing={4}>
      {DeskTopNavItems.map(navItem => (
        <Box key={navItem.label} pos="relative">
          <Popover trigger={'hover'} placement={'bottom-start'} isLazy>
            <PopoverTrigger>
              <Link
                href={navItem.href ?? '#'}
                p={2}
                fontSize="larger"
                fontWeight={600}
                color={asPath.includes(navItem.href) ? 'teal.400' : linkColor}
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
          {asPath.includes(navItem.href) && (
            // <MySvg
            //   width={navItem.activeUnderLine.w}
            //   height={navItem.activeUnderLine.h}
            //   viewBox={`0 0 ${navItem.activeUnderLine.w} ${navItem.activeUnderLine.h}`}
            //   fill="none"
            // >
            //   <MyPath d={navItem.activeUnderLine.d}></MyPath>
            // </MySvg>
            <ActiveUnderLine underLine={navItem.activeUnderLine} />
          )}
        </Box>
      ))}
    </Stack>
  );
});

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

  const [playOn] = useSound('/sounds/switch-on.mp3', { volume: 0.5 });
  const [playOff] = useSound('/sounds/switch-off.mp3', { volume: 0.5 });

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
              <Button
                onClick={() => {
                  colorMode === 'light' ? playOff() : playOn();
                  toggleColorMode();
                }}
              >
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
