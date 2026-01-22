import Container from "@/shared/ui/container/Container";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./skills.module.scss";
import Image from "next/image";
import elips from "../../../../public/images/gradients/grad.png";
import { Slider } from "@/shared/ui/slider/Slider";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";
import useMediaQuery from "@/shared/hooks/useMediaQuery";
import {
  buttonClassNameStyle,
  buttonClassNameStyleActive,
} from "@/shared/ui/components/ClassNamesStyles";
const Skills = () => {
  const [categories, setCategories] = useState<"frontend" | "all" | "backend">(
    "all"
  );
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      console.log("Component is in view!");
    }
  }, [inView]);
  const t = useTranslations();
  const isTablet = useMediaQuery("md");

  return (
    <div className={styles.wrapper} id="skills">
      <Container>
        <div className={styles.skill} ref={ref}>
          <motion.h4
            style={{ fontSize: isTablet ? "36px" : "66px", fontWeight: "800" }}
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
            my skills.
          </motion.h4>
          <i>swipe to see</i>
        </div>
        <div className="flex max-w-[100%] justify-center gap-5">
          {["all", "frontend", "backend"].map((item) => (
            <button
              className={
                categories === item
                  ? buttonClassNameStyleActive
                  : buttonClassNameStyle
              }
              // @ts-ignore
              onClick={() => setCategories(item)}
            >
              <strong>{item.toUpperCase()}</strong>{" "}
            </button>
          ))}
        </div>
        <br />
      </Container>

      <Slider status={categories} />
      <Image src={elips} className={styles.gradient} alt="" />
    </div>
  );
};

export default Skills;
