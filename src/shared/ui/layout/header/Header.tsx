import React from "react";
import styled from "styled-components";
import styles from "./header.module.scss";
import logo from "../../../../../public/images/logo.png";
import Image from "next/image";
import Container from "../../container/Container";
import { Link } from "react-scroll";

import github from "../../../../../public/images/githubW.svg";
const Header = () => {
  return (
    <Container>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image src={logo} alt="" className={styles.logoImage} />
        </div>
        <div className={styles.info}>
          <p>Bio</p>
          <Link to="skills" smooth={true} duration={500}>
            <p>Skillset</p>
          </Link>
          <p>Portfolio</p>
          <p>Contact</p>
          <Image src={github} width={30} height={30} alt="" />
        </div>
      </div>
    </Container>
  );
};

export default Header;
