import React from "react";
import styles from "./style.module.scss";

type Props = {
  children: React.ReactChild;
  value?: unknown;
  onClick: (value?: unknown) => void;
  isDisabled?: boolean;
};

export default function Button({
  children,
  onClick,
  value,
  isDisabled = false,
}: Props) {
  return (
    <div
      className={`${styles.Button} ${isDisabled ? styles.disabled : ""}`}
      onClick={() => {
        if (!isDisabled) onClick(value);
      }}
    >
      {children}
    </div>
  );
}
