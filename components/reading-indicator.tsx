import { Box, Progress } from '@chakra-ui/react';
import { MutableRefObject, useEffect, useState } from 'react';

function ReadingIndicator({
  progressViewTargetRef,
}: {
  progressViewTargetRef?: MutableRefObject<HTMLElement>;
}) {
  const [progressValue, setProgressValue] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  function hasScrollbar() {
    return (
      document.body.scrollHeight >
      (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  useEffect(() => {
    setShowProgress(hasScrollbar());

    const targetElement =
      progressViewTargetRef?.current || document.querySelector('body');

    function handleSrcoll() {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const { height } = targetElement.getBoundingClientRect();

      const maxScroollTop = height - vh;
      if (window.scrollY > maxScroollTop) {
        setProgressValue(100);
        return;
      }

      const value = Math.abs((window.scrollY / maxScroollTop) * 100);
      setProgressValue(value);
    }

    function handleResize() {
      setShowProgress(hasScrollbar());
      handleSrcoll();
    }

    window.addEventListener('scroll', handleSrcoll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleSrcoll);
      window.removeEventListener('resize', handleResize);
    };
  }, [progressViewTargetRef]);

  return (
    <Box
      pos="fixed"
      zIndex="2"
      left="0"
      right="0"
      h="0.35rem"
      mt="-1"
      textAlign="end"
      display={showProgress ? 'block' : 'none'}
    >
      <Progress colorScheme="green" size="xs" value={progressValue} />
    </Box>
  );
}

export default ReadingIndicator;
