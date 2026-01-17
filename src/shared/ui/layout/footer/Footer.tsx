import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./footer.module.scss";
import Container from "../../container/Container";
import { useInView } from "react-intersection-observer";
import git from "../../../../../public/images/githubW.svg";
import linkedin from "../../../../../public/images/socIcons/linkedin.webp";
import { Link } from "react-scroll";
import { useRouter } from "next/router";
import Image from "next/image";
import useMediaQuery from "@/shared/hooks/useMediaQuery";
const smallBlocksData = [
  {
    header: "Works",
    description:
      "Here's a curated selection showcasing my expertise and the achieved results.",
    link: "portfolio",
  },
  {
    header: "Skills",
    description:
      "Check out the things I'm good at, from building websites to design and more.",
    link: "skills",
  },
  {
    header: "Experience",
    description: "Look at my experience to know my qualification better.",
    link: "experience",
  },
];

const resume =
  "https://drive.google.com/file/d/1InOj7W1f1rj8ItFg0YT4uLcdUJAUHGnS/view?usp=sharing";

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const router = useRouter();

  useEffect(() => {
    if (inView) {
      console.log("Component is in view!");
    }
  }, [inView]);
  const isSmall = useMediaQuery("sm");
  return (
    <footer className={styles.wrapper} ref={ref} id="contact">
      <Container>
        <div className={styles.innerWrapper}>
          <div className={styles.connect}>
            <div
              className={
                isSmall
                  ? "flex w-[100%] flex-col justify-center items-center"
                  : "flex w-[100%] justify-evenly"
              }
            >
              <div>
                {" "}
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
                  Let's{" "}
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
                  Connect.{" "}
                </motion.h4>
              </div>

              {/* <LeadForm /> */}
            </div>
            <a href="mailto:nazarovkanat7@gmail.com" className={styles.email}>
              nazarovkanat7@gmail.com
            </a>

            <div className={styles.icons}>
              <a
                href="https://github.com/kenzy51"
                target="_blank"
                className={styles.link}
              >
                <Image alt="" src={git} width={30} />
              </a>{" "}
              <a
                href="https://www.linkedin.com/in/kanat-nazarov-a8b55533a/"
                target="_blank"
                className={styles.link}
              >
                <Image alt="" src={linkedin} width={30} />
              </a>
            </div>
            <div className={styles.bottom}>
              <p>Designed and Developed by Kanat Full Stack</p>
              <p>Powered by NextJs 14</p>
            </div>
          </div>
          <div className={styles.smallBlocks}>
            {smallBlocksData.map((block, index) => (
              <motion.div
                key={index}
                className={styles.small}
                variants={{
                  hidden: { opacity: 0, y: -50 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: { duration: 0.5, delay: 0.6 * index },
                  },
                }}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <Link to={block.link} smooth={true} duration={800}>
                  <h5 className={styles.header}>{block.header}</h5>
                </Link>
                <p>{block.description}</p>
              </motion.div>
            ))}
            <motion.div
              className={styles.small}
              variants={{
                hidden: { opacity: 0, y: -50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: { duration: 0.5, delay: 1.4 },
                },
              }}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <a href={resume} target="_blank">
                <h5 className={styles.header}>{"Resume"}</h5>
              </a>
              <p>You can check my CV to learn me better.</p>
            </motion.div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
