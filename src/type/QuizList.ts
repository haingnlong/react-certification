export type QuizListProps = {
  response_code: number;
  results: QuizResultsProps[];
};

export type QuizResultsProps = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};
