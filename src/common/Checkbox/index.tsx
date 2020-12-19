import React, { MouseEvent } from "react";
import styles from "./style.module.scss";

type Props = {
  labelIdPrefix: string;
  labelText: string;
  value: unknown;
  initialChecked?: boolean;
  onCheck: (value: unknown) => void;
};

export default function Checkbox({
  labelIdPrefix,
  labelText,
  initialChecked = false,
  value,
  onCheck,
}: Props) {
  const [checked, setChecked] = React.useState(initialChecked);

  const id = `checkbox-${labelIdPrefix}-${labelText}`;

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setChecked(!checked);
    onCheck(value);
  };

  return (
    <div className={styles.Checkbox} onClick={handleClick}>
      <label htmlFor={id}>{labelText}</label>
      <input type="checkbox" id={id} defaultChecked={checked} />
    </div>
  );
}
