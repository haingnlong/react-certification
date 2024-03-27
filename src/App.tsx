import { Routes, Route } from "react-router-dom";
import "./App.css";
import QuizMaker from "./components/QuizMaker";
import { QuizMakerProvider } from "./context/QuizMakerContext";
import { QuizzesAndAnswersProvider } from "./context/QuizzesAndAnswersContext";
import QuizList from "./components/QuizList";
import { routes } from "./routes";

function App() {
  return (
    <div className="App">
      <QuizMakerProvider>
        <QuizzesAndAnswersProvider>
          <Routes>
            <Route path={routes.home} element={<QuizMaker />} />
            <Route path={routes.results} element={<QuizList isResultsScreen/>} />
          </Routes>
        </QuizzesAndAnswersProvider>
      </QuizMakerProvider>
    </div>
  );
}

export default App;
