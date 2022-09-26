import Head from "next/head";
import { useRouter } from "next/router";
import { compareDesc } from "date-fns";
import {
  allBlogEnUs,
  allBlogPtBRs,
  allCourseEnUs,
  allCoursePtBRs,
} from "contentlayer/generated";
import SectionList from "@components/SectionList";
import ItemPost from "@components/ItemPost";
import { DatePost } from "@lib/utils";
import LayoutBase from "@layouts/BaseLayout";
import { NextSeo } from "next-seo";

export function getStaticProps({ locale }: { locale: string }) {
  const postLang = locale === "pt-BR" ? allBlogPtBRs : allBlogEnUs;
  const courseLang = locale === "pt-BR" ? allCoursePtBRs : allCourseEnUs;
  const posts = postLang
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    })
    .slice(0, 4);

  const courses = courseLang
    .sort((a, b) => {
      return compareDesc(new Date(a.title), new Date(b.title));
    })
    .slice(0, 4);

  return { props: { posts, courses } };
}

const Home = ({ posts, courses }: any) => {
  const router = useRouter();
  const { locale } = router;

  return (
    <LayoutBase
      title={locale === "pt-BR" ? "Rychillie" : "Rychillie"}
      subTitle={
        locale === "pt-BR"
          ? "O Maluco do iPad e Deus do CSS"
          : "The Crazy Guy conding on iPad"
      }
      description={
        locale === "pt-BR"
          ? "Eu sou um desenvolvedor frontend no Brasileiro. Trabalhando na Trivod. Amante de design e tecnologia, compartilhando conhecimento pela web e colaborando com projetos OpenSource."
          : "I'm a frontend engineer based Brazil. Working at Trivod. Lover of design and technology, sharing knowledge through the web and collaborating with OpenSource projects."
      }
      locale={locale}
      hasApresentation
    >
      <SectionList
        title={locale === "pt-BR" ? "Cursos" : "Learn"}
        locale={locale === "pt-BR" ? "pt-BR" : "en-US"}
        link="/learn"
        isGrid
      >
        {courses.map((course: any, index: any) => (
          <ItemPost
            key={index}
            link={course.external_url}
            locale={locale as string}
            title={course.title}
            description={course.description}
            extra={course.course_length}
            isGrid
          />
        ))}
      </SectionList>

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
