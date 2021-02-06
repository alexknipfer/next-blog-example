import BlogLayout from '@/layouts/BlogLayout';
import { addApolloState, initializeApollo } from '@/lib/apolloClient';
import { Post } from '@/models/Post';
import { gql } from '@apollo/client';
import Image from 'next/image';
import {
  Box,
  Button,
  Heading,
  Text,
  Link as ChakraLink,
  HStack,
  Divider,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Link from 'next/link';

const ALL_POSTS_QUERY = gql`
  query AllPostsQuery {
    posts {
      id
      slug
      title
      date
      author {
        name
        title
        picture {
          url
        }
      }
    }
  }
`;

interface Props {
  posts: Post[];
}

const BlogPosts: NextPage<Props> = ({ posts }) => {
  console.log('POSTS: ', posts);
  return (
    <BlogLayout>
      <Heading as="h1" mb={10}>
        Latest
      </Heading>
      {posts.map((post) => (
        <Box key={`${post.title}-${post.createdAt}`}>
          <Text color="gray.500">{post.date}</Text>
          <Text fontWeight="bold" fontSize="2xl">
            <ChakraLink as={Link} href={`/blog/${post.slug}`}>
              {post.title}
            </ChakraLink>
          </Text>
          <HStack my={3}>
            <Image
              width={50}
              height={50}
              src={post.author.picture.url}
              className="profile-image"
            />
            <Box>
              <Text color="gray.300">{post.author.name}</Text>
              <Text color="gray.400">{post.author.title}</Text>
            </Box>
          </HStack>
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
