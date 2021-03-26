import BlogLayout from '@/layouts/BlogLayout';
import { addApolloState, initializeApollo } from '@/lib/apolloClient';
import { GetStaticProps, NextPage } from 'next';
import POST_QUERY from '@/graphql/postQuery.graphql';
import ALL_POSTS_QUERY from '@/graphql/allPostsQuery.graphql';
import { Post } from '@/models/Post';
import Image from 'next/image';
import { Badge, Box, Heading } from '@chakra-ui/layout';
import Author from '@/components/Author';
import { getReadTime } from '@/utils/getReadTime';

interface Props {
  post: Post;
}

export const BlogPost: NextPage<Props> = ({ post }) => {
  return (
    <BlogLayout>
      <Image width={1280} height={720} src={post.coverImage.url} priority />
      <Heading as="h1" mt={10} mb={5}>
        {post.title}
      </Heading>
      <Author
        profilePicture={post.author.picture.url}
        name={post.author.name}
        title={post.author.title}
      />
      <Badge alignSelf="flex-start">
        {getReadTime(post.content.html).readingDuration}
      </Badge>
      <Box mt={5} dangerouslySetInnerHTML={{ __html: post.content.html }} />
    </BlogLayout>
  );
};

export default BlogPost;

export const getStaticPaths: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<{ posts: Post[] }>({
    query: ALL_POSTS_QUERY,
  });

  const paths = data.posts.map(({ slug }) => ({ params: { slug } }));

  return addApolloState(apolloClient, {
    paths,
    fallback: false,
  });
};

export const getStaticProps: GetStaticProps = async (props) => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<{ post: Post }>({
    query: POST_QUERY,
    variables: {
      where: { slug: props.params?.slug },
    },
  });

  return {
    props: {
      post: data.post,
    },
    revalidate: 1,
  };
};
