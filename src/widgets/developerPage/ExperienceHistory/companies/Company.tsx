import React, { useEffect } from "react";
import styles from "./company.module.scss";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const companiesData = [
  {
    title: "Senior Frontend Developer",
    company: "Agency Self Estate",
    duration: "January 2021 - September",
  },
  {
    title: "Middle Frontend Developer",
    company: "Agency Self Estate",
    duration: "January 2022 - September",
  },
  {
    title: "Junior Frontend Developer",
    company: "Agency Self Estate",
    duration: "January 2019 - September",
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
