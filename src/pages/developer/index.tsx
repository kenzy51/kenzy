import Layout from "@/shared/ui/layout";
import React, { useState } from "react";
import "@/styles/Home.module.css";
import Developer from "@/widgets/developerPage/Developers";
import Skills from "@/widgets/developerPage/Skillset/Skills";
import Experience from "@/widgets/developerPage/ExperienceHistory/Experience";
import AnimatedCursor from "react-animated-cursor";
import Portfolio from "@/widgets/developerPage/Portfolio/Portfolio";
import Footer from "@/shared/ui/layout/footer/Footer";

const Index = () => {
  return (
    <>
    
      <Developer />
      <Skills />
      <Experience />
      <Portfolio />
      <Footer />
    </>
  );
};

export default Index;

export async function getStaticProps(context: any) {
  return {
    props: {
      messages: (await import(`../../../messages/${context.locale}`)).default,
    },
  };
}
