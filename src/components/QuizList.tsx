import React, { MouseEvent, useContext, useEffect, useState } from "react";
import {
  DefaultQuizzesAndAnswersProps,
  QuizzesAndAnswersContext,
  quizzesAndAnswersDefaultValue,
} from "../context/QuizzesAndAnswersContext";
import { Link } from "react-router-dom";
import { routes } from "../routes";
import {
  DefaultValueProps,
  QuizMakerContext,
  quizMakerDefaultValue,
} from "../context/QuizMakerContext";
import { quizQuantity } from "../constants";
import htmlDecode from "../utils/htmlDecoder";

const QuizList: React.FC<{ isResultsScreen?: boolean }> = ({
  isResultsScreen,
}) => {
  const {
    quizList,
    setQuizList,
    userAnswerList,
    setUserAnswerList,
    correctAnswerList,
    setCorrectAnswerList,
  } = useContext<DefaultQuizzesAndAnswersProps>(QuizzesAndAnswersContext);
  const { setCategoryID, setDifficultyLevel } =
    useContext<DefaultValueProps>(QuizMakerContext);

  const [visibleSubmitButton, setVisibleSubmitButton] =
    useState<boolean>(false);

  const handleCalulateUserScore = (): number => {
    let score = 0;
    for (let i = 0; i < userAnswerList.length; i++) {
      if (userAnswerList[i] === correctAnswerList[i]) score++;
    }
    return score;
  };

  const handleClickRedirectButton = (): void => {
    if (isResultsScreen) {
      setCategoryID(quizMakerDefaultValue.categoryID);
      setDifficultyLevel(quizMakerDefaultValue.difficultyLevel);
      setQuizList(quizzesAndAnswersDefaultValue.quizList);
      setUserAnswerList(quizzesAndAnswersDefaultValue.userAnswerList);
      setCorrectAnswerList(quizzesAndAnswersDefaultValue.correctAnswerList);
    }
  };

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

  const handleAnswerClassname: (answer: any, index: any) => string = (
    answer,
    index
  ): string => {
    if (!isResultsScreen) {
      return userAnswerList[index] === answer
        ? "answer-selected"
        : "answer-button";
    } else {
      if (answer === correctAnswerList[index]) {
        return "answer-selected";
      } else {
        return userAnswerList[index] === answer
          ? "wrong-answer"
          : "answer-button";
      }
    }
  };

  useEffect(() => {
    if (userAnswerList.every((item) => item !== "") && !isResultsScreen) {
      setVisibleSubmitButton(true);
    }
  }, [userAnswerList, isResultsScreen]);

  return (
    <div className="quiz-list">
      {isResultsScreen && <h1 style={{ textAlign: "center" }}>Results</h1>}
      {quizList.map((item, index) => {
        return (
          <div key={`quiz-${index}`} style={{ marginBottom: "32px" }}>
            <div dangerouslySetInnerHTML={{ __html: item?.question }} />
            <ul>
              {item?.answers.map((answer, answerIndex) => {
                return (
                  <li key={`quiz-${index}-answer-${answerIndex}`}>
                    <button
                      style={{ cursor: "pointer" }}
                      value={answer}
                      onClick={(event) => handleSelectAnswer(event, index)}
                      disabled={isResultsScreen}
                      className={handleAnswerClassname(answer, index)}
                    >
                      {htmlDecode(answer)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
      {isResultsScreen && userAnswerList.every((item) => item !== "") && (
        <p
          className={`${
            handleCalulateUserScore() <= 1
              ? "low-score-bg"
              : handleCalulateUserScore() >= 4
              ? "high-score-bg"
              : "medium-score-bg"
          }`}
          style={{ textAlign: "center" }}
        >
          You scored {handleCalulateUserScore()} out of {quizQuantity}
        </p>
      )}
      {isResultsScreen && userAnswerList.some((item) => item === "") && (
        <p style={{ textAlign: "center" }}>U haven't taken the test!</p>
      )}
      {(visibleSubmitButton || isResultsScreen) && (
        <div className="redirect-button-block">
          <Link
            to={isResultsScreen ? routes.home : routes.results}
            onClick={handleClickRedirectButton}
            className="redirect-button"
          >
            {isResultsScreen ? "Create a new quiz" : "Submit"}
          </Link>
        </div>
      )}
    </div>
  );
};

export default QuizList;
