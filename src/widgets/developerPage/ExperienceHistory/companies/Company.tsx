import React, { useEffect } from "react";
import styles from "./company.module.scss";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const companiesData = [
  {
    title: "Full Stack Engineer",
    company: "Jal Group Asia",
    duration: "October 2023 - present ",
  },
  {
    title: "Software Engineer",
    company: "Sigma Software Solutions",
    duration: "September 2023 - present ",
  },
  {
    title: "Full Stack Developer",
    company: "DataXWay",
    duration: "Febrary 2023 - August 2023",
  },
  {
    title: "Full Stack Developer",
    company: "Discovery Studio",
    duration: "January 2022 - Febrary 2023",
  },
  {
    title: "Frontend Developer",
    company: "Discovery Studio",
    duration: "August 2020 - Febrary 2023",
  },
];

const Company = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      console.log("Component is in view!");
    }
  }, [inView]);
  return (
    <div ref={ref}>
      {companiesData.map((company, index) => (
        <motion.div
          className={styles.mainWrapper}
          key={index}
          variants={{
            hidden: { opacity: 0, y: -50 },
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: { duration: 0.4, delay: 0.5 * index },
            },
          }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className={styles.wrapper}>
            <div className={styles.leftBlock}>
              <h2>{company.title}</h2>
              <p>{company.company}</p>
            </div>
            <div className={styles.rightBlock}>{company.duration}</div>
          </div>
          <div className={styles.border}></div>
        </motion.div>
      ))}
    </div>
  );
};

export default Company;
