import React from "react";
import styles from "./style.module.scss";
import Button from "common/Button";

type Props = {
  keys: string[];
  onConfirm: (pressedKeys: string) => void;
};

export default function Keyboard({ keys, onConfirm }: Props) {
  let pressedKeys: string = "";
  const addPressedKey = (value: unknown) => (pressedKeys += value as string);
  const deleteLastPressedKey = () =>
    (pressedKeys = pressedKeys.substring(0, pressedKeys.length - 1));

  const confirm = () => {
    onConfirm(pressedKeys);
    pressedKeys = "";
  };

  return (
    <div className={styles.Keyboard}>
      {keys.map((key) => (
        <div key={key} className={styles.key}>
          <Button onClick={(key) => addPressedKey(key)} value={key}>
            {key}
          </Button>
        </div>
      ))}
      <div className={styles.key}>
        <Button onClick={deleteLastPressedKey}>{"<-"}</Button>
      </div>
      <div className={`${styles.key} ${styles.ok}`}>
        <Button onClick={confirm}>Ok</Button>
      </div>
    </div>
  );
}
