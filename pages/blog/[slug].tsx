import BlogLayout from '@/layouts/BlogLayout';
import { addApolloState, initializeApollo } from '@/lib/apolloClient';
import { Post } from '@/models/Post';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import ALL_POSTS_QUERY from '@/graphql/allPostsQuery.graphql';
import Image from 'next/image';
import Author from '@/components/Author';
import POST_QUERY from '@/graphql/postQuery.graphql';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

interface Props {
  post: Post;
}

export const BlogPost: NextPage<Props> = ({ post }) => {
  return (
    <BlogLayout>
      <Breadcrumbs
        items={[
          { href: '/', name: 'Blogs' },
          { href: `/blog/${post.slug}`, name: post.title },
        ]}
      />
      <Image width={1280} height={720} src={post.coverImage.url} />
      <Heading as="h1" mt={10} mb={5}>
        {post.title}
      </Heading>
      <Author
        profilePicture={post.author.picture.url}
        name={post.author.name}
        title={post.author.title}
      />
      <Box mt={5} dangerouslySetInnerHTML={{ __html: post.content.html }} />
    </BlogLayout>
  );
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
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
