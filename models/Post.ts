export interface Post {
  id: string;
  slug: string;
  title: string;
  createdAt: string;
  date: string;
  coverImage: PostCoverImage;
  content: PostContent;
  author: PostAuthor;
}

export interface PostContent {
  text: string;
  html: string;
}

export interface PostAuthor {
  name: string;
  title: string;
  picture: {
    url: string;
  };
}

export interface PostCoverImage {
  url: string;
}
