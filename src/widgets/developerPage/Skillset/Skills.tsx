import Container from "@/shared/ui/container/Container";
import React from "react";

import styles from "./skills.module.scss";
import Image from "next/image";
import elips from "../../../../public/images/gradients/grad.png";
import { Slider } from "@/shared/ui/slider/Slider";
const Skills = () => {
  return (
    <div className={styles.wrapper} id="skills">
      <Container>
        <div className={styles.skill}>
          <h3>My </h3>
          <h4>Skillset</h4>
        </div>
      </Container>
      <Slider />
      <Image src={elips} className={styles.gradient} alt="" />
    </div>
  );
};

export default Skills;
