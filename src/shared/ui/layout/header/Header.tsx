import React, { useState } from "react";
import styles from "./header.module.scss";
import logo from "../../../../../public/mylogo.png";
import Image from "next/image";
import Container from "../../container/Container";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import github from "../../../../../public/images/githubW.svg";
import linkedin from "../../../../../public/images/socIcons/linkedin.webp";
import { useTranslations } from "next-intl";
import useMediaQuery from "@/shared/hooks/useMediaQuery";
import { Menu, X } from "lucide-react";

const Header = () => {
  const t = useTranslations();
  const isMobile = useMediaQuery("md");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Container>
      <div className={styles.header}>
       <div className={styles.topBlock}>
         <div className={styles.logo}>
          <Link href={"/developer"}>
            <Image src={logo} alt="Logo" className={styles.logoImage} />
          </Link>
        </div>
          {isMobile && <Link href="/blog">Blog</Link>}

       </div>
        {isMobile ? (
          <>
            <button onClick={toggleMenu} className={styles.burgerButton}>
              {isOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className={styles.mobileMenu}
                >
                  <nav className={styles.navLinks}>
                    <ScrollLink
                      to="bio"
                      smooth={true}
                      duration={500}
                      onClick={toggleMenu}
                    >
                      <p className={styles.about}>About</p>
                    </ScrollLink>
                    <ScrollLink
                      to="skills"
                      smooth={true}
                      duration={500}
                      onClick={toggleMenu}
                    >
                      <p>{t("skills")}</p>
                    </ScrollLink>
                    <ScrollLink
                      to="experience"
                      smooth={true}
                      duration={500}
                      onClick={toggleMenu}
                    >
                      <p>{t("experience")}</p>
                    </ScrollLink>
                    <ScrollLink
                      to="portfolio"
                      smooth={true}
                      duration={500}
                      onClick={toggleMenu}
                    >
                      <p>{t("portfolio")}</p>
                    </ScrollLink>
                    <ScrollLink
                      to="contact"
                      smooth={true}
                      duration={500}
                      onClick={toggleMenu}
                    >
                      <p>{t("contact")}</p>
                    </ScrollLink>
                  </nav>
                  <div className={styles.icons}>
                    <a
                      href="https://github.com/kenzy51"
                      target="_blank"
                      className={styles.link}
                    >
                      <Image alt="Github" src={github} width={30} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/kanat-nazar/"
                      target="_blank"
                      className={styles.link}
                    >
                      <Image alt="LinkedIn" src={linkedin} width={30} />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <div className={styles.info}>
            <nav className={styles.navLinks}>
              <ScrollLink to="bio" smooth={true} duration={500}>
                <p>about</p>
              </ScrollLink>
              <ScrollLink to="skills" smooth={true} duration={500}>
                <p>{t("skills")}</p>
              </ScrollLink>
              <ScrollLink to="experience" smooth={true} duration={500}>
                <p>{t("experience")}</p>
              </ScrollLink>
              <ScrollLink to="portfolio" smooth={true} duration={500}>
                <p>{t("portfolio")}</p>
              </ScrollLink>
              <ScrollLink to="contact" smooth={true} duration={500}>
                <p>{t("contact")}</p>
              </ScrollLink>
              <Link href="/blog">Blog</Link>
            </nav>
            <div className={styles.icons}>
              <a
                href="https://github.com/kenzy51"
                target="_blank"
                className={styles.link}
              >
                <Image alt="Github" src={github} width={30} />
              </a>
              <a
                href="https://www.linkedin.com/in/kanat-nazar"
                target="_blank"
                className={styles.link}
              >
                <Image alt="LinkedIn" src={linkedin} width={30} />
              </a>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Header;
