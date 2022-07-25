import { Box, Text, Container, VStack, Heading, Link } from '@chakra-ui/react';
import Image from 'next/image';
import { createRef, useEffect, useRef, useState } from 'react';
import { HamburgerIcon, ChevronUpIcon, Icon } from '@chakra-ui/icons';
import { AiOutlineMail, AiFillGithub } from 'react-icons/ai';
import { FaBlog } from 'react-icons/fa';

import css from './about-home.module.css';
import wb_me_avatar from 'public/img/wb_me_avatar.png';

function stripAndCollapse(value: string) {
  const rnothtmlwhite = /[^\x20\t\r\n\f]+/g;
  const tokens = value.match(rnothtmlwhite) || [];
  return tokens.join(' ');
}

function hasClass(el: HTMLElement, cls: string) {
  const className = ' ' + cls.trim() + ' ';
  const cur = ' ' + stripAndCollapse(el.className) + ' ';
  if (cur.indexOf(className) > -1) {
    return true;
  }
  return false;
}

function addClass(el: HTMLElement, cls: string) {
  const classes = cls.trim().split(' ');
  let cur = ' ' + stripAndCollapse(el.className) + ' ';
  if (classes.length) {
    let j = 0,
      clazz = '';
    while ((clazz = classes[j++])) {
      if (cur.indexOf(' ' + clazz + ' ') < 0) {
        cur += clazz + ' ';
      }
    }

    if (el.className.trim() !== cur.trim()) {
      el.className = cur;
    }
  }
}

function removeClass(el: HTMLElement, cls: string) {
  const classes = cls.trim().split(' ');
  let cur = ' ' + stripAndCollapse(el.className) + ' ';
  if (classes.length) {
    let j = 0,
      clazz: string = null;

    while ((clazz = classes[j++])) {
      // 移除 *all* 匹配项
      while (cur.indexOf(' ' + clazz + ' ') > -1) {
        cur = cur.replace(' ' + clazz + ' ', ' ');
      }
    }

    if (el.className.trim() !== cur.trim()) {
      el.className = cur;
    }
  }
}

function toggleClass(el: HTMLElement, cls: string) {
  cls.split(' ').forEach(itemCls => {
    if (hasClass(el, itemCls)) {
      removeClass(el, itemCls);
    } else {
      addClass(el, itemCls);
    }
  });
}

export const $ = {
  hasClass,
  addClass,
  removeClass,
  toggleClass,
};

function AboutHome() {
  const panelRef = useRef<HTMLDivElement>();
  const [descData, setDescData] = useState({
    hitokoto: '如何得与凉风约，不共尘沙一并来!',
    from: '中牟道中',
  });

  const [showCloseIcon, setShowCloseIcon] = useState(false);
  const navigationWrapperRef = createRef<HTMLDivElement>();

  function mobileIconClickShow() {
    const navigationWrapperEl = navigationWrapperRef.current;

    if (
      window
        .getComputedStyle(navigationWrapperEl)
        .getPropertyValue('display') === 'block'
    ) {
      const onAnimationend = () => {
        const toggleClassStr = `${css.visible} ${css.animated} ${css.bounceOutUp}`;
        toggleClass(navigationWrapperEl, toggleClassStr);
        navigationWrapperEl.removeEventListener('animationend', onAnimationend);
      };
      navigationWrapperEl.addEventListener('animationend', onAnimationend);

      const toggleClassStr = `${css.animated} ${css.bounceInDown} ${css.animated} ${css.bounceOutUp}`;
      toggleClass(navigationWrapperEl, toggleClassStr);
    } else {
      const toggleClassStr = `${css.visible} ${css.animated} ${css.bounceInDown}`;
      toggleClass(navigationWrapperEl, toggleClassStr);
    }
  }

  useEffect(() => {
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

    // 加载页面入场动画类
    const iUpElements = document.querySelectorAll(`.${css.iUp}`);
    let t = 0;
    const d = 150;
    iUpElements.forEach(el => {
      setTimeout(() => {
        el.className = el.className + ' ' + css.up;
      }, t);
      t += d;
    });
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
          mt="2px"
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
            className={'avatar-box ' + css.iUp}
            cursor="pointer"
            pos="relative"
          >
            <Box
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
              borderRadius="50%"
              w="32"
              h="32"
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
              <Image
                style={{ borderRadius: '50%' }}
                src={wb_me_avatar}
                alt="hwcong"
                layout="fill"
              />
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
                  color="white"
                  pos="relative"
                  fontSize="18px"
                  lineHeight="44px"
                  textShadow="0 0 1px white, 0 1px 2px rgba(0, 0, 0, 0.3)"
                >
                  Hwcong
                </Heading>
                <Text color="#bbb" fontStyle="italic" fontSize="10px">
                  2022 · 幸运
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
            letterSpacing="3px"
            color="#cccccc"
            sx={{
              fontSmooth: 'antialiased',
            }}
          >
            Fortune Accompanies Life
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
                      href="./Personal profile/index.html"
                      className={css.blogButton}
                    >
                      自序
                    </a>
                  </li>
                  <li className={css.navigationItem}>
                    <a href="./Hobby/index.html" className={css.blogButton}>
                      爱好
                    </a>
                  </li>
                  <li className={css.navigationItem}>
                    <a href="./Grade/index.html" className={css.blogButton}>
                      成绩
                    </a>
                  </li>
                  <li className={css.navigationItem}>
                    <a href="./Collect/index.html" className={css.blogButton}>
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
                      rel="noreferrer"
                    >
                      <Icon as={AiFillGithub} fontSize="x-large" />
                      <span className={css.label}>github</span>
                    </a>
                  </li>
                  <li className={css.navigationItem}>
                    <a href="/" title="博客" target="_blank">
                      <Icon as={FaBlog} fontSize="x-large" />
                      <span className={css.label}>博客</span>
                    </a>
                  </li>
                  <li className={css.navigationItem}>
                    <a href="mailto:mutongxiao@hotmial.com" title="Email">
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
            <Link href="/" target="_blank" color="#4e97d8">
              {' '}
              Hwcong{' '}
            </Link>
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
    </Container>
  );
}

export default AboutHome;
