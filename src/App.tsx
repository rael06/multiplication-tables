import styles from "App.module.scss";
import Header from "common/Header";
import TablesSelector from "components/TablesSelector";
import Button from "common/Button";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.tablesSelector}>
        <TablesSelector />
      </div>
      <div className={styles.startButton}>
        <Button>Commencer</Button>
      </div>
    </div>
  );
}

export default App;
