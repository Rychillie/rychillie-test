import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta content="#171717" name="theme-color" />
        <meta content="#171717" name="msapplication-TileColor" />
        <meta
          content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          name="robots"
        />
      </Head>
      <body className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-300">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
