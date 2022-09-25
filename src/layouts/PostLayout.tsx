import Head from "next/head";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Navbar from "@components/Navbar";
import Container from "@components/Container";
import Newsletter from "@components/Newsletter";
import Footer from "@components/Footer";

type LayoutBaseProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  locale?: string;
  thumb?: string;
  extra?: string;
  postSlug?: string;
};

export default function LayoutBase({
  children,
  locale,
  title,
  description,
  thumb,
  extra,
  postSlug,
}: LayoutBaseProps) {
  const baseURL =
    "https://rychillie-net-git-feat-og-image-rychillie.vercel.app";
  const image = thumb
    ? `${baseURL}/${thumb}`
    : `${baseURL}/api/og-image/?title=${title}&top=${extra}&postSlug=${postSlug}`;

  return (
    <>
      <Head>
        <meta name="title" content={title} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
      </Head>
      <NextSeo
        openGraph={{
          type: "website",
          url: `${locale === "pt-BR" ? `${baseURL}/pt-BR/` : `${baseURL}/`}`,
          locale: locale === "pt-BR" ? "pt_BR" : "en_US",
          title: title,
          description: description,
          images: [
            {
              url: image,
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

      <header>
        <Container>
          <div className="py-4 md:py-6">
            <h1 className="text-2xl md:text-4xl font-semibold">{title}</h1>
          </div>
        </Container>
        {thumb && (
          <Container isLarge>
            <Image
              src={thumb}
              alt={title}
              width={896}
              height={448}
              layout="responsive"
              className="object-cover md:rounded-lg"
            />
          </Container>
        )}
      </header>

      <main className="py-6 md:py-12">
        <Container>{children}</Container>
      </main>

      <Newsletter locale={locale} />
      <Footer locale={locale} />
    </>
  );
}
