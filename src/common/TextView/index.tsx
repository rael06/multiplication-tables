import React from "react";
import styles from "./style.module.scss";

type Props = {
  text: string;
};

export default function TextView({ text }: Props) {
  return <span className={styles.TextView}>{text}</span>;
}
