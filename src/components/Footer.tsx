import Link from "next/link";
import Container from "@components/Container";

type NavBarProps = {
  locale?: string;
};

export default function Footer({ locale }: NavBarProps) {
  return (
    <footer>
      <Container>
        <div className="flex items-center align-center justify-center w-full relative py-12 md:py-16 flex gap-6 flex-col md:flex-row md:justify-between">
          <div className="flex flex-row gap-6 text-base font-medium text-neutral-700 dark:text-neutral-200">
            <Link className="transition-opacity hover:opacity-60" href="/">
              {locale === "pt-BR" ? "About" : "Sobre"}
            </Link>
            <Link className="transition-opacity hover:opacity-60" href="/">
              Uses
            </Link>
            <Link className="transition-opacity hover:opacity-60" href="/">
              {locale === "pt-BR" ? "Terms" : "Termos"}
            </Link>
            <Link className="transition-opacity hover:opacity-60" href="/">
              {locale === "pt-BR" ? "Privacy" : "Privacidade"}
            </Link>
          </div>
          <div className="text-neutral-500 dark:text-neutral-400 text-sm font-medium text-center w-full flex flex-col gap-4 md:gap-2 md:flex-row md:w-auto">
            <p>Powered by ▲ Vercel</p>
            <p className="hidden md:flex">|</p>
            <p>
              Copyright &copy;{" "}
              <span className="text-fuchsia-400">
                {new Date().getFullYear()}
              </span>{" "}
              rychillie
              <span className="text-fuchsia-400">.</span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
