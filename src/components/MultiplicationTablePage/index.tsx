import React from "react";
import styles from "./style.module.scss";
import TablesSelector from "./TablesSelector";
import Button from "common/Button";
import Keyboard from "common/Keyboard";
import Question from "./Question";
import { AppStatus } from "./types/types";

export default function MultiplicationTablePage() {
  const [checkedTables, setCheckedTables] = React.useState<number[]>([]);
  const [pressedKeys, setPressedKeys] = React.useState<string>("");
  const [appStatus, setAppStatus] = React.useState<AppStatus>("idle");

  const updateCheckedTables = (checkedTables: number[]) => {
    if (appStatus !== "started") setCheckedTables(checkedTables);
  };

  const updatePressedKeys = (pressedKeys: string) =>
    setPressedKeys(pressedKeys);

  return (
    <div className={styles.MultiplicationTablePage}>
      <div className={styles.tablesSelector}>
        <TablesSelector
          putCheckedTables={updateCheckedTables}
          isStarted={appStatus === "started"}
        />
      </div>

      {appStatus !== "started" ? (
        <div className={styles.startStopButton}>
          <Button
            onClick={() => setAppStatus("started")}
            isDisabled={checkedTables.length === 0}
          >
            Commencer
          </Button>
        </div>
      ) : (
        <div className={styles.startStopButton}>
          <Button onClick={() => setAppStatus("stopped")}>Arrêter</Button>
        </div>
      )}

      <div className={styles.question}>
        <Question
          answer={pressedKeys}
          checkedTables={checkedTables}
          appStatus={appStatus}
          resetAnswer={updatePressedKeys}
        />
      </div>

      <div className={styles.keyboard}>
        <Keyboard
          keys={["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]}
          onConfirm={updatePressedKeys}
          isDisabled={appStatus !== "started"}
        />
      </div>
    </div>
  );
}
