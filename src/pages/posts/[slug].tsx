import Head from "next/head";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";

export async function getStaticPaths() {
  const paths = allPosts.map((post) => post.url);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  return {
    props: {
      post,
    },
  };
}

const PostLayout = ({ post }: any) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <article className="mx-auto max-w-2xl py-16">
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="text-center text-sm font-bold uppercase text-blue-700"
          >
            Home
          </Link>
        </div>
        <div className="mb-6 text-center">
          <h1 className="mb-1 text-3xl font-bold">{post.title}</h1>
          <time dateTime={post.date} className="text-sm text-slate-600">
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
        </div>
        <div
          className="cl-post-body"
          dangerouslySetInnerHTML={{ __html: post.body.html }}
        />
      </article>
    </>
  );
};

export default PostLayout;
