import { HStack, Tag, SpaceProps } from '@chakra-ui/react';
import React from 'react';

interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps['marginTop'];
}
// 文章列表 Item 组件
const BlogTags: React.FC<IBlogTags> = props => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map(tag => {
        return (
          <Tag size={'sm'} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

export default BlogTags;
