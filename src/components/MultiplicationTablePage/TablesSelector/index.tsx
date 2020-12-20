import React from "react";
import styles from "./style.module.scss";
import Checkbox from "common/Checkbox";

const minTable = 2;
const maxTable = 9;

const tables: number[] = [];
for (let i = minTable; i < maxTable + 1; i++) {
  tables.push(i);
}

type Props = {
  putCheckedTables: (checkedTables: number[]) => void;
  isStarted: boolean;
};

export default function TablesSelector({ putCheckedTables, isStarted }: Props) {
  const [checkedTables, setCheckedTables] = React.useState<number[]>([]);

  const isChecked = (table: number) => checkedTables.includes(table);

  const updateTables = (newCheckedTables: number[]) => {
    setCheckedTables(newCheckedTables);
    putCheckedTables(newCheckedTables);
  };

  const addTable = (table: number) => {
    const newCheckedTables = [...checkedTables, table];
    updateTables(newCheckedTables);
  };

  const removeTable = (table: number) => {
    const newCheckedTables = checkedTables.filter((t) => t !== table);
    updateTables(newCheckedTables);
  };

  const updateCheckedTables = (value: unknown): void => {
    const table = value as number;
    isChecked(table) ? removeTable(table) : addTable(table);
  };

  return (
    <div className={styles.TablesSelector}>
      {tables.map((table) => (
        <div className={styles.table} key={table.toString()}>
          <Checkbox
            isDisabled={isStarted}
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
