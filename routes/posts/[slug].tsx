/** @jsx h */
import { h } from 'preact';
import { graphcms } from '../../lib/graphcms.client.ts';
import { gql } from 'graphql';
import { Handlers, PageProps } from "$fresh/server.ts";

const query = gql`
  query Post($slug: String!) {
    post(where: {slug: $slug}) {
      title
      content {
        html
      }
    }
  }
`;

type Post = {
  title: string;
  content: {
    html: string;
  }
};

export const handler: Handlers<Post | null> = {
  async GET(_, ctx) {
    const { slug } = ctx.params;
    const res = await graphcms.request(query, { slug });
    if (res.post) {
      return ctx.render({...res.post});
    }
    return ctx.render(null);
  }
}

export default function Post({data}: PageProps<Post | null>) {
  return (
    <main dangerouslySetInnerHTML={{__html: data.content.html}}>
    </main>
  )
}