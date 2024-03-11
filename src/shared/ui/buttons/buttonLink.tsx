import arrow from "../../../../public/icon/arrow.svg";
import React from "react";

import styles from "./styles.module.scss";
import Image from "next/image";
const ButtonLink = ({ link }: { link: string }) => {
  return (
    <button className={styles.wrapper}>
      <a href={link} target="_blank" className={styles.animatedBelow}>
        Visit
      </a>
      <Image src={arrow} alt="" className={styles.image} />
    </button>
  );
};

export default ButtonLink;
