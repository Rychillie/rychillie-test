import Image from "next/image";
import Container from "@components/Container";
import Shortcut from "@components/Shortcut";

export default function Apresentation({ locale }: { locale?: string }) {
  return (
    <header>
      <Container>
        <div className="flex flex-col md:flex-row py-14 gap-6 md:gap-12 md:py-28">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden">
            <Image
              src="/rychillie-pencil.jpg"
              alt="Rychillie holding an Apple Pencil"
              width={160}
              height={160}
              layout="responsive"
              className="flex w-32 h-32 md:w-40 md:h-40"
            />
          </div>
          <div className="flex flex-col gap-4 md:gap-6 flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-50">
              {locale === "pt-BR" ? `Olá — Eu sou ` : "Hello — I'm "}Rychillie
              <span className="text-fuchsia-500 dark:text-fuchsia-400">.</span>
            </h1>
            <p className="text-base font-medium text-neutral-500 dark:text-neutral-400">
              {locale === "pt-BR"
                ? "Eu sou um desenvolvedor frontend no Brasileiro. Trabalhando na Trivod. Amante de design e tecnologia, compartilhando conhecimento pela web e colaborando com projetos OpenSource."
                : "I'm a frontend engineer based Brazil. Working at Trivod. Lover of design and technology, sharing knowledge through the web and collaborating with OpenSource projects."}
            </p>
            <Shortcut locale={locale} />
          </div>
        </div>
      </Container>
    </header>
  );
}
