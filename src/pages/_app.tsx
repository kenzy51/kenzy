import Layout from "@/shared/ui/layout";
import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { AppProgressBar } from "next-nprogress-bar";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import AnimatedCursor from "react-animated-cursor";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <NextIntlClientProvider
      locale={router.locale}
      timeZone="US"
      messages={pageProps.messages}
    >
        <AnimatedCursor
        innerSize={10}
        outerSize={30}
        color="255,255,255"
        outerAlpha={0.4}
        outerScale={0}
      />
      <Layout>
        <AppProgressBar
          height="4px"
          color="#ffffff"
          options={{ showSpinner: false }}
          shallowRouting
        />
        <Component {...pageProps} />
      </Layout>
    </NextIntlClientProvider>
  );
}
