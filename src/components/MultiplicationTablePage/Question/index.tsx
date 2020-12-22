import React from "react";
import styles from "./style.module.scss";
import TextView from "common/TextView";
import { AppStatus } from "../types/types";
import { AnswerStatus, QuestionStatus } from "./types";

const minMultiplicator = 1;
const maxMultiplicator = 10;

type Props = {
  answer: string;
  checkedTables: number[];
  appStatus: AppStatus;
  resetAnswer: (pressedKeys: string) => void;
};

export default function Question({
  answer,
  checkedTables,
  appStatus,
  resetAnswer,
}: Props) {
  const getStatus = (): QuestionStatus => {
    if (appStatus === "started") return answer ? "answered" : "notAnswered";
    return "idle";
  };

  const [text, setText] = React.useState<string>("");

  const leftNumber = React.useRef<number>(0);
  const rightNumber = React.useRef<number>(0);
  const newQuestion = React.useRef<string>("");
  const answerStatus = React.useRef<AnswerStatus>("idle");

  const status = getStatus();

  const randomMultiplicator = (): number =>
    Math.floor(Math.random() * maxMultiplicator) + minMultiplicator;

  React.useEffect(() => {
    const randomTable = (): number => {
      const randomIndex = Math.floor(Math.random() * checkedTables.length);
      return Number(checkedTables[randomIndex]);
    };

    if (status === "answered") {
      console.log("compare");
      const result = leftNumber.current * rightNumber.current;
      answerStatus.current = Number(answer) === result ? "correct" : "wrong";
      setText(`${text} = ${String(result)}`);
      setTimeout(
        () => {
          leftNumber.current = 0;
          rightNumber.current = 0;
          answerStatus.current = "idle";
          resetAnswer("");
        },
        answerStatus.current === "correct" ? 1500 : 4000
      );
    } else {
      leftNumber.current = randomTable();
      rightNumber.current = randomMultiplicator();
      newQuestion.current = `${leftNumber.current} x ${rightNumber.current}`;
      setText(newQuestion.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer, checkedTables, resetAnswer]);

  return (
    <div
      className={`${styles.Question} ${
        answerStatus.current === "idle"
          ? ""
          : answerStatus.current === "correct"
          ? styles.correct
          : styles.wrong
      }`}
    >
      <TextView text={appStatus === "started" ? text : ""} />
    </div>
  );
}
