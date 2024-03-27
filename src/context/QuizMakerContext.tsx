import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from "react";

export const quizMakerDefaultValue = {
  categoryID: "",
  setCategoryID: () => {},
  difficultyLevel: "",
  setDifficultyLevel: () => {},
};

export type DefaultValueProps = {
  categoryID: string;
  setCategoryID: Dispatch<SetStateAction<string>>;
  difficultyLevel: string;
  setDifficultyLevel: Dispatch<SetStateAction<string>>;
};

export const QuizMakerContext = createContext<DefaultValueProps>(quizMakerDefaultValue);

export const QuizMakerProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [categoryID, setCategoryID] = useState<string>("");
  const [difficultyLevel, setDifficultyLevel] = useState<string>("");
  return (
    <QuizMakerContext.Provider
      value={{ categoryID, setCategoryID, difficultyLevel, setDifficultyLevel }}
    >
      {children}
    </QuizMakerContext.Provider>
  );
};
