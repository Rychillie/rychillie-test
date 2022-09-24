import { useState, useEffect } from "react";
import { useKBar } from "kbar";

type Props = {
  locale?: string | undefined;
};

const content = {
  "en-US": {
    isMbl: "Press to start →",
    isDkt: {
      press: "Press",
      toStart: "to start →",
    },
  },
  "pt-BR": {
    isMbl: "Pressione para começar →",
    isDkt: {
      press: "Pressione",
      toStart: "para começar →",
    },
  },
};

export default function Shortcut({ locale }: Props) {
  const { query } = useKBar();
  const [mounted, setMounted] = useState(false);
  const localeContent = locale === "pt-BR" ? "pt-BR" : "en-US";
  const { isMbl, isDkt } = content[localeContent];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    const isMac = /(Mac)/i.test(navigator.userAgent);
    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

    if (isMobile) {
      return (
        <button
          className="flex flex-row gap-1 apparence-none text-base font-semibold text-neutral-500 dark:text-neutral-400"
          onClick={query.toggle}
        >
          {isMbl}
        </button>
      );
    } else if (isMac) {
      return (
        <button
          className="flex flex-row gap-1 apparence-none text-base font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 hover:dark:text-neutral-200"
          onClick={query.toggle}
        >
          {isDkt.press}{" "}
          <kbd className="w-5 h-6 flex rounded items-center justify-center bg-neutral-100 dark:bg-neutral-800">
            ⌘
          </kbd>{" "}
          <kbd className="w-5 h-6 flex rounded items-center justify-center bg-neutral-100 dark:bg-neutral-800">
            K
          </kbd>{" "}
          {isDkt.toStart}
        </button>
      );
    } else {
      return (
        <button
          className="flex flex-row gap-1 apparence-none text-base font-semibold text-neutral-500 dark:text-neutral-400"
          onClick={query.toggle}
        >
          {isDkt.press}{" "}
          <kbd className="w-5 h-6 flex rounded items-center justify-center bg-neutral-100 dark:bg-neutral-800">
            ctrl
          </kbd>{" "}
          <kbd className="w-5 h-6 flex rounded items-center justify-center bg-neutral-100 dark:bg-neutral-800">
            K
          </kbd>{" "}
          {isDkt.toStart}
        </button>
      );
    }
  }

  return <div />;
}
