import React from "react";
import arrow from "../../../../public/icon/arrow.svg";

import styles from "./styles.module.scss";
import Image from "next/image";
import { Button } from "@/components/ui/button";
const ButtonLink = ({ link }: { link: string }) => {
  return (
    <Button className={styles.wrapper}>
      <a href={link} target="_blank" className={styles.animatedBelow}>
        Visit
      </a>
      <Image src={arrow} alt="" className={styles.image} />
    </Button>
  );
};

export default ButtonLink;
