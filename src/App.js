import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./component/start/Start";
import Quiz from "./component/quiz/Quiz";
import Result from "./component/result/result";

export default function App() {
  return (
    <div className="fixed inset-0 font-extrabold bg-orange-50 font-normal text-slate-800">
      {/* 배경 장식 요소들 */}
      <div className="fixed inset-0 pointer-events-none">
        {/* 모바일에서도 잘 보이도록 위치와 크기 조정 */}
        <div className="absolute top-[5%] left-[5%] w-6 h-6 sm:w-16 sm:h-16 bg-orange-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-[30%] right-[5%] w-8 h-8 sm:w-20 sm:h-20 bg-orange-300 rounded-full opacity-20 animate-bounce-slow"></div>
        <div className="absolute bottom-[15%] left-[10%] w-4 h-4 sm:w-12 sm:h-12 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-[50%] right-[15%] w-6 h-6 sm:w-14 sm:h-14 bg-orange-100 rounded-full opacity-30 animate-spin-slow"></div>
        <div className="absolute bottom-[35%] right-[8%] w-4 h-4 sm:w-10 sm:h-10 bg-orange-200 rounded-full opacity-20 animate-float-slow"></div>
      </div>

      {/* 상단 장식 */}
      <div className="fixed top-0 left-0 w-full h-8 sm:h-16 bg-gradient-to-b from-orange-200/30 to-transparent" />

      {/* 하단 장식 */}
      <div className="fixed bottom-0 left-0 w-full h-8 sm:h-16 bg-gradient-to-t from-orange-200/30 to-transparent" />

      <div className="fixed inset-0">
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
