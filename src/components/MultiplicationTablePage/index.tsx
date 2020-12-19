import React from "react";
import styles from "./style.module.scss";
import TablesSelector from "components/TablesSelector";
import Button from "common/Button";
import Keyboard from "common/Keyboard";

export default function MultiplicationTablePage() {
  const [started, setStarted] = React.useState<boolean>(false);

  const start = () => setStarted(true);
  const stop = () => setStarted(false);

  return (
    <div className={styles.MultiplicationTablePage}>
      <div className={styles.tablesSelector}>
        <TablesSelector />
      </div>
      {!started ? (
        <div className={styles.startStopButton}>
          <Button onClick={start}>Commencer</Button>
        </div>
      ) : (
        <div className={styles.startStopButton}>
          <Button onClick={stop}>Arrêter</Button>
        </div>
      )}
      <div className={styles.keyboard}>
        <Keyboard
          keys={["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]}
          onConfirm={(pressedKeys: string) => console.log(pressedKeys)}
        />
      </div>
    </div>
  );
}
