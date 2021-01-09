import React from "react";
import styles from "./style.module.scss";
import TextView from "common/TextView";
import { AnswerStatus } from "components/MultiplicationTablePage/types";

type Props = {
  answerStatus: AnswerStatus;
  text: string;
};

export default function Screen({ answerStatus, text }: Props) {
  return (
    <div
      className={`${styles.Question} ${
        answerStatus === "idle" || answerStatus === "pending"
          ? ""
          : answerStatus === "correct"
          ? styles.correct
          : styles.wrong
      }`}
    >
      <TextView text={text} />
    </div>
  );
}
