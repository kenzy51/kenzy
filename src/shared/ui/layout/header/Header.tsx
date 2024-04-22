import React from "react";
import styled from "styled-components";
import styles from "./header.module.scss";
import logo from "../../../../../public/images/logo.png";
import Image from "next/image";
import Container from "../../container/Container";
import { Link } from "react-scroll";

import github from "../../../../../public/images/githubW.svg";
import linkedin from "../../../../../public/images/socIcons/linkedin.webp";
import { useTranslations } from "next-intl";
const Header = () => {
  const t = useTranslations();

  return (
    <Container>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image src={logo} alt="" className={styles.logoImage} />
        </div>
        <div className={styles.info}>
          <Link to="bio" smooth={true} duration={500}>
            <p>{t("bio")}</p>
          </Link>{" "}
          <Link to="skills" smooth={true} duration={500}>
            <p>{t("skills")}</p>
          </Link>
          <Link to="experience" smooth={true} duration={500}>
            <p>{t("experience")}</p>
          </Link>{" "}
          <Link to="portfolio" smooth={true} duration={500}>
            <p>{t("portfolio")}</p>
          </Link>{" "}
          <Link to="contact" smooth={true} duration={500}>
            <p>{t("contact")}</p>
          </Link>
          <div className={styles.icons}>
            <a
              href="https://github.com/kenzy51"
              target="_blank"
              className={styles.link}
            >
              <Image alt="" src={github} width={30} />
            </a>{" "}
            <a
              href="https://www.linkedin.com/in/kanat-nazarov-438baa247/"
              target="_blank"
              className={styles.link}
            >
              <Image alt="" src={linkedin} width={30} />
            </a>
          </div>{" "}
        </div>
      </div>
    </Container>
  );
};

export default Header;
