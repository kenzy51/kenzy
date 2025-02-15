import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import styles from "./company.module.scss";

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
interface CompanyProps {
  title: string;
  company: string;
  duration: string;
  index: number;
}

const SingleCompany: React.FC<CompanyProps> = ({
  title,
  company,
  duration,
  index,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      console.log("Component is in view!");
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      className={styles.mainWrapper}
      key={index}
      variants={{
        hidden: { opacity: 0, y: -50 },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.4, delay: 0.01 * index },
        },
      }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className={styles.wrapper}>
        <div className={styles.leftBlock}>
          <h2>{title}</h2>
          <p>{company}</p>
        </div>
        <div className={styles.rightBlock}>{duration}</div>
      </div>
      <div className={styles.border}></div>
    </motion.div>
  );
};

const Company: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <div>
      {companiesData.map((company, index) => (
        <React.Fragment key={index}>
          {index === 0 ? (
            <SingleCompany
              title={company.title}
              company={company.company}
              duration={company.duration}
              index={index}
            />
          ) : (
            <motion.div
              ref={ref}
              className={styles.mainWrapper}
              key={index}
              variants={{
                hidden: { opacity: 0, y: -50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: { duration: 0.4, delay: 0.3 * index },
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
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Company;
