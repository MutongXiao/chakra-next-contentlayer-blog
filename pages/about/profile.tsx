import { useSession } from 'next-auth/react';
import { Button, VStack, Heading, Icon, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { WarningTwoIcon } from '@chakra-ui/icons';
import Profile from '@/components/about/profile';

function AccessDenied() {
  return (
    <VStack>
      <Icon as={WarningTwoIcon} color="red.500" fontSize="9xl" />
      <Heading color="red">Access Denied</Heading>
      <Text color="red" fontSize="lg">
        you must be got accsss code in to view this page!
      </Text>
      <Button
        onClick={e => {
          e.preventDefault();
          location.href = '/about';
        }}
      >
        Go Back
      </Button>
    </VStack>
  );
}

function ProfilePage() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  // When rendering client side don't display anything until loading is complete
  // 客户端渲染不会显示任何内容，直到loading状态完成
  if (typeof window !== 'undefined' && loading) return null;

  // If no session exists, display access denied message
  // 如果获取不到session 或不可访问，返回拒绝访问消息
  if (!session) {
    return <AccessDenied />;
  }

  return <Profile />;
}

export default dynamic(() => Promise.resolve(ProfilePage), {
  ssr: false,
});

// this way will throw error, see https://github.com/vercel/next.js/discussions/35773
// export default ProfilePage;
