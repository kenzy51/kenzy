import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { AppProgressBar } from "next-nprogress-bar";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <NextIntlClientProvider
      locale={router.locale}
      timeZone="Europe/Vienna"
      messages={pageProps.messages}
    >
       <AppProgressBar
        height="4px"
        color="#ffffff"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}
