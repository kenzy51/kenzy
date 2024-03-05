import Layout from "@/shared/ui/layout";
import React from "react";
import "@/styles/Home.module.css";
import Developer from "@/widgets/developerPage/Developers";
import Skills from "@/widgets/developerPage/Skillset/Skills";
const index = () => {
  return (
    <Layout>
      <Developer />
      <Skills />
    </Layout>
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
