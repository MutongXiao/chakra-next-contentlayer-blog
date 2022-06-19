import { useState } from 'react';
import Script from 'next/script';
import { Box, Button, Text, Divider, Stack } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';

const DiscussComments = () => {
  const [pathname, setPathname] = useState(null);
  const COMMENTS_ID = 'Discuss-Comments-Container';
  const enableLoadComments = pathname !== location.pathname;

  const loadComments = () => {
    setPathname(location.pathname);
    // @ts-ignore
    const comments = document.getElementById(COMMENTS_ID);
    // @ts-ignore
    if (!window.Discuss) {
      const script = document.createElement('script');
      script.src = '/js/Discuss.js';
      script.onload = () => {
        !!comments &&
          // @ts-ignore
          window.Discuss.init({
            el: `#${COMMENTS_ID}`,
            serverURLs: '/service/discuss',
          });
      };
      comments && comments.appendChild(script);
      return;
    }
    !!comments &&
      // @ts-ignore
      window.Discuss.init({
        el: `#${COMMENTS_ID}`,
        serverURLs: '/service/discuss',
      });
  };

  return (
    <>
      <Script
        id="loadDiscuss"
        strategy="lazyOnload"
        src="/js/Discuss.js"
        //src="https://cdn.jsdelivr.net/npm/discuss@1.0.1/dist/Discuss.js"
        //src="https://cdn.jsdelivr.net/npm/discuss@1.0.1/dist/Discuss.admin.js"
      />
      {/* <script
        async={true}
        src="https://cdn.jsdelivr.net/npm/discuss@1.0.1/dist/Discuss.js"
      /> */}
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

export default DiscussComments;
