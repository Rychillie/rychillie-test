import Head from "next/head";
import Link from "next/link";
import { compareDesc } from "date-fns";
import {
  allBlogEnUs,
  allBlogPtBRs,
  allNewsletters,
} from "contentlayer/generated";
import { useRouter } from "next/router";
import { DatePost } from "@lib/utils";

export function getStaticProps({ locale }: { locale: string }) {
  const postLang = locale === "pt-BR" ? allBlogPtBRs : allBlogEnUs;
  const posts = postLang
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    })
    .slice(0, 4);

  return { props: { posts } };
}

const Home = ({ posts }: any) => {
  const router = useRouter();
  const { locale } = router;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>{locale === "pt-BR" ? "Olá Mundo" : "Hello World"}</h1>

      {posts.map((post: any, index: any) => (
        <Link key={index} href={`blog/${post.slug}`} locale={locale as string}>
          <>
            <h3>{post.title}</h3>
            <span>{DatePost(post.date, locale as string)}</span>
          </>
        </Link>
      ))}
    </>
  );
};

export default Home;
