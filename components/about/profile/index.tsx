import { Box, Icon } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { StarIcon, ViewIcon, CalendarIcon, UnlockIcon } from '@chakra-ui/icons';
import { FaReact, FaVuejs, FaCss3Alt, FaNodeJs } from 'react-icons/fa';
import { DiJavascript } from 'react-icons/di';
import { SiWebpack } from 'react-icons/si';

import css from './index.module.css';
import me_picture from 'public/img/wb_me_avatar.png';

function Profile() {
  return (
    <>
      <aside className={css.sidebar}>
        <Box className={css.avatar}>
          <Image
            className={css.img}
            src={me_picture}
            width="160px"
            height="160px"
            priority
            title="Wcong_H"
            alt="me picture"
          />
        </Box>
        <nav className={css.nav}>
          <NextLink href="/about" passHref>
            <a>首页</a>
          </NextLink>
          <a href="#info">资料</a>
          <a href="#skills">技能</a>
          <a href="#works">作品</a>
          <a href="#story">经历</a>
        </nav>
      </aside>
      <main className={css.main}>
        <section id="info">
          <div className={css.wrap}>
            <h2 className={css.title}>
              <Icon as={StarIcon} mr="3" />
              个人资料
            </h2>
            <div className={css.row}>
              <div className={css.col_l_4}>
                <p>姓名：Wcong_H</p>
                <p>性别：男</p>
                <p>年龄：18</p>
                <p>英文名：Wcong_H</p>
                <p>学历：博士后</p>
              </div>
              <div className={css.col_l_4}>
                <p>QQ：1243166374</p>
                <p>
                  GitHub：
                  <a
                    href="https://github.com/mutongxiao"
                    rel="noreferrer"
                    className={css.link}
                    target="_blank"
                  >
                    mutongxiao
                  </a>
                </p>
                <p>
                  博客：
                  <NextLink href="/" passHref>
                    <a className={css.link}>
                      www.chakra-next-contentlayer-blog.vercel.app
                    </a>
                  </NextLink>
                </p>
                <p>
                  邮箱：
                  <a href="mailto:mutongxiao@hotmail.com" className={css.link}>
                    mutongxiao@hotmail.com
                  </a>
                </p>
              </div>
              <div className={css.col_l_4}>
                <p>
                  我是一个热爱钻研计算机技术的少年，从小开始对计算机有极大的兴趣。作为计算机专业的学生，我热爱我的专业并为其投入巨大的热情和精力。希望大家能和我一同热爱计算机！
                </p>
              </div>
            </div>
          </div>
        </section>
        <Box as="section" id="skills" bg="#00bebd">
          <div className={css.wrap}>
            <h2 className={css.title}>
              <Icon as={UnlockIcon} mr="3" />
              掌握的技能
            </h2>
            <div className={`${css.row} ${css.scrollable}`}>
              <div
                className={`${css.col_s_6} ${css.col_m_4} ${css.center_fixed}`}
              >
                <Icon
                  as={FaReact}
                  className={css.skills_icon}
                  fontSize="8xl"
                  color="black"
                />
                <div className={css.skills_title}>
                  <h3>React</h3>
                  <p>熟悉 HTML5 网站的架构和开发</p>
                </div>
              </div>
              <div
                className={`${css.col_s_6} ${css.col_m_4} ${css.center_fixed}`}
              >
                <Icon
                  as={FaVuejs}
                  className={css.skills_icon}
                  fontSize="8xl"
                  color="black"
                />
                <div className={css.skills_title}>
                  <h3>Vue</h3>
                  <p>熟悉 HTML5 网站的架构和开发</p>
                </div>
              </div>
              <div
                className={`${css.col_s_6} ${css.col_m_4} ${css.center_fixed}`}
              >
                <Icon
                  as={SiWebpack}
                  className={css.skills_icon}
                  fontSize="8xl"
                  color="black"
                />
                <div className={css.skills_title}>
                  <h3>webpack</h3>
                  <p>熟悉 HTML5 网站的架构和开发</p>
                </div>
              </div>
              <div
                className={`${css.col_s_6} ${css.col_m_4} ${css.center_fixed}`}
              >
                <Icon
                  as={FaCss3Alt}
                  className={css.skills_icon}
                  fontSize="8xl"
                  color="black"
                />
                <div className={css.skills_title}>
                  <h3>CSS3</h3>
                  <p>熟悉使用 CSS3 写响应式网站、动画等</p>
                </div>
              </div>
              <div
                className={`${css.col_s_6} ${css.col_m_4} ${css.center_fixed}`}
              >
                <Icon
                  as={DiJavascript}
                  className={css.skills_icon}
                  fontSize="8xl"
                  color="black"
                />
                <div className={css.skills_title}>
                  <h3>JavaScript</h3>
                  <p>能使用 JS 制作简单的程序、交互与特效</p>
                </div>
              </div>
              <div
                className={`${css.col_s_6} ${css.col_m_4} ${css.center_fixed}`}
              >
                <Icon
                  as={FaNodeJs}
                  className={css.skills_icon}
                  fontSize="8xl"
                  color="black"
                />
                <div className={css.skills_title}>
                  <h3>NodeJS</h3>
                  <p>能使用 JS 制作简单的程序、交互与特效</p>
                </div>
              </div>
            </div>
          </div>
        </Box>
        <section id="works">
          <div className={css.wrap}>
            <h2 className={css.title}>
              <Icon as={ViewIcon} mr="3" />
              个人作品
            </h2>
            <div className={css.row}>
              <div className={css.col_s_6}>
                <div className={css.works_item}>
                  <img src="/img/profile/works/web1.jpeg" alt="web1" />
                  <p>个人主页</p>
                </div>
              </div>
              <div className={css.col_s_6}>
                <div className={css.works_item}>
                  <img src="/img/profile/works/web2.jpeg" alt="web2" />
                  <p>个人博客</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="story">
          <div className={css.wrap}>
            <h2 className={css.title}>
              <Icon as={CalendarIcon} mr="3" />
              个人经历
            </h2>
            <div className={css.row}>
              <div className={css.col_m_8}>
                <ul className={css.timeline}>
                  <li>2018.09：步入哈弗大学 </li>
                  <li>2018.12: 进入诺贝尔实验室 </li>
                  <li>2019.05: 进入图灵实验室 </li>
                  <li>2019.08: 获计算机图灵奖 </li>
                  <li>2019.11: 获诺贝尔计算机奖</li>
                  <li>2020.12: 保送卡内基梅隆大学计算机硕博连读 </li>
                  <li>2022.--: 以上纯属我的白日梦</li>
                </ul>
              </div>
              <div className={`${css.col_m_4} ${css.center_fixed}`}>
                <img src="/img/profile/story.png" alt="story" />
              </div>
            </div>
          </div>
        </section>
        <footer className={css.footer}>
          <p>
            © {new Date().getFullYear()} By{' '}
            <NextLink href="/" passHref>
              <a title="Wcong_H的博客" target="_blank">
                Wcong_H
              </a>
            </NextLink>
            .
          </p>
        </footer>
      </main>
    </>
  );
}

export default Profile;
