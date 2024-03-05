import React, { ReactNode } from "react";
import styles from "./container.module.scss";
const Container = ({ children }: any) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
