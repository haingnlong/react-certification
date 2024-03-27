import { useContext } from "react";
import { DifficultyLevel, defaultLevel } from "../constants";
import { QuizMakerContext } from "../context/QuizMakerContext";

const DifficultySelect: React.FC<{}> = () => {
  const { setDifficultyLevel } = useContext(QuizMakerContext);

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setDifficultyLevel(event.target.value);
  };

  return (
    <div>
      <select
        name="difficultySelect"
        id="difficultySelect"
        onChange={handleSelectChange}
        defaultValue={defaultLevel}
        style={{ textTransform: "capitalize" }}
      >
        <option value={defaultLevel} disabled>
          Select difficulty
        </option>

        {DifficultyLevel.map((item, index) => {
          return (
            <option
              key={`${item}-level`}
              value={item}
              style={{ textTransform: "capitalize" }}
            >
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DifficultySelect;
