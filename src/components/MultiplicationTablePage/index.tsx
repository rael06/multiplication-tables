import React from "react";
import styles from "./style.module.scss";
import TablesSelector from "./TablesSelector";
import Button from "common/Button";
import Keyboard from "common/Keyboard";
import UserScreen from "./UserScreen";
import { AppStatus } from "./types/types";
import {
  AnswerStatus,
  QuestionAction,
  QuestionReducer,
  QuestionState,
  QuestionStatus,
} from "./types";

const minMultiplicator = 1;
const maxMultiplicator = 10;

const initialState: QuestionState = {
  text: "",
  questionStatus: "idle",
  answerStatus: "idle",
};

const questionReducer: QuestionReducer = (
  state: QuestionState,
  action: QuestionAction
) => {
  const { type, update } = action;
  switch (type) {
    case "SET_NEW_QUESTION":
      return { ...state, text: "new question", answerStatus: "idle" };

    case "SET_QUESTION_STATUS":
      return {
        ...state,
        questionStatus: update as QuestionStatus,
      };

    default:
      throw new Error(`no supported action for ${type}`);
  }
};

type Multiplication = {
  leftNumber: number;
  rightNumber: number;
  result: number;
};

let numberOfQuestions = 0;
let numberOfCorrectAnswers = 0;

export default function MultiplicationTablePage() {
  // const getStatus = (): QuestionStatus => {
  //   if (appStatus === "started") return answer ? "answered" : "notAnswered";
  //   return "idle";
  // };

  // const [state, dispatch] = React.useReducer<QuestionReducer, QuestionState>(
  //   questionReducer,
  //   initialState,
  //   (initialState) => initialState
  // );

  const [checkedTables, setCheckedTables] = React.useState<number[]>([]);
  const [answer, setAnswer] = React.useState<string>("");
  const [appStatus, setAppStatus] = React.useState<AppStatus>("idle");
  const [userScreenText, setUserScreenText] = React.useState<string>("");
  const [questionStatus, setQuestionStatus] = React.useState<QuestionStatus>(
    "idle"
  );
  const multiplication = React.useRef<Multiplication | null>(null);

  const getRandomMultiplication = React.useCallback((): Multiplication => {
    const randomMultiplicator = (): number =>
      Math.floor(Math.random() * maxMultiplicator) + minMultiplicator;

    const randomTable = (): number => {
      const randomIndex = Math.floor(Math.random() * checkedTables.length);
      return Number(checkedTables[randomIndex]);
    };
    const leftNumber = randomMultiplicator();
    const rightNumber = randomTable();
    const result = leftNumber * rightNumber;
    return {
      leftNumber,
      rightNumber,
      result,
    };
  }, [checkedTables]);

  const answerStatus: AnswerStatus = React.useMemo(() => {
    if (appStatus !== "started") return "idle";
    else if (answer === "") return "pending";
    else if (answer === multiplication.current?.result.toString())
      return "correct";
    else return "wrong";
  }, [appStatus, multiplication, answer]);

  React.useEffect(() => {
    if (appStatus === "started") {
      numberOfCorrectAnswers = numberOfQuestions = 0;
      setQuestionStatus("pending");
      multiplication.current = getRandomMultiplication();
    } else if (appStatus === "stopped") {
      setQuestionStatus("idle");
      setUserScreenText(
        `Ta note est de ${numberOfCorrectAnswers} / ${numberOfQuestions}`
      );
    }
  }, [appStatus, getRandomMultiplication]);

  React.useEffect(() => {
    if (questionStatus === "answered" && multiplication.current) {
      const { leftNumber, rightNumber, result } = multiplication.current;
      setUserScreenText(`${leftNumber} x ${rightNumber} = ${result}`);
      setQuestionStatus("correction");
      numberOfQuestions++;
      if (answerStatus === "correct") numberOfCorrectAnswers++;
      let timer =
        answerStatus === "correct" ? 1500 : answerStatus === "wrong" ? 4000 : 0;
      console.log("new", numberOfQuestions);
      multiplication.current = getRandomMultiplication();
      setTimeout(() => {
        setAnswer("");
        setQuestionStatus("pending");
      }, timer);
    }
  }, [answerStatus, getRandomMultiplication, questionStatus]);

  React.useEffect(() => {
    if (questionStatus === "pending" && multiplication.current) {
      const { leftNumber, rightNumber } = multiplication.current;
      setUserScreenText(`${leftNumber} x ${rightNumber}`);
    }
  }, [multiplication, questionStatus]);

  const updateCheckedTables = (checkedTables: number[]) => {
    if (appStatus !== "started") setCheckedTables(checkedTables);
  };

  const updateAnswer = (pressedKeys: string) => {
    setAnswer(pressedKeys);
    setQuestionStatus("answered");
  };

  return (
    <div className={styles.MultiplicationTablePage}>
      <div className={styles.tablesSelector}>
        <TablesSelector
          putCheckedTables={updateCheckedTables}
          isStarted={appStatus === "started"}
        />
      </div>

      {appStatus !== "started" ? (
        <div className={styles.startStopButton}>
          <Button
            onClick={() => {
              setAppStatus("started");
            }}
            isDisabled={checkedTables.length === 0}
          >
            Commencer
          </Button>
        </div>
      ) : (
        <div className={styles.startStopButton}>
          <Button onClick={() => setAppStatus("stopped")}>Arrêter</Button>
        </div>
      )}

      <div className={styles.question}>
        <UserScreen text={userScreenText} answerStatus={answerStatus} />
      </div>

      <div className={styles.keyboard}>
        <Keyboard
          keys={["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]}
          onConfirm={updateAnswer}
          isDisabled={appStatus !== "started"}
        />
      </div>
    </div>
  );
}
