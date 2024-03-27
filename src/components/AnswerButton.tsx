import React, { MouseEvent, useContext } from "react";
import {
  DefaultQuizzesAndAnswersProps,
  QuizzesAndAnswersContext,
} from "../context/QuizzesAndAnswersContext";
import htmlDecode from "../utils/htmlDecoder";

const AnswerButton: React.FC<{
  answer: string;
  isResultsScreen?: boolean;
  index: number;
}> = ({ answer, isResultsScreen, index }) => {
  const { userAnswerList, setUserAnswerList, correctAnswerList } =
    useContext<DefaultQuizzesAndAnswersProps>(QuizzesAndAnswersContext);

  const handleSelectAnswer = (
    event: MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    const element = event.target as HTMLInputElement;
    setUserAnswerList((oldValue) => {
      const cloneuserAnswerList = [...oldValue];
      cloneuserAnswerList[index] = element.value;
      return cloneuserAnswerList;
    });
  };

  const handleAnswerClassname = (): string => {
    if (!isResultsScreen) {
      return userAnswerList[index] === answer
        ? "answer-selected"
        : "answer-button";
    } else {
      if (answer === correctAnswerList[index]) {
        return "answer-selected";
      } else {
        return (userAnswerList[index] === answer) 
          ? "wrong-answer"
          : "answer-button";
      }
    }
  };

  return (
    <button
      style={{ cursor: "pointer" }}
      value={answer}
      onClick={(event) => handleSelectAnswer(event, index)}
      disabled={isResultsScreen}
      className={handleAnswerClassname()}
    >
      {htmlDecode(answer)}
    </button>
  );
};

export default React.memo(AnswerButton);
