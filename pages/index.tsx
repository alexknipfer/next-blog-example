import BlogLayout from '@/layouts/BlogLayout';
import { Post } from '@/models/Post';
import { Heading } from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import ALL_POSTS_QUERY from '@/graphql/allPostsQuery.graphql';
import BlogPostCard from '@/components/BlogPostCard';
import { addApolloState, initializeApollo } from '@/lib/apolloClient';

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
        <BlogPostCard key={`${post.title}-${post.createdAt}`} post={post} />
      ))}
    </BlogLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<{ posts: Post[] }>({
    query: ALL_POSTS_QUERY,
  });

  return addApolloState(apolloClient, {
    props: {
      posts: data.posts,
    },
  });
};

export default BlogPosts;
