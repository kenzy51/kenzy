import Container from "@/shared/ui/container/Container";
import React from "react";
import styles from "./developer.module.scss";
import Image from "next/image";
import me from "./non.png";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import useMediaQuery from "@/shared/hooks/useMediaQuery";

const Developer = () => {
  const t = useTranslations();
  const isMobile = useMediaQuery("md");
  const imageSize = "auto";

  return (
    <div className={styles.wrapper} id="bio">
      <Container>
        <motion.div className={styles.about} initial="hidden" animate="visible">
          <motion.div
            className={styles.text}
            variants={{
              hidden: { opacity: 0, x: -80 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, delay: 0.1 },
              },
            }}
          >
            <br />
            <motion.h2
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
              }}
            >
              {t("hello")}
            </motion.h2>
            <h6 style={{fontSize:'21px'}}>{t("description")}</h6>
          </motion.div>

          <motion.div
            className={styles.imageWrapper}
            variants={{
              hidden: { opacity: 0, x: 80 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, delay: 0.5 },
              },
            }}
          >
            <Image
              src={me}
              alt="Developer"
              style={{ width: "100%" }}
              priority
            />
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Developer;
