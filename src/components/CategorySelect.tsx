import { useContext } from "react";
import {
  DefaultValueProps,
  QuizMakerContext,
} from "../context/QuizMakerContext";
import { CategorySelectProps } from "../type/CategorySelect";

const CategorySelect: React.FC<CategorySelectProps> = ({ categories }) => {
  const { setCategoryID } = useContext<DefaultValueProps>(QuizMakerContext);

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setCategoryID(event.target.value);
  };

  return (
    <div>
      <select
        name="categorySelect"
        id="categorySelect"
        onChange={handleSelectChange}
        defaultValue="default-category"
      >
        <option value="default-category" disabled>
          Select a category
        </option>

        {categories?.trivia_categories &&
          categories?.trivia_categories.map((item, index) => {
            return (
              <option key={`category-${item.id}`} value={item.id}>
                {item.name}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default CategorySelect;
