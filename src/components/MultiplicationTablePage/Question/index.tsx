import React from "react";
import styles from "./style.module.scss";
import TextView from "common/TextView";

const minMultiplicator = 1;
const maxMultiplicator = 10;

type Props = {
  answer: string;
  checkedTables: number[];
  started: boolean;
};

export default function Question({ answer, checkedTables, started }: Props) {
  const randomTable = (): number => {
    const randomIndex = Math.floor(Math.random() * checkedTables.length);
    return Number(checkedTables[randomIndex]);
  };

  const randomMultiplicator = (): number =>
    Math.floor(Math.random() * maxMultiplicator) + minMultiplicator;

  let leftNumber: number;
  let rightNumber: number;

  const onRightAnswer = () => {
    console.log("bravo");
  };

  const onWrongAnswer = (answer: string, result: string) => {
    console.log(
      `Ta réponse : ${answer} est fausse, la bonne réponse est : ${result}`
    );
  };

  React.useEffect(() => {
    if (answer !== "") {
      const result = leftNumber * rightNumber;
      Number(answer) === result
        ? onRightAnswer()
        : onWrongAnswer(answer, String(result));
      // eslint-disable-next-line react-hooks/exhaustive-deps
      leftNumber = randomTable();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      rightNumber = randomMultiplicator();
    }
  }, [answer]);

  return (
    <div className={styles.Question}>
      <TextView text={started ? `${leftNumber} x ${rightNumber}` : ""} />
    </div>
  );
}
