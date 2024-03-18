import Layout from "@/shared/ui/layout";
import React, { useState } from "react";
import "@/styles/Home.module.css";
import Developer from "@/widgets/developerPage/Developers";
import Skills from "@/widgets/developerPage/Skillset/Skills";
import Experience from "@/widgets/developerPage/ExperienceHistory/Experience";
import Cursor from "@/shared/ui/cursor/Cursor";
import AnimatedCursor from "react-animated-cursor";
import Portfolio from "@/widgets/developerPage/Portfolio/Portfolio";
import Footer from "@/shared/ui/layout/footer/Footer";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";
import Container from "@/shared/ui/container/Container";

import { motion } from "framer-motion";
const GreetingPage = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const handleLanguageChange = (locale: string) => {
    onClose();
    router.push("/developer", undefined, { locale });
  };

  return (
    <Container>
      <AnimatedCursor
        innerSize={10}
        outerSize={30}
        color="255,255,255"
        outerAlpha={0.4}
        outerScale={0}
      />
      <div className={styles.wrapper}>
        <div className={styles.titles}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1>Hello, World!</h1>
            <p>Please select your preferred language:</p>
          </motion.div>{" "}
          {/* division */}
          <motion.div
            className={styles.ru}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h1>Привет, Мир! </h1>
            <p>Выберите предпочитаемый язык:</p>
          </motion.div>
        </div>
        <div className={styles.langs}>
          <motion.button
            onClick={() => handleLanguageChange("en")}
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -150 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            English
          </motion.button>
          <motion.button
            onClick={() => handleLanguageChange("ru")}
            initial={{ opacity: 0, x: 150 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 150 }}
            transition={{ duration: 0.7, delay: 1.2 }}
          >
            Русский
          </motion.button>
        </div>
      </div>
    </Container>
  );
};

const Index = () => {
  const [showGreetingPage, setShowGreetingPage] = useState(true);
  const router = useRouter();

  const handleCloseGreetingPage = () => {
    setShowGreetingPage(false);
  };

  if (showGreetingPage) {
    return <GreetingPage onClose={handleCloseGreetingPage} />;
  }

  return (
    <>
      <Layout>
        <AnimatedCursor
          innerSize={10}
          outerSize={30}
          color="255,255,255"
          outerAlpha={0.4}
          outerScale={0}
        />
        <Developer />
        <Skills />
        <Experience />
      </Layout>
      <Portfolio />
      <Footer />
    </>
  );
};

export default Index;

export async function getStaticProps(context: any) {
  return {
    props: {
      messages: (await import(`../../../messages/${context.locale}`))
        .default,
    },
  };
}
