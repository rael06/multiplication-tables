import React from "react";
import styles from "./style.module.scss";
import Checkbox from "common/Checkbox";

const minTable = 2;
const maxTable = 9;

const tables: number[] = [];
for (let i = minTable; i < maxTable + 1; i++) {
  tables.push(i);
}

export default function TablesSelector() {
  const [checkedTables, setCheckedTables] = React.useState<number[]>([]);

  const isChecked = (table: number) => checkedTables.includes(table);
  const updateCheckedTables = (table: unknown): void => {
    isChecked(table as number)
      ? setCheckedTables(checkedTables.filter((t) => t !== table))
      : setCheckedTables([...checkedTables, table as number]);
  };

  return (
    <div className={styles.TablesSelector}>
      {tables.map((table) => (
        <div className={styles.table} key={table.toString()}>
          <Checkbox
            labelIdPrefix="table"
            labelText={table.toString()}
            value={table}
            onCheck={updateCheckedTables}
            initialChecked={isChecked(table)}
          />
        </div>
      ))}
    </div>
  );
}
