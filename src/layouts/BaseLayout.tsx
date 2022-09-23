import Navbar from "@components/Navbar";
import Container from "@components/Container";
import Footer from "@components/Footer";

type LayoutBaseProps = {
  children: React.ReactNode;
  locale?: string;
};

export default function LayoutBase({ children, locale }: LayoutBaseProps) {
  return (
    <>
      <Navbar locale={locale} />

      <main>
        <Container>{children}</Container>
      </main>

      <Footer locale={locale} />
    </>
  );
}
