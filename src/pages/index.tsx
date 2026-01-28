// pages/index.tsx or app/page.tsx (depending on your structure)
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Items from "@/widgets/MainPage/Items";
import Greeting from "@/widgets/MainPage/Greeting";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(()=>{

  })
  const t = useTranslations();

  return (
    <>
      <Head>
        <title>
          Kanat Nazarov |  Full-Stack Developer & Software Engineer 
        </title>
        <meta
          name="google-site-verification"
          content="VgDRz5M8tNsT6gLPg4D6D7UmgkNA1AM2pqjnh70aX4k"
        />
        <meta
          name="description"
          content="Kanat Nazarov — Full-Stack Developer with 5+ years experience in Next.js, React, NestJS, and MongoDB/Redis. Building scalable web applications and community platforms."
        />
        <meta
          name="keywords"
        />
        <meta
          property="og:title"
          content="Kanat Nazarov | Full-Stack Developer "
        />
        <meta
          property="og:description"
          content="Experienced full-stack developer specializing in Next.js, React, and NestJS. Built real-world applications including a Kyrgyz diaspora community platform."
        />
        <meta
          property="og:image"
          content="https://kenzy.vercel.app/og-image.jpg"
        />{" "}
        {/* Add this image later */}
        <meta property="og:url" content="https://kenzy.vercel.app" />
        <meta property="og:type" content="website" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Kanat Nazarov | Full-Stack Developer"
        />
        <meta
          name="twitter:description"
          content="Full-stack developer building modern web apps with Next.js and NestJS."
        />
        {/* Viewport & Favicon */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/mylogo.png" />
        {/* Google Site Verification (keep if you have it) */}
        <meta
          name="google-site-verification"
          content="VgDRz5M8tNsT6gLPg4D6D7UmgkNA1AM2pqjnh70aX4k"
        />
      </Head>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.3 }}
        className={styles.main}
      >
        <div className={styles.innerBlock}>
          <Greeting />
          <br />
          <Items />
        </div>
      </motion.main>
    </>
  );
}
