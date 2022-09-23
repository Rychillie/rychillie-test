import Image from "next/image";
import Navbar from "@components/Navbar";
import Container from "@components/Container";
import Footer from "@components/Footer";

type LayoutBaseProps = {
  children: React.ReactNode;
  locale?: string;
  title: string;
  thumb?: string;
};

export default function LayoutBase({
  children,
  locale,
  title,
  thumb,
}: LayoutBaseProps) {
  return (
    <>
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

      <Footer locale={locale} />
    </>
  );
}
