import {
  Box,
  Text,
  Container,
  VStack,
  Heading,
  Link,
  useDisclosure,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { HamburgerIcon, ChevronUpIcon, Icon } from '@chakra-ui/icons';
import { AiOutlineMail, AiFillGithub } from 'react-icons/ai';
import { FaBlog } from 'react-icons/fa';

import css from './about-home.module.css';
import wb_me_avatar from 'public/img/wb_me_avatar.png';
import { $, randomNum } from 'utils/tools';
import AccessCodeForm from '@/components/about/access-code-form';

// import {fullScreenAnimation} from 'utils/tools'

const motto = [
  'Bad Times Make A Good Man.',
  'There Is No Royal Road To Learning.',
  'Doubt Is The Key To Knowledge.',
  'Sow Nothing, Reap Nothing.',
  'Life Is Real, Life Is Earnest.',
  'Life Is But A Hard And Tortuous Journey.',
  'Sharp Tools Make Good Work.',
  'Nurture Passes Nature.',
  'All Rivers Run Into The Sea.',
  'Home Is Where The Heart Is.',
  'Never Say Die.',
  'Cease To Struggle And You Cease To Live.',
];

function AccessFormModal(props: { isOpen: boolean; onClose: () => void }) {
  const { isOpen = false, onClose } = props;
  const router = useRouter();
  const onSucceedCallback = () => {
    router.replace('/about/profile');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>访问Wcong_H的简历</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <AccessCodeForm callback={onSucceedCallback} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function AboutHome() {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>();
  const profilepicRef = useRef<HTMLDivElement>();
  // const bgcanvasRef = useRef<HTMLCanvasElement>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();
  const [needAccessCode, setNeedAccessCode] = useState(true);

  const [descData, setDescData] = useState({
    hitokoto: '如何得与凉风约，不共尘沙一并来!',
    from: '中牟道中',
  });
  const [mottoText, setMottoText] = useState(motto[3]);

  // SSR 在水合数据时会报错， 迷惑中
  // const mottoText = useMemo(() => {
  //   const index = randomNum(0, motto.length - 1);
  //   return motto[index];
  // }, []);

  const [showCloseIcon, setShowCloseIcon] = useState(false);
  const navigationWrapperRef = useRef<HTMLDivElement>();

  function mobileIconClickShow() {
    const navigationWrapperEl = navigationWrapperRef.current;

    if (
      window
        .getComputedStyle(navigationWrapperEl)
        .getPropertyValue('display') === 'block'
    ) {
      const onAnimationend = () => {
        const toggleClassStr = `${css.visible} ${css.animated} ${css.bounceOutUp}`;
        $.toggleClass(navigationWrapperEl, toggleClassStr);
        navigationWrapperEl.removeEventListener('animationend', onAnimationend);
      };
      navigationWrapperEl.addEventListener('animationend', onAnimationend);

      const toggleClassStr = `${css.animated} ${css.bounceInDown} ${css.animated} ${css.bounceOutUp}`;
      $.toggleClass(navigationWrapperEl, toggleClassStr);
    } else {
      const toggleClassStr = `${css.visible} ${css.animated} ${css.bounceInDown}`;
      $.toggleClass(navigationWrapperEl, toggleClassStr);
    }
  }

  useEffect(() => {
    setNeedAccessCode(!session);
  }, [session]);

  useEffect(() => {
    setMottoText(motto[randomNum(0, motto.length - 1)]);
    // 获取一言数据
    fetch('https://v1.hitokoto.cn')
      .then(function (res) {
        return res.json();
      })
      .then(function (e) {
        setDescData({
          hitokoto: e.hitokoto,
          from: e.from,
        });
      })
      .catch(function (err) {
        return err;
      });

    // 背景一：加载图片背景
    const getBgUrl = 'https://realwds-api.vercel.app/bing?count=8';
    let imgUrls = JSON.parse(sessionStorage.getItem('imgUrls')) as string[];
    let index = parseInt(sessionStorage.getItem('imgIndex'));
    if (imgUrls === null) {
      imgUrls = [];
      index = 0;
      fetch(getBgUrl)
        .then(res => {
          return res.json();
        })
        .then(result => {
          const images = result.data.images;
          for (let i = 0; i < images.length; i++) {
            const item = images[i];
            imgUrls.push(item.url);
          }
          const imgUrl = imgUrls[index];
          const url = 'https://www.bing.com' + imgUrl;
          panelRef.current.style.background =
            "url('" + url + "') center center no-repeat #666";
          panelRef.current.style.backgroundSize = 'cover';
          sessionStorage.setItem('imgUrls', JSON.stringify(imgUrls));
          sessionStorage.setItem('imgIndex', index.toString());
        })
        .catch(err => {
          return err;
        });
    } else {
      if (index == 7) index = 0;
      else index++;
      const imgUrl = imgUrls[index];
      const url = 'https://www.bing.com' + imgUrl;
      panelRef.current.style.background =
        "url('" + url + "') center center no-repeat #666";
      panelRef.current.style.backgroundSize = 'cover';
      sessionStorage.setItem('imgIndex', index.toString());
    }

    // 背景2：加载动画背景
    // const { startAnimation, stopAnimation } = fullScreenAnimation(
    //   bgcanvasRef.current,
    // );
    // startAnimation();

    // 页面内容的入场动画类
    const iUpElements = document.querySelectorAll(`.${css.iUp}`);
    let t = 60;
    const d = 150;
    iUpElements.forEach(el => {
      setTimeout(() => {
        el.className = el.className + ' ' + css.up;
      }, t);
      t += d;
    });

    // 页面卸载时，结束页面canvas动画
    // return () => {
    //   stopAnimation();
    // };
  }, []);

  return (
    <Container
      ref={panelRef}
      w="100vw"
      h="100vh"
      display="block"
      pos="fixed"
      zIndex={900}
      maxW="none"
      bg="center center no-repeat #666"
      userSelect="none"
      transform="translate3d(0, 0, 0)"
      transition="width 0.6s ease"
    >
      <Box className={css.btnMobileMenu}>
        <Icon
          as={showCloseIcon ? ChevronUpIcon : HamburgerIcon}
          fontSize={showCloseIcon ? '4xl' : '2xl'}
          color="white"
          mt="1px"
          onClick={e => {
            e.preventDefault();
            setShowCloseIcon(!showCloseIcon);
            mobileIconClickShow();
          }}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        as="main"
        w="full"
        h="full"
        maxW="620px"
        margin="0 auto"
      >
        <VStack pos="relative" zIndex={800}>
          <Box
            className={`avatar-box ${css.iUp}`}
            cursor="pointer"
            pos="relative"
            w="32"
            h="32"
          >
            <Box
              ref={profilepicRef}
              className={css.profilepic}
              sx={{
                '.avatar-box:hover &': {
                  transform: 'rotate3d(0, 1, 0, -180deg)',
                },
              }}
              position="relative"
              zIndex={11}
              transformOrigin="0% 50%"
              transition="all 0.5s ease-in-out"
              w="full"
              h="full"
              _before={{
                position: 'absolute',
                display: 'block',
                content: '""',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                transition: 'all 0.35s ease-in-out',
              }}
            >
              <Image src={wb_me_avatar} alt="hwcong" layout="fill" priority />
            </Box>
            <Box
              pos="absolute"
              w="full"
              h="full"
              top={0}
              bottom={0}
              left={0}
              right={0}
              borderRadius="50%"
              textAlign="center"
              sx={{
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                opacity={1}
                borderRadius="50%"
                w="full"
                h="full"
                bgColor="#333333"
              >
                <Heading
                  color="gray.300"
                  pos="relative"
                  fontSize="18px"
                  lineHeight="44px"
                  textShadow="0 0 1px white, 0 1px 2px rgba(0, 0, 0, 0.3)"
                  _hover={{
                    textShadow:
                      '0 0 1px #0ebeff, 0 0 2px #0ebeff, 0 0 4px #0ebeff',
                  }}
                  onClick={() => {
                    needAccessCode ? onOpen() : router.push('/about/profile');
                  }}
                >
                  Hwcong
                </Heading>
                <Text color="#bbb" fontStyle="italic" fontSize="10px">
                  {new Date().getFullYear()} · 幸运
                </Text>
              </Box>
            </Box>
          </Box>
          <Heading
            className={css.iUp}
            fontFamily="'Old English Text MT', 'EngraversOldEnglishBT-Bold', 'Lato',
          'PingFang SC', 'Microsoft YaHei', sans-serif"
            color="white"
            mb="5px"
            fontSize="2.5em"
            fontWeight="light"
            letterSpacing="4px"
          >
            Wcong_H
          </Heading>
          <Text
            className={css.iUp}
            fontFamily="'ff-tisa-web-pro-1', 'ff-tisa-web-pro-2', 'Lucida Grande',
          'Hiragino Sans GB', 'Hiragino Sans GB W3', 'Microsoft YaHei',
          'WenQuanYi Micro Hei', sans-serif"
            fontSize="1.2em"
            fontWeight="thin"
            letterSpacing="2px"
            color="#cccccc"
            textAlign="center"
            sx={{
              fontSmooth: 'antialiased',
            }}
          >
            {mottoText}
          </Text>
          <hr
            className={css.iUp}
            style={{
              width: '50%',
              margin: '20px auto',
              borderTop: '1px solid rgba(255, 255, 255, 0.14)',
            }}
          />
          <Text className={css.iUp} textAlign="center" color="white">
            {descData.hitokoto}
            <br /> - <Text as={'strong'}>「{descData.from}」</Text>
          </Text>
          <div
            ref={navigationWrapperRef}
            className={`${css.navigationWrapper} ${css.iUp}`}
          >
            <div>
              <nav
                className={`${css.coverNavigation} ${css.coverNavigationPrimary}`}
              >
                <ul className={css.navigation}>
                  <li className={css.navigationItem}>
                    <a
                      className={css.blogButton}
                      onClick={() => {
                        needAccessCode
                          ? onOpen()
                          : router.push('/about/profile');
                      }}
                    >
                      简历
                    </a>
                  </li>
                  <li className={css.navigationItem}>
                    <a href="/Hobby/index.html" className={css.blogButton}>
                      爱好
                    </a>
                  </li>
                  <li className={css.navigationItem}>
                    <a href="/space/index.html" className={css.blogButton}>
                      空间
                    </a>
                  </li>
                  <li className={css.navigationItem}>
                    <a href="/collect/index.html" className={css.blogButton}>
                      收藏
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className={css.iUp}>
              <nav className={`${css.coverNavigation} ${css.navigationSocial}`}>
                <ul className={css.navigation}>
                  <li className={css.navigationItem}>
                    <a
                      href="https://github.com/mutongxiao"
                      title="GitHub"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon as={AiFillGithub} fontSize="x-large" />
                      <span className={css.label}>github</span>
                    </a>
                  </li>
                  <li className={css.navigationItem}>
                    <NextLink href="/" passHref>
                      <a title="博客">
                        <Icon as={FaBlog} fontSize="x-large" />
                        <span className={css.label}>博客</span>
                      </a>
                    </NextLink>
                  </li>
                  <li className={css.navigationItem}>
                    <a
                      href="mailto:mutongxiao@hotmial.com"
                      title="Email"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Icon as={AiOutlineMail} fontSize="x-large" />
                      <span className={css.label}>email</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </VStack>
        <Box
          className={`${css.remark} ${css.iUp}`}
          display={{ base: 'none', md: 'block' }}
        >
          <p className={css.power}>
            © 2022 Powered By
            <NextLink href="/" passHref>
              <Link target="_blank" color="#4e97d8">
                {' '}
                Hwcong{' '}
              </Link>
            </NextLink>
          </p>
        </Box>
      </Box>
      <Box
        pos="absolute"
        top={0}
        right={0}
        bottom={0}
        left={0}
        bgColor="black"
        zIndex={1}
        w="full"
        h="full"
        opacity={0.55}
      />
      <AccessFormModal isOpen={isOpen} onClose={onClose} />
      {/* <canvas
        ref={bgcanvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: '100vh',
          width: '100vw',
        }}
      >
        Canvas not supported.
      </canvas> */}
    </Container>
  );
}

export default AboutHome;
