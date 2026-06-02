import Layout from "@/shared/ui/layout";
import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { AppProgressBar } from "next-nprogress-bar";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import AnimatedCursor from "react-animated-cursor";
import Head from "next/head";
import localFont from "next/font/local";

const brandonGrotesque = localFont({
  src: [
    {
      path: "../../public/fonts/Brandon_Grotesque_regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Brandon_Grotesque_bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-brandon", // Exposed as standard CSS variable token
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const defaultTimeZone = "America/New_York";

  return (
    <main
      className={`${brandonGrotesque.className} ${brandonGrotesque.variable}`}
    >
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/* Primary Global SEO Data */}
        <title>
          Kanat Nazarov | Full-Stack Developer & Digital Growth Engineer
        </title>
        <meta
          name="description"
          content="Kanat Nazarov — Full-Stack Developer & Systems Architect operating at the intersection of high-performance web ecosystems, autonomous AI pipelines, and data-driven human performance."
        />
        <meta
          name="keywords"
          content="Kanat Nazarov, Kenzy, Full-Stack Developer NYC, Next.js developer, React 19 architect, NestJS engineer, AI Growth Engineer, Tribeca Dental Studio marketing, Fusion AI Agency, local SEO expert, technical SGE optimization"
        />
        <meta name="author" content="Kanat Nazarov" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/mylogo.png" />

        {/* Global Verification Identifiers */}
        <meta
          name="google-site-verification"
          content="VgDRz5M8tNsT6gLPg4D6D7UmgkNA1AM2pqjnh70aX4k"
        />

        {/* Core Open Graph Configuration Mappings */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kanat Nazarov Portfolio" />
        <meta property="og:locale" content="en_US" />
        <meta
          property="og:url"
          content={`https://kanatnazarov.vercel.app${router.asPath}`}
        />
        <meta
          property="og:title"
          content="Kanat Nazarov | Full-Stack Developer & AI Systems Engineer"
        />
        <meta
          property="og:description"
          content="Engineering enterprise SaaS platforms, autonomous AI voice streams, and high-performance frameworks fueled by data-driven life architecture."
        />
        <meta
          property="og:image"
          content="https://kanatnazarov.vercel.app/og-image.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Protocol Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Kanat Nazarov | Full-Stack Developer"
        />
        <meta
          name="twitter:description"
          content="Architecting ultra-low latency full-stack systems with Next.js, NestJS, and TypeScript."
        />
        <meta
          name="twitter:image"
          content="https://kanatnazarov.vercel.app/og-image.jpg"
        />
      </Head>

      <NextIntlClientProvider
        locale={router.locale}
        timeZone={defaultTimeZone}
        messages={pageProps.messages}
        onError={(error) => {
          if (error.code === "MISSING_MESSAGE") {
            console.warn(
              `[next-intl Build Warning] Missing translation key: ${error.message}`,
            );
          } else {
            console.error(error);
          }
        }}
        getMessageFallback={({ namespace, key }) => {
          return namespace ? `${namespace}.${key}` : key;
        }}
      >
        <AppProgressBar
          height="3px"
          color="#06b6d4"
          options={{ showSpinner: false }}
          shallowRouting
        />

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextIntlClientProvider>
    </main>
  );
}
