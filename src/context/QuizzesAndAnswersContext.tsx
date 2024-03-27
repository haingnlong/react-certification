import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { quizQuantity } from "../constants";

const defaultuserAnswerList: Array<string> = [];
for (let item = 0; item < quizQuantity; item++) {
  defaultuserAnswerList.push("");
}

export const quizzesAndAnswersDefaultValue = {
  quizList: [],
  setQuizList: () => {},
  userAnswerList: defaultuserAnswerList,
  setUserAnswerList: () => {},
  correctAnswerList: [],
  setCorrectAnswerList: () => {},
};

export type DefaultQuizzesAndAnswersProps = {
  quizList: Array<{ question: string; answers: string[] }>;
  setQuizList: Dispatch<
    SetStateAction<Array<{ question: string; answers: string[] }>>
  >;
  userAnswerList: Array<string>;
  setUserAnswerList: Dispatch<SetStateAction<Array<string>>>;
  correctAnswerList: Array<string>;
  setCorrectAnswerList: Dispatch<SetStateAction<Array<string>>>;
};

export const QuizzesAndAnswersContext =
  createContext<DefaultQuizzesAndAnswersProps>(quizzesAndAnswersDefaultValue);

export const QuizzesAndAnswersProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [quizList, setQuizList] = useState<
    Array<{ question: string; answers: string[] }>
  >([]);
  const [userAnswerList, setUserAnswerList] = useState<Array<string>>(defaultuserAnswerList);
  const [correctAnswerList, setCorrectAnswerList] = useState<Array<string>>(
    []
  );
  return (
    <QuizzesAndAnswersContext.Provider
      value={{
        quizList,
        setQuizList,
        userAnswerList,
        setUserAnswerList,
        correctAnswerList,
        setCorrectAnswerList,
      }}
    >
      {children}
    </QuizzesAndAnswersContext.Provider>
  );
};
