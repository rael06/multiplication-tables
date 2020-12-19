import React from "react";
import styles from "./style.module.scss";
import TablesSelector from "components/TablesSelector";
import Button from "common/Button";

export default function MultiplicationTablePage() {
  const [started, setStarted] = React.useState(false);

  return (
    <div className={styles.MultiplicationTablePage}>
      <div className={styles.tablesSelector}>
        <TablesSelector />
      </div>
      <div className={styles.startButton}>
        <Button>Commencer</Button>
      </div>
    </div>
  );
}
