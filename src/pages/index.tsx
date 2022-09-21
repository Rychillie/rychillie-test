import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { compareDesc } from "date-fns";
import {
  allBlogEnUs,
  allBlogPtBRs,
  allNewsletters,
} from "contentlayer/generated";
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
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  const router = useRouter();
  const { locale } = router;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex items-center justify-between w-full relative">
        <h1>{locale === "pt-BR" ? "Olá Mundo" : "Hello World"}</h1>

        <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="w-9 h-9 bg-neutral-200 rounded-lg dark:bg-neutral-700 flex items-center justify-center  hover:ring-2 ring-neutral-400  transition-all"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {mounted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-5 h-5 text-neutral-800 dark:text-neutral-200"
            >
              {resolvedTheme === "dark" ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              )}
            </svg>
          )}
        </button>
      </nav>

      {posts.map((post: any, index: any) => (
        <Link
          key={index}
          href={`blog/${post.slug}`}
          locale={locale as string}
          className="hover:opacity-60 transition-opacity"
        >
          <>
            <h3 className="text-neutral-900 dark:text-neutral-300">
              {post.title}
            </h3>
            <span className="text-neutral-800 dark:text-neutral-400">
              {DatePost(post.date, locale as string)}
            </span>
          </>
        </Link>
      ))}
    </>
  );
};

export default Home;
