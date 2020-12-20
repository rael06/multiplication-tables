import React from "react";
import styles from "./style.module.scss";
import Button from "common/Button";
import TextView from "common/TextView";

type Props = {
  keys: string[];
  onConfirm: (pressedKeys: string) => void;
  disabled?: boolean;
};

export default function Keyboard({ keys, onConfirm, disabled = false }: Props) {
  const [pressedKeys, setPressedKeys] = React.useState<string>("");

  const addPressedKey = (value: unknown) =>
    setPressedKeys(pressedKeys + (value as string));

  const deleteLastPressedKey = () =>
    setPressedKeys(pressedKeys.substring(0, pressedKeys.length - 1));

  const confirm = () => {
    onConfirm(pressedKeys);
    setPressedKeys("");
  };

  return (
    <div className={styles.Keyboard}>
      <div className={styles.pressedKeysTextView}>
        <TextView text={pressedKeys} />
      </div>

      <div className={styles.keys}>
        {keys.map((key) => (
          <div key={key} className={styles.key}>
            <Button
              onClick={(key) => addPressedKey(key)}
              value={key}
              disabled={disabled}
            >
              {key}
            </Button>
          </div>
        ))}

        <div className={styles.key}>
          <Button onClick={deleteLastPressedKey} disabled={disabled}>
            {"<-"}
          </Button>
        </div>

        <div className={`${styles.key} ${disabled ? "" : styles.ok}`}>
          <Button onClick={confirm} disabled={disabled}>
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
}
