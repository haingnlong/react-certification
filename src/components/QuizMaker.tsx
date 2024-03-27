import CategorySelect from "./CategorySelect";
import DifficultySelect from "./DifficultySelect";
import useFetch from "../hooks/useFetch";
import CreateButton from "./CreateButton";
import { TriviaCategoriesProps } from "../type/QuizMaker";
import QuizList from "./QuizList";

const QuizMaker: React.FC<{}> = () => {
  const { data, isLoading } = useFetch<TriviaCategoriesProps>(
    "https://opentdb.com/api_category.php"
  );

  if (isLoading) return <>Loading......</>;

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>QUIZ MAKER</h1>
      {data ? (
        <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
          <CategorySelect categories={data} />
          <DifficultySelect />
          <CreateButton />
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>Something went wrong</p>
      )}
      <QuizList />
    </div>
  );
};

export default QuizMaker;
