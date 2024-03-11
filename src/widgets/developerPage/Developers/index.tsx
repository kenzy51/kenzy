import Container from "@/shared/ui/container/Container";
import React from "react";
import styles from "./developer.module.scss";
import Image from "next/image";
import me from "../../../../public/images/non.png";

import { motion } from "framer-motion";
const Developer = () => {
  return (
    <div className={styles.wrapper} id="bio">
      <Container>
        <motion.div className={styles.about}>
          <motion.div
            className={styles.text}
            variants={{
              hidden: { opacity: 0, x: -80 },
              visible: {
                opacity: 1,
                x: 0,
                y: 0,
                transition: { duration: 0.8, delay: 0.1 },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: { duration: 0.2 },
                },
              }}
              initial="hidden"
              animate="visible"
            >
              Hello, world!
            </motion.h2>{" "}
            <h6>
              My name is Kanat, or just simply Kenzy. I’m a FullStack developer
              with more than 3 years experience from Central Asia. I bring new
              ideas to the code and implement any desire in vision!
            </h6>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 80 },
              visible: {
                opacity: 1,
                x: 0,
                y: 0,
                transition: { duration: 0.6, delay: 0.5 },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            <Image
              src={me}
              alt=""
              width={500}
              height={500}
              className={styles.avatar}
            />
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Developer;
