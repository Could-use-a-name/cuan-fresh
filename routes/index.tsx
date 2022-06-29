/** @jsx h */
import { h } from 'preact';
import { graphcms } from '../lib/graphcms.client.ts';
import { gql } from 'graphql';
import { Handlers, PageProps } from '$fresh/server.ts';

type Author = {
  name: string;
  slug: string;
}

type Post = {
  title: string;
  slug: string;
  authors: Author[];
}

type LoaderData = {
  posts: Post[];
}

const query = gql`
  {
    posts {
      title
      slug
      authors {
        name
        slug
      }
    }
  }
`;

export const handler: Handlers<LoaderData> = {
  async GET(_, ctx) {
    const res = await graphcms.request(query);
    return ctx.render({posts: res.posts});
  }
}

export default function Home({ data } : PageProps<LoaderData>) {
  const { posts } = data;
  return (
    <main>
      <h1>Posts</h1>
      {posts.map((post, index) => (
        <a key={index} href={`/posts/${post.slug}`}>
          <h2>{post.title}</h2>
        </a>
      ))}
    </main>
  );
}
