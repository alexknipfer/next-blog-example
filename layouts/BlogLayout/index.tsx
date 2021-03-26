import { Flex } from '@chakra-ui/react';

const BlogLayout: React.FC = ({ children }) => {
  return (
    <Flex
      as="main"
      direction="column"
      minHeight="100%"
      px={['10%', '20%']}
      py={14}
    >
      {children}
    </Flex>
  );
};

export default BlogLayout;
