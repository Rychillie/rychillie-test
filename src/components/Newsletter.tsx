import Container from "@components/Container";

type NewsletterProps = {
  locale?: string;
};

export default function Newsletter({ locale }: NewsletterProps) {
  return (
    <section>
      <Container>
        <span>Newsletter - {locale === "pt-BR" ? "Portugues" : "English"}</span>
      </Container>
    </section>
  );
}
