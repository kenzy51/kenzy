import Layout from "@/shared/ui/layout";
import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { AppProgressBar } from "next-nprogress-bar";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
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
  variable: "--font-brandon",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const defaultTimeZone = "America/New_York";
  
  // 🔒 Твой единый, главный продакшн-домен для склеивания зеркал в Google
  const productionDomain = "https://kanatnazarov.com"; 
  const currentPath = router.asPath === "/" ? "" : router.asPath;
  const fullCurrentUrl = `${productionDomain}${router.locale === 'en' ? '' : '/' + router.locale}${currentPath}`;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/* Дефолтный заголовок — сработает как безопасный щит, если внутренняя страница не успеет отдать свой */}
        <title>Kanat Nazarov | Growth Systems Engineer & Architect</title>
        <meta
          name="description"
          content="Kanat Nazarov — Systems Architect and Full-Stack Engineer operating at the intersection of high-performance web ecosystems, autonomous AI pipelines, and technical SEO."
        />
        <meta
          name="keywords"
          content="Kanat Nazarov, Kenzy, Full-Stack Developer NYC, Next.js developer, NestJS engineer, AI Growth Engineer, Tribeca Dental Studio, Fusion AI Agency, local SEO expert, technical SGE optimization"
        />
        <meta name="author" content="Kanat Nazarov" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta
          name="google-site-verification"
          content="VgDRz5M8tNsT6gLPg4D6D7UmgkNA1AM2pqjnh70aX4k"
        />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kanat Nazarov" />
        <meta property="og:locale" content={router.locale === "ru" ? "ru_RU" : "en_US"} />
        <meta property="og:url" content={fullCurrentUrl} />
        <meta
          property="og:title"
          content="Kanat Nazarov | Growth Systems Engineer"
        />
        <meta
          property="og:description"
          content="Engineering enterprise SaaS platforms, autonomous AI conversational engines, and high-performance frameworks."
        />
        <meta
          property="og:image"
          content={`${productionDomain}/og-image.jpg`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kanat Nazarov | Systems Architect" />
        <meta name="twitter:description" content="Architecting ultra-low latency full-stack systems with Next.js, NestJS, and TypeScript." />
        <meta name="twitter:image" content={`${productionDomain}/og-image.jpg`} />
      </Head>

      <NextIntlClientProvider
        locale={router.locale}
        timeZone={defaultTimeZone}
        messages={pageProps.messages}
        onError={(error) => {
          if (error.code === "MISSING_MESSAGE") {
            console.warn(`[next-intl Build Warning] Missing translation key: ${error.message}`);
          } else {
            console.error(error);
          }
        }}
        getMessageFallback={({ namespace, key }) => namespace ? `${namespace}.${key}` : key}
      >
        <AppProgressBar
          height="3px"
          color="#06b6d4"
          options={{ showSpinner: false }}
          shallowRouting
        />

        <main className={`${brandonGrotesque.className} ${brandonGrotesque.variable} antialiased`}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </NextIntlClientProvider>
    </>
  );
}
