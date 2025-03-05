import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import start_puppy from "../../asset/image/start_puppy.png";
import useImageStore from "../../store/imageStore";

function Start() {
  const navigate = useNavigate();
  const { isLoading, preloadInitialImages } = useImageStore();

  useEffect(() => {
    preloadInitialImages();
  }, [preloadInitialImages]);

  const handleStartClick = () => {
    navigate('/quiz');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-orange-50 via-orange-50 to-orange-100">
      {/* 메인 컨텐츠 */}
      <div className="w-full max-h-full flex flex-col items-center justify-center px-4 animate-fade-in">
        {/* 메인 이미지 */}
        <div className="relative w-full max-w-[180px] sm:max-w-[240px] animate-slide-in-down">
          <div className="absolute inset-0 bg-orange-300 rounded-[2.5rem] blur-2xl opacity-20 transform -rotate-6 animate-pulse"></div>
          <img
            src={start_puppy}
            alt="강아지 MBTI"
            className="relative w-full rounded-[2rem] shadow-xl transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* 타이틀 */}
        <h1 className="mt-4 text-center text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400 leading-tight animate-slide-in-left">
          강아지 MBTI
          <br className="pt-1" />
          테스트 
          <span className="inline-block text-black animate-bounce">🐶</span>
        </h1>
        
        <p className="mt-3 text-gray-600 text-sm sm:text-base text-center max-w-xs animate-slide-in-right">
          나와 닮은 강아지는 누구일까요?
          <span className="text-orange-500 font-semibold block mt-1">
            16가지 성격 유형으로 알아보세요!
          </span>
        </p>

        {/* 시작 버튼 */}
        <button 
          onClick={handleStartClick}
          disabled={isLoading}
          className="mt-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white text-base sm:text-lg font-bold 
                     py-3 px-6 rounded-xl shadow-lg hover:shadow-orange-200/50 
                     hover:from-orange-600 hover:to-orange-500 
                     active:scale-95 transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed">
          {isLoading ? "로딩중..." : "테스트 시작하기 🚀"}
        </button>

        {/* 추가 정보 */}
        <div className="mt-3 text-xs sm:text-sm text-gray-500">
          🎯 약 3분 소요 | 💡 재미로 보는 심리 테스트
        </div>
      </div>
    </div>
  );
}

export default Start;
