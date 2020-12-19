import React from "react";
import styles from "App.module.scss";
import Header from "common/Header";
import MultiplicationTablePage from "components/MultiplicationTablePage";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <MultiplicationTablePage />
    </div>
  );
}

export default App;
