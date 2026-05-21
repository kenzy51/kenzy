// components/Header.tsx
import React from "react";
import styles from "./header.module.scss";
import logo from "../../../../../public/mylogo.png";
import Image from "next/image";
import Container from "../../container/Container";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";
import { useRouter } from "next/router";
import github from "../../../../../public/images/githubW.svg";
import linkedin from "../../../../../public/images/socIcons/linkedin.webp";
import { useTranslations } from "next-intl";

const Header = () => {
  const t = useTranslations();
  const router = useRouter();
  const isBlogRoute = router.pathname.startsWith("/blog");

  return (
    <>
      {/* TOP NAVBAR: Logo & Sticked Blog Button Only */}
      {/* Your premium font automatically injects via styles.headerWrapper config */}
      <header
        className={styles.headerWrapper}
        style={{ fontFamily: "var(--font-brandon), sans-serif" }}
      >
        <Container>
          <div className={styles.header}>
            <div className={styles.logo}>
              <Link href="/developer">
                <Image
                  src={logo}
                  alt="Logo"
                  className={styles.logoImage}
                  priority
                />
              </Link>
            </div>

            <nav className={styles.topNav}>
              <Link
                href="/blog"
                className={`${styles.blogTab} ${isBlogRoute ? styles.blogTabActive : ""}`}
              >
                Blog
              </Link>
            </nav>
          </div>
        </Container>
      </header>

      {/* RIGHT SIDEBAR: Fixed vertical index links (Hidden on Blog paths) */}
      {/* Your scroll tabs and tracking icons inherit font rules seamlessly here */}
      {!isBlogRoute && (
        <aside className={styles.rightSidebar}>
          <nav className={styles.sidebarLinks}>
            <ScrollLink
              to="bio"
              smooth={true}
              duration={500}
              spy={true}
              activeClass={styles.activeAnchor}
            >
              <span>about</span>
            </ScrollLink>
            <ScrollLink
              to="skills"
              smooth={true}
              duration={500}
              spy={true}
              activeClass={styles.activeAnchor}
            >
              <span>{t("skills")}</span>
            </ScrollLink>
            <ScrollLink
              to="experience"
              smooth={true}
              duration={500}
              spy={true}
              activeClass={styles.activeAnchor}
            >
              <span>{t("experience")}</span>
            </ScrollLink>
            <ScrollLink
              to="portfolio"
              smooth={true}
              duration={500}
              spy={true}
              activeClass={styles.activeAnchor}
            >
              <span>{t("portfolio")}</span>
            </ScrollLink>
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              spy={true}
              activeClass={styles.activeAnchor}
            >
              <span>{t("contact")}</span>
            </ScrollLink>
          </nav>

          {/* Social Media Anchors at the bottom of the sidebar list */}
          <div className={styles.sidebarSocials}>
            <a
              href="https://github.com/kenzy51"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image alt="Github" src={github} width={18} height={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/kanat-nazar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image alt="LinkedIn" src={linkedin} width={18} height={18} />
            </a>
          </div>
        </aside>
      )}
    </>
  );
};

export default Header;
