import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./component/start/Start";
import Quiz from "./component/quiz/Quiz";
import Result from "./component/result/result";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-orange-50">
      <div className="max-w-md mx-auto h-full relative">
        <Router>
          <Routes>
            <Route path="/" element={<Start/>} />
            <Route path="/quiz" element={<Quiz/>} />
            <Route path="/result" element={<Result/>} />
            <Route path="/result/:mbtiType" element={<Result/>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}
