import React from "react";
import styles from "./style.module.scss";

type Props = {
  children: React.ReactChild;
  value?: unknown;
  onClick: (value?: unknown) => void;
};

export default function Button({ children, onClick, value }: Props) {
  return (
    <div className={styles.Button} onClick={() => onClick(value)}>
      {children}
    </div>
  );
}
