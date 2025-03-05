import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import start_puppy from "../../asset/image/start_puppy.png";
import { questions as allQuestions } from "../../data/data";
import anime from 'animejs';

// 각 MBTI 유형별로 2개의 질문을 랜덤하게 선택하는 함수
const selectRandomQuestions = () => {
  const getRandomQuestions = (questions, count) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // E/I 질문 (1-7)
  const eiQuestions = allQuestions.slice(0, 7);
  // N/S 질문 (8-13)
  const nsQuestions = allQuestions.slice(7, 13);
  // T/F 질문 (14-21)
  const tfQuestions = allQuestions.slice(13, 21);
  // J/P 질문 (22-28)
  const jpQuestions = allQuestions.slice(21);

  // 각 유형별로 2개씩 선택
  const selectedQuestions = [
    ...getRandomQuestions(eiQuestions, 2),
    ...getRandomQuestions(nsQuestions, 2),
    ...getRandomQuestions(tfQuestions, 2),
    ...getRandomQuestions(jpQuestions, 2)
  ];

  // 최종 선택된 질문들을 랜덤하게 섞기
  return selectedQuestions.sort(() => 0.5 - Math.random());
};

function Quiz() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState(selectRandomQuestions());
  const [dogImages, setDogImages] = useState(() => {
    // localStorage에서 미리 로드된 이미지들을 가져옴
    const preloadedImages = localStorage.getItem('preloadedDogImages');
    return preloadedImages ? JSON.parse(preloadedImages) : [start_puppy];
  });
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNextLoading, setIsNextLoading] = useState(false);

  const animateContent = (isOut = false) => {
    anime({
      targets: '.quiz-content',
      opacity: isOut ? [1, 0] : [0, 1],
      translateX: isOut ? [0, -20] : [-20, 0],
      duration: 300,
      easing: 'easeInOutQuad',
      delay: anime.stagger(100)
    });
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
    setIsNextLoading(false);
    animateContent(false);
    
    // 이미지 로드 후 부드러운 페이드인
    anime({
      targets: '.quiz-image',
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 500,
      easing: 'easeOutQuad'
    });
  };

  const handleOptionClick = async (optionIndex) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setIsNextLoading(true);
      animateContent(true);
      setIsImageLoaded(false);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setIsNextLoading(false);
      }, 150);
    } else {
      const mbtiResult = calculateMBTIFromAnswers(newAnswers);
      navigate(`/result/${mbtiResult}`, { 
        state: { answers: newAnswers }
      });
    }
  };

  // 답변을 기반으로 MBTI 계산
  const calculateMBTIFromAnswers = (userAnswers) => {
    let mbtiCounts = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    };

    // 각 질문의 답변에서 MBTI 유형 추출 및 카운트
    userAnswers.forEach((answer, index) => {
      const question = questions[index];
      const option = question.options[answer];
      const mbtiType = option.match(/\(([A-Z])\)/)[1];
      mbtiCounts[mbtiType]++;
    });

    // 각 지표별로 더 높은 점수를 받은 유형 선택
    const result = [
      ['E', 'I'],
      ['S', 'N'],
      ['T', 'F'],
      ['J', 'P']
    ].map(([a, b]) => 
      mbtiCounts[a] >= mbtiCounts[b] ? a : b
    ).join('');

    return result;
  };

  if (isLoading || isNextLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-orange-50 via-orange-50 to-orange-100">
        <div className="flex flex-col items-center gap-4">
          <div className="text-8xl animate-bounce">🐕</div>
          <div className="text-xl font-semibold text-orange-500">로딩중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-orange-50 via-orange-50 to-orange-100">
      {/* 상단 진행 바 */}
      <div className="fixed top-0 left-0 w-full h-2 bg-orange-100 z-10">
        <div 
          className="h-full bg-orange-400 transition-all duration-500 ease-out"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* 메인 컨테이너 */}
      <div className="max-w-md mx-auto min-h-screen px-4 py-8 flex flex-col animate-fade-in">
        {/* 상단 이미지 */}
        <div className="quiz-content quiz-image flex justify-center items-center py-8" style={{ opacity: 0 }}>
          <div className="w-[280px] h-[280px] relative">
            <div className="absolute inset-0 bg-orange-300 rounded-[1.25rem] blur-2xl opacity-20 transform -rotate-6"></div>
            <div className="relative w-full h-full overflow-hidden rounded-[1.25rem] shadow-xl">
              <img
                src={dogImages[currentQuestion] || start_puppy}
                alt="강아지 MBTI"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onLoad={handleImageLoad}
              />
            </div>
          </div>
        </div>

        {/* 질문 카드 */}
        <div className="quiz-content flex-1 flex flex-col justify-center mb-8" style={{ opacity: 0 }}>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            {/* 진행 상태 */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-orange-600">
                질문 {currentQuestion + 1}
              </h2>
              <span className="text-sm text-gray-500">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>

            {/* 질문 */}
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {questions[currentQuestion].question}
            </h3>

            {/* 답변 버튼 */}
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  disabled={!isImageLoaded}
                  className="w-full p-5 text-left rounded-xl border-2 border-orange-100
                           hover:border-orange-400 hover:bg-orange-50 active:bg-orange-100
                           transition-all duration-300 text-gray-700 font-medium
                           shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {option.split(' (')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 하단 진행 표시 */}
        <div className="w-full bg-orange-100 rounded-full h-2 mb-4">
          <div 
            className="bg-orange-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default Quiz;
