import React from "react";
import styles from "./style.module.scss";

type Props = {
  labelIdPrefix: string;
  labelText: string;
  value: unknown;
  initialChecked?: boolean;
  onCheck: (value: unknown) => void;
  disabled?: boolean;
};

export default function Checkbox({
  labelIdPrefix,
  labelText,
  initialChecked = false,
  value,
  onCheck,
  disabled = false,
}: Props) {
  const [checked, setChecked] = React.useState(initialChecked);

  const id = `checkbox-${labelIdPrefix}-${labelText}`;

  const handleClick = () => {
    setChecked(!checked);
    onCheck(value);
  };

  return (
    <div
      className={`${styles.Checkbox} ${disabled ? styles.disabled : ""}`}
      onClick={() => {
        if (!disabled) handleClick();
      }}
    >
      <span>{labelText}</span>
      <input type="checkbox" id={id} checked={checked} onChange={() => {}} />
    </div>
  );
}
