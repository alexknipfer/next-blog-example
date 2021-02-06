import BlogLayout from '@/layouts/BlogLayout';
import { addApolloState, initializeApollo } from '@/lib/apolloClient';
import { Post } from '@/models/Post';
import {
  Box,
  Heading,
  Text,
  Link as ChakraLink,
  Divider,
  Badge,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Link from 'next/link';
import Author from '@/components/Author';
import ALL_POSTS_QUERY from '@/graphql/allPostsQuery.graphql';
import { getReadTime } from '@/utils/getReadTime';

interface Props {
  posts: Post[];
}

const BlogPosts: NextPage<Props> = ({ posts }) => {
  return (
    <BlogLayout>
      <Heading as="h1" mb={10}>
        Latest
      </Heading>
      {posts.map((post) => (
        <Box key={`${post.title}-${post.createdAt}`}>
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
      ))}
      <style jsx global>{`
        .profile-image {
          border-radius: 50%;
        }
      `}</style>
    </BlogLayout>
  );
};

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<{ posts: Post[] }>({
    query: ALL_POSTS_QUERY,
  });

  return addApolloState(apolloClient, {
    props: {
      posts: data.posts,
    },
  });
}

export default BlogPosts;
