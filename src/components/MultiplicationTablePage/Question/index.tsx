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
  const numberOfAnswers = React.useRef<number>(0);
  const numberOfCorrectAnswers = React.useRef<number>(0);

  const leftNumber = React.useRef<number>(0);
  const rightNumber = React.useRef<number>(0);
  const newQuestion = React.useRef<string>("");
  const answerStatus = React.useRef<AnswerStatus>("idle");

  const status = getStatus();

  const randomMultiplicator = (): number =>
    Math.floor(Math.random() * maxMultiplicator) + minMultiplicator;

  const randomTable = (): number => {
    const randomIndex = Math.floor(Math.random() * checkedTables.length);
    return Number(checkedTables[randomIndex]);
  };

  React.useEffect(() => {
    if (appStatus === "idle") {
      numberOfCorrectAnswers.current = 0;
      numberOfAnswers.current = 0;
      answerStatus.current = "idle";
    }

    if (appStatus === "stopped") {
      if (numberOfAnswers.current > 0) {
        answerStatus.current =
          numberOfCorrectAnswers.current >= numberOfAnswers.current * 0.8
            ? "correct"
            : "wrong";
        setText(
          `Ta note est : ${numberOfCorrectAnswers.current} sur ${numberOfAnswers.current}`
        );
      } else {
        setText("");
      }
    }

    if (status === "answered") {
      const result = leftNumber.current * rightNumber.current;
      answerStatus.current = Number(answer) === result ? "correct" : "wrong";
      if (answerStatus.current === "correct") numberOfCorrectAnswers.current++;
      numberOfAnswers.current++;
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
    } else if (status === "notAnswered") {
      leftNumber.current = randomTable();
      rightNumber.current = randomMultiplicator();
      newQuestion.current = `${leftNumber.current} x ${rightNumber.current}`;
      setText(newQuestion.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer, resetAnswer]);

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
      <TextView text={appStatus !== "idle" ? text : ""} />
    </div>
  );
}
