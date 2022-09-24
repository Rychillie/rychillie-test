import Navbar from "@components/Navbar";
import Container from "@components/Container";
import Apresentation from "@components/Apresentation";
import Newsletter from "@components/Newsletter";
import Footer from "@components/Footer";

type LayoutBaseProps = {
  children: React.ReactNode;
  hasApresentation?: boolean;
  locale?: string;
};

export default function LayoutBase({
  children,
  locale,
  hasApresentation,
}: LayoutBaseProps) {
  return (
    <>
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
