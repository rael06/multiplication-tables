import React from "react";
import styles from "./style.module.scss";

type Props = {
  children: React.ReactChild;
};

export default function Button({ children }: Props) {
  return <div className={styles.Button}>{children}</div>;
}
