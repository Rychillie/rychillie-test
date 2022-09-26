import Head from "next/head";
import { NextSeo } from "next-seo";
import Navbar from "@components/Navbar";
import Container from "@components/Container";
import Apresentation from "@components/Apresentation";
import Newsletter from "@components/Newsletter";
import Footer from "@components/Footer";

type LayoutBaseProps = {
  children: React.ReactNode;
  title: string;
  subTitle: string;
  description: string;
  hasApresentation?: boolean;
  locale?: string;
};

export default function LayoutBase({
  children,
  title,
  subTitle,
  description,
  locale,
  hasApresentation,
}: LayoutBaseProps) {
  return (
    <>
      <Head>
        <meta name="title" content={`${title} - ${subTitle}`} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
      </Head>
      <NextSeo
        openGraph={{
          type: "website",
          url: `https://rychillie-net.vercel.app${
            locale === "pt-BR" ? "/pt-BR/" : "/"
          }`,
          locale: locale === "pt-BR" ? "pt_BR" : "en_US",
          title: `${title} - ${subTitle}`,
          description: description,
          images: [
            {
              url: `https://rychillie-net.vercel.app/api/og/?title=${title}&subtitle=${subTitle}`,
              width: 1200,
              height: 630,
              alt: "Og Image Alt",
              type: "image/pgn",
            },
          ],
          site_name: "Rychillie",
        }}
        twitter={{
          handle: "@rychillie",
          site: "@rychillie",
          cardType: "summary_large_image",
        }}
      />

      <Navbar locale={locale} />

      {hasApresentation && <Apresentation locale={locale} />}

      <main>
        <Container>{children}</Container>
      </main>

      <Newsletter locale={locale} />
      <Footer locale={locale} />
    </>
  );
}
