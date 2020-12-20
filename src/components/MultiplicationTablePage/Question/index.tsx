import React from "react";
import styles from "./style.module.scss";
import TextView from "common/TextView";

const minMultiplicator = 1;
const maxMultiplicator = 10;

type Props = {
  answer: string;
  checkedTables: number[];
  isStarted: boolean;
  resetAnswer: (pressedKeys: string) => void;
};

export default function Question({
  answer,
  checkedTables,
  isStarted,
  resetAnswer,
}: Props) {
  const leftNumber = React.useRef<number>(0);
  const rightNumber = React.useRef<number>(0);
  const [text, setText] = React.useState<string>("");
  const [isCorrect, setIsCorrectAnswer] = React.useState<boolean>();

  const randomMultiplicator = (): number =>
    Math.floor(Math.random() * maxMultiplicator) + minMultiplicator;

  const newQuestion = `${leftNumber.current} x ${rightNumber.current}`;

  React.useEffect(() => {
    const randomTable = (): number => {
      const randomIndex = Math.floor(Math.random() * checkedTables.length);
      return Number(checkedTables[randomIndex]);
    };

    if (answer === "") {
      if (!leftNumber.current) leftNumber.current = randomTable();
      if (!rightNumber.current) rightNumber.current = randomMultiplicator();
      setText(newQuestion);
    } else {
      const result = leftNumber.current * rightNumber.current;
      const newIsCorrectAnswer = Number(answer) === result;
      setIsCorrectAnswer(newIsCorrectAnswer);
      setText(`${text} = ${String(result)}`);
      setTimeout(
        () => {
          leftNumber.current = 0;
          rightNumber.current = 0;
          resetAnswer("");
          setIsCorrectAnswer(undefined);
        },
        newIsCorrectAnswer ? 1500 : 4000
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer, checkedTables, newQuestion, resetAnswer]);

  return (
    <div
      className={`${styles.Question} ${
        isCorrect === undefined ? "" : isCorrect ? styles.correct : styles.wrong
      }`}
    >
      <TextView
        text={
          isStarted && !text.match(/NaN/i) && !text.match(/^0.*/) ? text : ""
        }
      />
    </div>
  );
}
