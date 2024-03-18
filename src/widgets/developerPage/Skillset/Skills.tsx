import Container from "@/shared/ui/container/Container";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./skills.module.scss";
import Image from "next/image";
import elips from "../../../../public/images/gradients/grad.png";
import { Slider } from "@/shared/ui/slider/Slider";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";
const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      console.log("Component is in view!");
    }
  }, [inView]);
  const t = useTranslations();

  return (
    <div className={styles.wrapper} id="skills">
      <Container>
        <div className={styles.skill} ref={ref}>
          <motion.h3
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: {
                opacity: 1,
                x: 0,
                y: 0,
                transition: { duration: 0.5, delay: 0.5 },
              },
            }}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {t("my2")}{" "}
          </motion.h3>
          <motion.h4
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: {
                opacity: 1,
                x: 0,
                y: 0,
                transition: { duration: 0.3, delay: 0.8 },
              },
            }}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {t("skills")}
          </motion.h4>
        </div>
      </Container>
      <Slider />
      <Image src={elips} className={styles.gradient} alt="" />
    </div>
  );
};

export default Skills;
