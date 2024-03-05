import Layout from "@/shared/ui/layout";
import React from "react";
import "@/styles/Home.module.css";
import Developer from "@/widgets/developerPage/Developers";
import Skills from "@/widgets/developerPage/Skillset/Skills";
import Expericene from "@/widgets/developerPage/ExperienceHistory/Experience";
import Cursor from "@/shared/ui/cursor/Cursor";
import AnimatedCursor from "react-animated-cursor";
import Example from "@/widgets/developerPage/Portfolio/Portfolio";
const index = () => {
  return (
    <>
      <Layout>
        <AnimatedCursor
          innerSize={10}
          outerSize={30}
          color="255,255,255        "
          outerAlpha={0.4}
          outerScale={0}
        />

        <Developer />
        <Skills />
        <Expericene />
      </Layout>
      <Example />
    </>
  );
};

export default index;
export async function getStaticProps(context: any) {
  return {
    props: {
      messages: (await import(`../../../messages/${context.locale}.json`))
        .default,
    },
  };
}
