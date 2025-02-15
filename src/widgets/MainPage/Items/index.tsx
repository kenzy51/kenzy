import React from "react";
import { motion } from "framer-motion";
import styles from "./items.module.scss";
import Link from "next/link";
const Items = () => {
  const variants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, delay: 2 } },
  };

  const hoverVariants = {
    hover: {
      color: "#4e4e4e",
      transition: { type: "spring", duration: 0.6 },
    },
  };
  const kenzyDeveloperHoverVariants = {
    hover: {
      color: "#4e4e4e",
      transition: { type: "spring", duration: 0.6 },
    },
  };

  return (
    <div className={styles.main}>
      <div className={styles.inner}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          whileHover="hover"
          className={styles.item}
        >
          <motion.h5
            variants={kenzyDeveloperHoverVariants}
            className={styles.title}
          >
            <Link href="/developer">Kenzy Developer</Link>
          </motion.h5>
        </motion.div>

        <motion.div
          className={styles.item}
          initial="hidden"
          animate="visible"
          variants={{
            ...variants,
            visible: {
              ...variants.visible,
              transition: { ...variants.visible.transition, delay: 3.3 },
            },
          }}
          whileHover="hover" 
        >
          <motion.h5 variants={hoverVariants} className={styles.title}>
            <Link href="/musician">Kenzy Musician</Link>
          </motion.h5>
        </motion.div>
      </div>
    </div>
  );
};

export default Items;
