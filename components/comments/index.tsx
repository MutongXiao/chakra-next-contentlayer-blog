import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const DiscussComment = dynamic(
  () => {
    return import('@/components/comments/Discuss');
  },
  { ssr: false },
);

export default function Comments() {
  return (
    <Box id="comments">
      <DiscussComment />
    </Box>
  );
}
