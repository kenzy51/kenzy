import Container from "@/shared/ui/container/Container";
import React from "react";
import styles from "./developer.module.scss";
import Image from "next/image";
import me from "../../../../public/images/non.png";
const Developer = () => {
  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.about}>
          <div className={styles.text}>
            <h2>Hello, world!</h2>{" "}
            <h6>
              My name is Kanat, or just simply Kenzy. I’m a FullStack developer from
              Central Asia. I bring new ideas to the code and implement any desire in vision!
            </h6>
          </div>
          <div>
            <Image
              src={me}
              alt=""
              width={500}
              height={500}
              className={styles.avatar}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Developer;
