import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./component/start/Start";
import Quiz from "./component/quiz/Quiz";
import Result from "./component/result/result";

export default function App() {
  return (
    <div className="h-[100dvh] w-full bg-orange-50 overflow-hidden">
      {/* 배경 장식 요소들 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* 모바일에서도 잘 보이도록 위치와 크기 조정 */}
        <div className="absolute top-[5%] left-[5%] w-8 h-8 sm:w-16 sm:h-16 bg-orange-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-[30%] right-[5%] w-10 h-10 sm:w-20 sm:h-20 bg-orange-300 rounded-full opacity-20 animate-bounce-slow"></div>
        <div className="absolute bottom-[15%] left-[10%] w-6 h-6 sm:w-12 sm:h-12 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-[50%] right-[15%] w-8 h-8 sm:w-14 sm:h-14 bg-orange-100 rounded-full opacity-30 animate-spin-slow"></div>
        <div className="absolute bottom-[35%] right-[8%] w-6 h-6 sm:w-10 sm:h-10 bg-orange-200 rounded-full opacity-20 animate-float-slow"></div>
        
        {/* 모바일용 추가 데코레이션 */}
        <div className="absolute top-[70%] left-[20%] w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute top-[20%] left-[40%] w-4 h-4 sm:w-6 sm:h-6 bg-orange-200 rounded-full opacity-15 animate-float"></div>
        <div className="absolute bottom-[10%] right-[30%] w-5 h-5 sm:w-7 sm:h-7 bg-orange-300 rounded-full opacity-20 animate-bounce-slow"></div>
      </div>

      {/* 상단 장식 - 모바일에서 더 자연스럽게 */}
      <div className="w-full h-12 sm:h-16 bg-gradient-to-b from-orange-200/30 to-transparent fixed top-0 left-0 animate-fade-in" />

      {/* 하단 장식 추가 */}
      <div className="w-full h-12 sm:h-16 bg-gradient-to-t from-orange-200/30 to-transparent fixed bottom-0 left-0 animate-fade-in" />

      <div className="h-full relative">
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
