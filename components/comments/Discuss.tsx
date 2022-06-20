import { useState } from 'react';
import { Box, Button, Text, Divider, Stack } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import Discuss from 'scripts/discuss-comments';

const DiscussComments = () => {
  const [pathname, setPathname] = useState(null);
  const COMMENTS_ID = 'Discuss-Comments-Container';
  const enableLoadComments = pathname !== location.pathname;

  const loadComments = () => {
    setPathname(location.pathname);
    const comments = document.getElementById(COMMENTS_ID);
    !!comments &&
      Discuss.init({
        el: `#${COMMENTS_ID}`,
        serverURLs: '/service/discuss',
      });
  };

  return (
    <>
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
