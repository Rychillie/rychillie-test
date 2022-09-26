import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import NextLink from "next/link";
import Container from "@components/Container";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import useDelayedRender from "use-delayed-render";
import styles from "@styles/mobile-menu.module.css";
import cn from "classnames";
import { useKBar } from "kbar";

type NavBarProps = {
  locale?: string;
};

function MobileMenu({ locale }: { locale: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(
    isMenuOpen,
    {
      enterDelay: 20,
      exitDelay: 300,
    }
  );

  function toggleMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = "";
    } else {
      setIsMenuOpen(true);
      document.body.style.overflow = "hidden";
    }
  }

  useEffect(() => {
    return function cleanup() {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <button
        className={cn(styles.burger, "visible md:hidden")}
        aria-label="Toggle menu"
        type="button"
        onClick={toggleMenu}
      >
        <MenuIcon data-hide={isMenuOpen} />
        <CrossIcon data-hide={!isMenuOpen} />
      </button>
      {isMenuMounted && (
        <ul
          className={cn(
            styles.menu,
            "flex flex-col absolute inset-y-24 inset-x-0 px-6 bg-white dark:bg-neutral-900",
            isMenuRendered && styles.menuRendered
          )}
        >
          <li
            className="border-b border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:text-neutral-500 hover:dark:text-neutral-500 text-sm font-semibold"
            style={{ transitionDelay: "150ms" }}
          >
            <NextLink href="/blog">
              <a className="flex w-auto pb-4">Blog</a>
            </NextLink>
          </li>
          <li
            className="border-b border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:text-neutral-500 hover:dark:text-neutral-500 text-sm font-semibold"
            style={{ transitionDelay: "175ms" }}
          >
            <NextLink href="/learn">
              <a className="flex w-auto pb-4">
                {locale === "pt-BR" ? "Cursos" : "Learn"}
              </a>
            </NextLink>
          </li>
          <li
            className="border-b border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:text-neutral-500 hover:dark:text-neutral-500 text-sm font-semibold"
            style={{ transitionDelay: "200ms" }}
          >
            <NextLink href="/projects">
              <a className="flex w-auto pb-4">
                {locale === "pt-BR" ? "Projetos" : "Projects"}
              </a>
            </NextLink>
          </li>
          <li
            className="border-b border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:text-neutral-500 hover:dark:text-neutral-500 text-sm font-semibold"
            style={{ transitionDelay: "250ms" }}
          >
            <NextLink href="/about">
              <a className="flex w-auto pb-4">
                {locale === "pt-BR" ? "Sobre" : "About"}
              </a>
            </NextLink>
          </li>
        </ul>
      )}
    </>
  );
}

function MenuIcon(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      className="h-5 w-5 absolute text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 hover:dark:text-neutral-100"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M2.5 7.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 12.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      className="h-5 w-5 absolute text-neutral-700 dark:text-neutral-300 hover:text-neutral-500 hover:dark:text-neutral-500"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

function NavItem({ href, text, locale }: any) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink
      href={href}
      locale={locale}
      className={cn(
        isActive
          ? "text-neutral-800 dark:text-neutral-200 hover:text-neutral-900 hover:dark:text-neutral-200"
          : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 hover:dark:text-neutral-300",
        "px-3.5 py-2.5 text-sm hidden md:flex rounded-lg transition-all"
      )}
    >
      <span className="capsize">{text}</span>
    </NextLink>
  );
}

export default function Navbar({ locale }: NavBarProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { query } = useKBar();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  return (
    <>
      <nav className="relative">
        <Container>
          <div className="flex items-center justify-between w-full py-7">
            <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
              <NextLink href="/" locale={locale}>
                rychillie
                <span className="text-fuchsia-500 dark:text-fuchsia-400">
                  .
                </span>
              </NextLink>
            </h1>

            <div className="flex flex-row gap-2 items-center justify-center">
              <button
                aria-label="Toggle Dark Mode"
                type="button"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-800 dark:text-neutral-400 hover:text-neutral-600 hover:dark:text-neutral-300 transition-all"
                onClick={query.toggle}
              >
                <MagnifyingGlassIcon className="w-4 h-4" />
              </button>
              <MobileMenu locale={locale === "pt-BR" ? "pt-BR" : "en-US"} />
              <NavItem href="/blog" text="Blog" />
              <NavItem
                href="/learn"
                text={locale === "pt-BR" ? "Cursos" : "Learn"}
                locale={locale}
              />
              <NavItem
                href="/projects"
                text={locale === "pt-BR" ? "Projetos" : "Projects"}
                locale={locale}
              />
              <NavItem
                href="/about"
                text={locale === "pt-BR" ? "Sobre" : "About"}
                locale={locale}
              />
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
}
