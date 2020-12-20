import React from "react";
import styles from "./style.module.scss";

type Props = {
  children: React.ReactChild;
  value?: unknown;
  onClick: (value?: unknown) => void;
  disabled?: boolean;
};

export default function Button({
  children,
  onClick,
  value,
  disabled = false,
}: Props) {
  return (
    <div
      className={`${styles.Button} ${disabled ? styles.disabled : ""}`}
      onClick={() => {
        if (!disabled) onClick(value);
      }}
    >
      {children}
    </div>
  );
}
