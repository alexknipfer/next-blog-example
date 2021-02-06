export interface Post {
  id: string;
  slug: string;
  title: string;
  createdAt: string;
  date: string;
  content: PostContent;
  author: PostAuthor;
}

export interface PostContent {
  text: string;
}

export interface PostAuthor {
  name: string;
  title: string;
  picture: {
    url: string;
  };
}
