import { Heading, Text, Flex, LinkBox, LinkOverlay } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';

import BlogTags from '@/components/post-tags';

interface Props {
  title?: string;
  publishDate?: string;
  tags?: string[];
  href?: string;
  // onClick?: MouseEventHandler<HTMLDivElement>;
}

// 文章列表 Item 组件

const ArticleItem: React.FC<Props> = ({
  title = '',
  publishDate = '',
  tags = [],
  href = '#',
}) => {
  return (
    <Flex justifyContent="space-between" alignItems="center" cursor="pointer">
      <LinkBox flex={1} as="article">
        <Heading textAlign={'left'} as="h5" size="sm" mb={2}>
          <NextLink href={href} passHref>
            <LinkOverlay>{title}</LinkOverlay>
          </NextLink>
        </Heading>
        <BlogTags tags={tags} />
      </LinkBox>
      <Text as="samp" display={{ base: 'none', md: 'block' }}>
        {publishDate}
      </Text>
    </Flex>
  );
};

export default ArticleItem;
