import {
  Box,
  BoxProps,
  ListItem,
  OrderedList,
  Text,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useScrollSpy } from 'hooks/use-scrollspy';

interface Heading {
  level: 'h2' | 'h3';
  text: string;
  id: string;
}

interface TableOfContentProps extends BoxProps {
  headings: Heading[];
}

function TableOfContent(props: TableOfContentProps) {
  const { headings, ...rest } = props;
  const activeId = useScrollSpy(
    headings.map(({ id }) => `[id="${id}"]`),
    {
      rootMargin: '0% 0% -24% 0%',
    },
  );

  const tocRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const activeDom = document.getElementById(`li-${activeId}`);
    if (activeDom) {
      // 获取可视窗口的高度。
      const viewHeight = tocRef.current.clientHeight;
      // 获取滚动条滚动的高度
      const scrollTop = tocRef.current.scrollTop;
      // 滚动内容总高度
      const scrollHeight = tocRef.current.scrollHeight;
      // 获取元素偏移的高度。就是距离可视窗口的偏移量。
      const offsetTop = activeDom.offsetTop;
      // 最大滚动距离
      const maxScrollTop = scrollHeight - viewHeight;
      // 选中目录不在可视区，则滚动至可视区
      if (offsetTop - scrollTop >= viewHeight || offsetTop - scrollTop <= 0) {
        tocRef.current.scrollTo({
          top: offsetTop > maxScrollTop ? maxScrollTop : offsetTop,
          behavior: 'smooth',
        });
      }
    }
  }, [activeId]);

  const linkColor = useColorModeValue('gray.600', 'gray.400');
  const linkHoverColor = useColorModeValue('gray.900', 'gray.600');
  return (
    <Box
      ref={tocRef}
      as="nav"
      aria-labelledby="toc-title"
      width="16rem"
      flexShrink={0}
      display={{ base: 'none', xl: 'block' }}
      position="sticky"
      py="10"
      pr="4"
      top="6rem"
      right="0"
      fontSize="md"
      alignSelf="start"
      maxHeight="calc(100vh - 8rem)"
      overflowY="auto"
      sx={{ overscrollBehavior: 'contain' }}
      {...rest}
    >
      <Text
        as="h2"
        id="toc-title"
        textTransform="uppercase"
        fontWeight="bold"
        fontSize="xl"
        color="gray.700"
        _dark={{ color: 'gray.400' }}
        letterSpacing="wide"
      >
        目录
      </Text>
      <OrderedList spacing={1} ml="0" mt="4" styleType="none">
        {headings.map(({ id, text, level }) => (
          <ListItem
            data-selected={activeId === id || undefined}
            id={`li-${id}`}
            key={id}
            title={text}
            ml={level === 'h3' ? '4' : undefined}
            _selected={{
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
            }}
          >
            <chakra.a
              py="1"
              display="block"
              fontWeight={id === activeId ? 'bold' : 'medium'}
              href={`#${id}`}
              aria-current={id === activeId ? 'location' : undefined}
              color={linkColor}
              _hover={{
                color: linkHoverColor,
              }}
            >
              {text}
            </chakra.a>
          </ListItem>
        ))}
      </OrderedList>
    </Box>
  );
}

export default TableOfContent;
