import Link from "next/link";
import cn from "classnames";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

type SectionListProps = {
  children: React.ReactNode;
  title: string;
  locale: string;
  isGrid?: boolean;
  link: string;
};

export default function SectionList({
  children,
  title,
  locale,
  isGrid,
  link,
}: SectionListProps) {
  return (
    <section className="flex flex-col py-10 md:py-20 gap-4 md:gap-8">
      <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
        {title}
      </h2>

      <div className={cn(isGrid ? "" : "flex-col", "flex gap-2 md:gap-6")}>
        {children}
      </div>

      <Link
        href={link}
        locale={locale}
        className="flex flex-row items-center justify-start w-auto text-sm font-medium gap-1 hover:gap-2 transition-all"
      >
        {locale === "pt-BR" ? "Ver mais" : "View more"}
        <ArrowRightIcon className="w-4 h-4" />
      </Link>
    </section>
  );
}
