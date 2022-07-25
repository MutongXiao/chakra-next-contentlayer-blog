import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import BaseLayout from 'layout/base-layout';
import Discuss from 'scripts/discuss-comments';

export default function MessageBoard() {
  const MESSAGE_BOX = 'message-box';

  function GetRandomNum(min: number, max: number) {
    const range = max - min;
    const rand = Math.random();
    return min + Math.round(rand * range);
  }

  useEffect(() => {
    Discuss.init({
      el: `#${MESSAGE_BOX}`,
      serverURLs: '/service/discuss',
    });

    const randomNum = GetRandomNum(1, 38);
    const discussTextArea = document
      .querySelector('#Discuss .D-input')
      .getElementsByTagName('textarea')[0];
    discussTextArea.style.backgroundRepeat = 'no-repeat';
    discussTextArea.style.backgroundPosition = 'right bottom';
    discussTextArea.style.backgroundImage = `url(/img/${randomNum}.gif)`;
  }, []);

  return (
    <BaseLayout>
      <Container maxW="4xl" mx="auto" w="100vw" px="1rem" my="10">
        <Heading
          textAlign="center"
          fontSize="3xl"
          w="full"
          bgClip="text"
          bgGradient="linear(to-r, green.400,purple.500)"
          fontWeight="extrabold"
        >
          Hi，欢迎在此留言
        </Heading>
        <Text
          textAlign="center"
          w="full"
          my="5"
          fontSize={{ base: 'lg', md: 'xl' }}
          color="gray.500"
        >
          留言昵称和邮箱可随便填，不为空即可
        </Text>
        <Box id={MESSAGE_BOX}></Box>
      </Container>
    </BaseLayout>
  );
}
