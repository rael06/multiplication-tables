import React from "react";
import styles from "./style.module.scss";
import TablesSelector from "./TablesSelector";
import Button from "common/Button";
import Keyboard from "common/Keyboard";
import Question from "./Question";

export default function MultiplicationTablePage() {
  const [checkedTables, setCheckedTables] = React.useState<number[]>([]);
  const [started, setStarted] = React.useState<boolean>(false);
  const [pressedKeys, setPressedKeys] = React.useState<string>("");

  const start = () => setStarted(true);
  const stop = () => setStarted(false);

  const updateCheckedTables = (checkedTables: number[]) => {
    if (!started) setCheckedTables(checkedTables);
  };

  const updatePressedKeys = (pressedKeys: string) =>
    setPressedKeys(pressedKeys);

  return (
    <div className={styles.MultiplicationTablePage}>
      <div className={styles.tablesSelector}>
        <TablesSelector
          putCheckedTables={updateCheckedTables}
          started={started}
        />
      </div>

      {!started ? (
        <div className={styles.startStopButton}>
          <Button onClick={start} disabled={checkedTables.length === 0}>
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
          started={started}
          resetAnswer={updatePressedKeys}
        />
      </div>

      <div className={styles.keyboard}>
        <Keyboard
          keys={["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]}
          onConfirm={updatePressedKeys}
          disabled={!started}
        />
      </div>
    </div>
  );
}
