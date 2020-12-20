import React from "react";
import styles from "./style.module.scss";
import TablesSelector from "./TablesSelector";
import Button from "common/Button";
import Keyboard from "common/Keyboard";
import Question from "./Question";

export default function MultiplicationTablePage() {
  const [checkedTables, setCheckedTables] = React.useState<number[]>([]);
  const [isStarted, setIsStarted] = React.useState<boolean>(false);
  const [pressedKeys, setPressedKeys] = React.useState<string>("");

  const start = () => setIsStarted(true);
  const stop = () => setIsStarted(false);

  const updateCheckedTables = (checkedTables: number[]) => {
    if (!isStarted) setCheckedTables(checkedTables);
  };

  const updatePressedKeys = (pressedKeys: string) =>
    setPressedKeys(pressedKeys);

  return (
    <div className={styles.MultiplicationTablePage}>
      <div className={styles.tablesSelector}>
        <TablesSelector
          putCheckedTables={updateCheckedTables}
          isStarted={isStarted}
        />
      </div>

      {!isStarted ? (
        <div className={styles.startStopButton}>
          <Button onClick={start} isDisabled={checkedTables.length === 0}>
            Commencer
          </Button>
        </div>
      ) : (
        <div className={styles.startStopButton}>
          <Button onClick={stop}>Arrêter</Button>
        </div>
      )}

      <div className={styles.question}>
        <Question
          answer={pressedKeys}
          checkedTables={checkedTables}
          isStarted={isStarted}
          resetAnswer={updatePressedKeys}
        />
      </div>

      <div className={styles.keyboard}>
        <Keyboard
          keys={["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]}
          onConfirm={updatePressedKeys}
          isDisabled={!isStarted}
        />
      </div>
    </div>
  );
}
