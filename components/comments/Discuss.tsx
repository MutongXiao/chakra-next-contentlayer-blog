import { useState } from 'react';
import Script from 'next/script';
import { Box, Button, Text, Divider, Stack } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';

const Discuss = () => {
  const [pathname, setPathname] = useState(null);
  const COMMENTS_ID = 'Discuss-Comments-Container';
  const enableLoadComments = pathname !== location.pathname;

  const loadComments = () => {
    setPathname(location.pathname);
    const comments = document.getElementById(COMMENTS_ID);
    // @ts-ignore
    if (!window.Discuss) {
      // 兼容 国产手机 浏览器 不加载脚本
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/discuss@1.0.1/dist/Discuss.js';
      script.setAttribute('crossorigin', 'anonymous');
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        !!comments &&
          // @ts-ignore
          window.Discuss.init({
            el: `#${COMMENTS_ID}`,
            serverURLs: '/service/discuss',
          });
        // @ts-ignore
        window.Discuss && alert('Not Discuss, but reloaded');
      };
    } else {
      // @ts-ignore
      !!comments &&
        // @ts-ignore
        window.Discuss.init({
          el: `#${COMMENTS_ID}`,
          serverURLs: '/service/discuss',
        });
    }
  };

  return (
    <>
      {/* <Script
        id="loadDiscuss"
        async={true}
        strategy="lazyOnload"
        src="https://cdn.jsdelivr.net/npm/discuss@1.0.1/dist/Discuss.js"
        //src="https://cdn.jsdelivr.net/npm/discuss@1.0.1/dist/Discuss.admin.js"
      /> */}
      <script
        async={true}
        src="https://cdn.jsdelivr.net/npm/discuss@1.0.1/dist/Discuss.js"
      />
      {/* <Script
        id="loadDiscussEmot"
        async={true}
        crossOrigin="anonymous"
        src="https://cdn.jsdelivr.net/npm/discuss@1.0.1/dist/emot.js"
      /> */}
      {enableLoadComments && (
        <Button
          rounded="full"
          colorScheme="teal"
          variant="outline"
          size="sm"
          w="full"
          onClick={loadComments}
        >
          加载评论
        </Button>
      )}
      <Stack
        display={!enableLoadComments ? 'block' : 'none'}
        direction="column"
        mb="2rem"
        spacing="6"
      >
        <Divider
          colorScheme="teal"
          orientation="horizontal"
          variant="dashed"
          border="2px"
          borderBottomWidth="2px"
          borderColor="#e58a8a"
        />
        <Text colorScheme="gray" fontWeight="bold" fontSize="lg">
          <ChatIcon /> 评论
        </Text>
        <Box id={COMMENTS_ID}></Box>
      </Stack>
    </>
  );
};

export default Discuss;
