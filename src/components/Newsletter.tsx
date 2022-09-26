import { useState, useRef } from "react";
import Link from "next/link";
import useSWR from "swr";

import fetcher from "@lib/fetcher";
import { Form, FormState, Subscribers } from "@lib/types";
import Container from "@components/Container";

type NewsletterProps = {
  locale?: string;
};

function SuccessMessage({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex text-center w-full justify-center items-center text-sm font-bold text-green-700 dark:text-green-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="mr-2 h-4 w-4"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      {children}
    </p>
  );
}

function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex text-center w-full justify-center items-center text-sm font-bold text-red-800 dark:text-red-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="mr-2 h-4 w-4"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      {children}
    </p>
  );
}

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin text-center mx-auto justify-center h-5 w-5 text-gray-900 dark:text-gray-100"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export default function Newsletter({ locale }: NewsletterProps) {
  const [form, setForm] = useState<FormState>({ state: Form.Initial });
  const inputEl = useRef(null as any);
  const { data } = useSWR<Subscribers>("/api/subscribers", fetcher);
  const subscriberCount = new Number(data?.count);

  const subscribe = async (e: any) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    const email = inputEl.current.value;
    const res = await fetch(`/api/subscribe?email=${email}`, {
      method: "POST",
    });

    const { error } = await res.json();
    if (error) {
      setForm({
        state: Form.Error,
        message: error,
      });
      return;
    }

    inputEl.current.value = "";
    setForm({
      state: Form.Success,
      message:
        locale === "pt-BR"
          ? "Uhuu! Você está na lista."
          : `Hooray! You're now on the list.`,
    });
  };

  return (
    <section>
      <Container isLarge>
        <div className="flex gap-6 flex-col justify-center align-center border-y md:border md:rounded-2xl border-neutral-200 dark:border-neutral-800 p-6 md:p-12 md:mx-12">
          <div className="flex flex-col text-center gap-2">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
              Newsletter
            </h2>
            <p className="text-base font-normal text-neutral-500 dark:text-neutral-400">
              {locale === "pt-BR"
                ? "Receba e-mails sobre tecnologia, desenvolvimento e acesso antecipado a novos conteúdos."
                : "Receive emails about technology, development and early access to new content."}
            </p>
          </div>

          <form
            onSubmit={subscribe}
            className="relative flex flex-col md:flex-row w-full gap-3"
          >
            <input
              ref={inputEl}
              aria-label={
                locale === "pt-BR"
                  ? "Email para a newsletter"
                  : "Email for newsletter"
              }
              placeholder="tim@apple.com"
              type="email"
              autoComplete="email"
              required
              className="appearance-none border-2 w-full text-base font-semibold bg-white dark:bg-neutral-900 py-3 px-6 border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 hover:dark:border-neutral-700 rounded-lg placeholder:text-color-neutral-500 placeholder:dark:text-color-neutral-400 transition-all focus:outline-0 focus:ring-0 focus:border-neutral-400"
            />
            <button
              className="appearance-none border-2 w-full md:w-60 text-base font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-50 py-3 px-6 border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 hover:dark:border-neutral-700 rounded-lg cursor-pointer transition-all"
              type="submit"
            >
              {form.state === Form.Loading ? (
                <LoadingSpinner />
              ) : locale === "pt-BR" ? (
                "Inscreva-se"
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
          {form.state === Form.Error ? (
            <ErrorMessage>{form.message}</ErrorMessage>
          ) : form.state === Form.Success ? (
            <SuccessMessage>{form.message}</SuccessMessage>
          ) : (
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 text-center">
              {`${
                subscriberCount > 0 ? subscriberCount.toLocaleString() : "-"
              } ${locale === "pt-BR" ? "inscritos" : "subscribers"} – `}
              <a
                className="text-blue-500 dark:text-blue-400 hover:opacity-70 transition-opacity"
                href="https://www.getrevue.co/profile/rychillie"
                target="_blank"
                rel="noopener noreferrer"
              >
                {locale === "pt-BR" ? "Ver todas" : "View all"} issues
              </a>
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
