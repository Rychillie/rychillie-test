import Link from "next/link";

type ItemPostProps = {
  slug: string;
  locale?: string;
  title: string;
  description: string;
  extra?: string;
};

export default function ItemPost({
  slug,
  locale,
  title,
  extra,
  description,
}: ItemPostProps) {
  return (
    <Link
      href={slug}
      locale={locale}
      className="hover:opacity-60 transition-opacity flex flex-col gap-2"
    >
      <h3 className="text-base font-medium text-neutral-800 dark:text-neutral-100">
        {title}
      </h3>
      <p className="text-base font-normal text-neutral-500 dark:text-neutral-400">
        {description}
      </p>
      {extra && (
        <span className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
          {extra}
        </span>
      )}
    </Link>
  );
}
