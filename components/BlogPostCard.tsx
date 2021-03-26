import { Post } from '@/models/Post';
import { getReadTime } from '@/utils/getReadTime';
import Author from '@/components/Author';
import {
  Box,
  Text,
  Badge,
  Divider,
  Link as ChakraLink,
} from '@chakra-ui/react';
import Link from 'next/link';

interface Props {
  post: Post;
}

const BlogPostCard: React.FC<Props> = ({ post }) => (
  <Box as="article">
    <Text color="gray.500">{post.date}</Text>
    <Text fontWeight="bold" fontSize={['lg', '2xl']}>
      <ChakraLink as={Link} href={`/blog/${post.slug}`}>
        {post.title}
      </ChakraLink>
    </Text>
    <Author
      profilePicture={post.author.picture.url}
      name={post.author.name}
      title={post.author.title}
    />
    <Badge>{getReadTime(post.content.html).readingDuration}</Badge>
    <Divider my={5} />
  </Box>
);

export default BlogPostCard;
