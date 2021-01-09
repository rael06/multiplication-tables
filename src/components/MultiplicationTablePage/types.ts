export type QuestionStatus =
  | "idle"
  | "pending"
  | "correction"
  | "answered"
  | "timeover";
export type AnswerStatus = "idle" | "pending" | "correct" | "wrong";
export type QuestionState = {
  text: string;
  questionStatus: QuestionStatus;
  answerStatus: AnswerStatus;
};

export type QuestionActionType = "SET_QUESTION_STATUS" | "SET_NEW_QUESTION";

export type SetQuestionStatusAction = {
  type: QuestionActionType;
  update: QuestionStatus;
};

export type SetNewQuestionAction = {
  type: QuestionActionType;
  update: string;
};

export type QuestionAction = SetQuestionStatusAction | SetNewQuestionAction;

export type QuestionReducer = (
  state: QuestionState,
  action: QuestionAction
) => QuestionState;
