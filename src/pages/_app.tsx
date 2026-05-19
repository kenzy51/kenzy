import Layout from "@/shared/ui/layout";
import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { AppProgressBar } from "next-nprogress-bar";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import AnimatedCursor from "react-animated-cursor";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Set accurate time zones for Eastern Standard environments
  const defaultTimeZone = "America/New_York";

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/* Primary Global SEO Standby Data */}
        <title>
          Kanat Nazarov | Senior Full-Stack Developer & AI Systems Engineer
        </title>
        <meta
          name="description"
          content="Kanat Nazarov — Senior Full-Stack Developer & Systems Architect based in NYC. Specializing in high-performance Next.js architectures, NestJS frameworks, and autonomous conversational AI pipelines."
        />
        <meta
          name="keywords"
          content="Kanat Nazarov, Kenzy, Senior Full-Stack Developer NYC, Next.js developer, React 19 architect, NestJS engineer, AI Growth Engineer, Tribeca Dental Studio marketing, Fusion AI Agency, local SEO expert, technical SGE optimization"
        />
        <meta name="author" content="Kanat Nazarov" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/mylogo.png" />

        {/* Global Verification Asset Identifiers */}
        <meta
          name="google-site-verification"
          content="VgDRz5M8tNsT6gLPg4D6D7UmgkNA1AM2pqjnh70aX4k"
        />

        {/* Core Fallback Open Graph Configuration Mappings */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kanat Nazarov Portfolio" />
        <meta property="og:locale" content="en_US" />
        <meta
          property="og:url"
          content={`https://kanatnazarov.vercel.app${router.asPath}`}
        />
        <meta
          property="og:title"
          content="Kanat Nazarov | Senior Full-Stack Developer & AI Systems Engineer"
        />
        <meta
          property="og:description"
          content="Engineering enterprise SaaS platforms, high-performance web applications, and autonomous AI conversational engines."
        />
        <meta
          property="og:image"
          content="https://kanatnazarov.vercel.app/og-image.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Global Twitter Card Protocol Schema */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Kanat Nazarov | Senior Full-Stack Developer"
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
        // 1. Prevents missing keys or loading gaps from crashing the Vercel builder
        onError={(error) => {
          if (error.code === "MISSING_MESSAGE") {
            console.warn(
              `[next-intl Build Warning] Missing translation key: ${error.message}`,
            );
          } else {
            console.error(error);
          }
        }}
        // 2. Fallback strategy: If a key is missing during static page generation,
        // it renders the raw string path instead of breaking the pipeline.
        getMessageFallback={({ namespace, key }) => {
          return namespace ? `${namespace}.${key}` : key;
        }}
      >
        {/* Modern low-latency subtle user pointer tracking ring layout */}
        <AnimatedCursor
          innerSize={8}
          outerSize={24}
          color="255, 255, 255"
          outerAlpha={0.15}
          innerScale={0.7}
          outerScale={1.4}
          clickables={[
            "a",
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            "label[for]",
            "select",
            "textarea",
            "button",
            ".cursor-pointer",
          ]}
        />

        <Layout>
          <AppProgressBar
            height="3px"
            color="#06b6d4" // Swapped to active custom cyan matching theme palette glowing rules
            options={{ showSpinner: false }}
            shallowRouting
          />
          <Component {...pageProps} />
        </Layout>
      </NextIntlClientProvider>
    </>
  );
}
