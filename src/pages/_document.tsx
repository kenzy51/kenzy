// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Core SEO */}
        <title>
          Kanat Nazarov | Full-Stack Developer & Software Engineer | NYC
        </title>
        <meta
          name="description"
          content="Kanat Nazarov — Senior Full-Stack Developer in New York City with 5+ years in Next.js, React, NestJS, TypeScript. Building scalable web apps and community platforms."
        />
        <meta
          name="keywords"
          content="Kanat Nazarov, full stack developer NYC, software engineer New York, frontend engineer NYC, Next.js developer, React developer, NestJS, Kyrgyz developer USA"
        />
        {/* Author & Robots */}
        <meta name="author" content="Kanat Nazarov" />
        <meta name="robots" content="index, follow" />
        {/* Open Graph — Social Sharing (LinkedIn, Facebook) */}
        <meta
          property="og:title"
          content="Kanat Nazarov | Full-Stack Developer NYC"
        />
        <meta
          property="og:description"
          content="Senior Full-Stack Developer in NYC specializing in Next.js, React, and NestJS. Built real-world apps including Kyrgyz diaspora platform."
        />
        <meta
          property="og:image"
          content="https://kenzy.vercel.app/og-image.jpg"
        />{" "}
        {/* Add this image */}
        <meta property="og:url" content="https://kenzy.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kanat Nazarov Portfolio" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Kanat Nazarov | Full-Stack Developer NYC"
        />
        <meta
          name="twitter:description"
          content="Full-Stack Developer in NYC | Next.js, React, NestJS"
        />
        <meta
          name="twitter:image"
          content="https://kenzy.vercel.app/og-image.jpg"
        />
        <meta
          name="google-site-verification"
          content="VgDRz5M8tNsT6gLPg4D6D7UmgkNA1AM2pqjnh70aX4k"
        />
        {/* Favicon */}
        <link rel="icon" href="/mylogo.png" />
        {/* Fonts & CSS (keep your existing) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@100;200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
        <link href="/output.css" rel="stylesheet" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
