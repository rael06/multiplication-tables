import styles from "App.module.scss";
import Header from "common/Header";
import TablesSelector from "components/TablesSelector";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <TablesSelector />
    </div>
  );
}

export default App;
