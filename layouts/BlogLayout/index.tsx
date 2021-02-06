import { Flex } from '@chakra-ui/react';

const BlogLayout: React.FC = ({ children }) => {
  return (
    <Flex direction="column" minHeight="100%" px="20%" py="5%">
      {children}
    </Flex>
  );
};

export default BlogLayout;
