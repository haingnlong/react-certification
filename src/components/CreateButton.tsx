import { useContext, useEffect, useState } from "react";
import {
  DefaultValueProps,
  QuizMakerContext,
} from "../context/QuizMakerContext";
import useFetch from "../hooks/useFetch";
import {
  DefaultQuizzesAndAnswersProps,
  QuizzesAndAnswersContext,
} from "../context/QuizzesAndAnswersContext";
import shuffleArray from "../utils/shuffleArray";
import { quizQuantity } from "../constants";
import { QuizListProps } from "../type/QuizList";

const CreateButton: React.FC<{}> = () => {
  const { categoryID, difficultyLevel } =
    useContext<DefaultValueProps>(QuizMakerContext);
  const { data, fetchData } = useFetch<QuizListProps>("");
  const { setQuizList, setCorrectAnswerList } =
    useContext<DefaultQuizzesAndAnswersProps>(QuizzesAndAnswersContext);
  const [showingMessage, setShowingMessage] = useState<boolean>(false);

  const handleQuizMaker: () => void = (): void => {
    fetchData(
      `https://opentdb.com/api.php?amount=${quizQuantity}&category=${categoryID}&difficulty=${difficultyLevel}&type=multiple`
    );
  };

  useEffect(() => {
    if (data) {
      const correctAnswerList: string[] = [];
      const quizList: { question: string; answers: string[] }[] = [];
      if (data?.response_code === 0) {
        data?.results.forEach((item, index) => {
          correctAnswerList.push(item.correct_answer);
          quizList.push({
            question: item.question,
            answers: shuffleArray([
              item.correct_answer,
              ...item.incorrect_answers,
            ]),
          });
        });
        setShowingMessage(false);
      } else {
        setShowingMessage(true);
      }
      setCorrectAnswerList(correctAnswerList);
      setQuizList(quizList);
    }
  }, [data]);

  return (
    <div>
      <button
        id="createBtn"
        onClick={handleQuizMaker}
        disabled={!(categoryID.length > 0 && difficultyLevel.length > 0)}
      >
        Create
      </button>
      {showingMessage && (
        <span style={{ color: "red", marginLeft: "16px" }}>
          Too many request
        </span>
      )}
    </div>
  );
};

export default CreateButton;
