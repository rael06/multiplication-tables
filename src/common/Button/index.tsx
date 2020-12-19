import React from "react";
import styles from "./style.module.scss";

type Props = {
  children: React.ReactChild;
  onClick: () => void;
};

export default function Button({ children, onClick }: Props) {
  return (
    <div className={styles.Button} onClick={onClick}>
      {children}
    </div>
  );
}
