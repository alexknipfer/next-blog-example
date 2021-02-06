import { Flex } from '@chakra-ui/react';

const BlogLayout: React.FC = ({ children }) => {
  return (
    <Flex direction="column" h="full" px="20%" py="10%">
      {children}
    </Flex>
  );
};

export default BlogLayout;
