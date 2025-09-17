import React, { useState } from "react";
import styles from "./header.module.scss";
import logo from "../../../../../public/images/logo.png";
import Image from "next/image";
import Container from "../../container/Container";
import { Link } from "react-scroll";
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
        <div className={styles.logo}>
          <Image src={logo} alt="Logo" className={styles.logoImage} />
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
                    <Link to="bio" smooth={true} duration={500} onClick={toggleMenu}><p>{t("bio")}</p></Link>
                    <Link to="skills" smooth={true} duration={500} onClick={toggleMenu}><p>{t("skills")}</p></Link>
                    <Link to="experience" smooth={true} duration={500} onClick={toggleMenu}><p>{t("experience")}</p></Link>
                    <Link to="portfolio" smooth={true} duration={500} onClick={toggleMenu}><p>{t("portfolio")}</p></Link>
                    <Link to="contact" smooth={true} duration={500} onClick={toggleMenu}><p>{t("contact")}</p></Link>
                  </nav>
                  {/* SOME CODE to commit*/}
                  <div className={styles.icons}>
                    <a href="https://github.com/kenzy51" target="_blank" className={styles.link}><Image alt="Github" src={github} width={30} /></a>
                    <a href="https://www.linkedin.com/in/kanat-nazar-a8b55533a/" target="_blank" className={styles.link}><Image alt="LinkedIn" src={linkedin} width={30} /></a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
           <div className={styles.info}>
            <nav className={styles.navLinks}>
              <Link to="bio" smooth={true} duration={500}><p>{t("bio")}</p></Link>
              <Link to="skills" smooth={true} duration={500}><p>{t("skills")}</p></Link>
              <Link to="experience" smooth={true} duration={500}><p>{t("experience")}</p></Link>
              <Link to="portfolio" smooth={true} duration={500}><p>{t("portfolio")}</p></Link>
              <Link to="contact" smooth={true} duration={500}><p>{t("contact")}</p></Link>
            </nav>
            <div className={styles.icons}>
              <a href="https://github.com/kenzy51" target="_blank" className={styles.link}><Image alt="Github" src={github} width={30} /></a>
              <a href="https://www.linkedin.com/in/kanat-nazarov-438baa247/" target="_blank" className={styles.link}><Image alt="LinkedIn" src={linkedin} width={30} /></a>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Header;
