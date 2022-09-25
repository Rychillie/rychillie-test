import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { compareDesc } from "date-fns";
import { allBlogEnUs, allBlogPtBRs } from "contentlayer/generated";
import SectionList from "@components/SectionList";
import ItemPost from "@components/ItemPost";
import { DatePost } from "@lib/utils";
import LayoutBase from "@layouts/BaseLayout";

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
    <LayoutBase locale={locale} hasApresentation>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content="https://0759m6-3000.preview.csb.app/api/og-image?name=Next.js&stage=adopt"
        />
      </Head>

      <img
        src="https://0759m6-3000.preview.csb.app/api/og-image?name=Next.js&stage=adopt"
        width={1200}
        height={600}
        alt="image test"
      />

      <SectionList
        title={locale === "pt-BR" ? "Artigos" : "Writting"}
        locale={locale === "pt-BR" ? "pt-BR" : "en-US"}
        link="/blog"
      >
        {posts.map((post: any, index: any) => (
          <ItemPost
            key={index}
            slug={`blog/${post.slug}`}
            locale={locale as string}
            title={post.title}
            description={post.description}
            extra={DatePost(post.date, locale as string)}
          />
        ))}
      </SectionList>
    </LayoutBase>
  );
};

export default Home;
