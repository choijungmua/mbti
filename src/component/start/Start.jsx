import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import start_puppy from "../../asset/image/start_puppy.png";

function Start() {
  const navigate = useNavigate();
  const [isPreloading, setIsPreloading] = useState(false);

  // 강아지 이미지들을 미리 로드하는 함수
  const preloadDogImages = async () => {
    try {
      setIsPreloading(true);
      // 기존 캐시 초기화
      localStorage.removeItem('preloadedDogImages');
      
      const promises = Array(4).fill().map(() => 
        axios.get("https://dog.ceo/api/breeds/image/random")
          .then(response => response.data.message)
          .catch(() => start_puppy)
      );
      
      const images = await Promise.all(promises);
      
      // 최소한의 이미지만 localStorage에 저장
      try {
        localStorage.setItem('preloadedDogImages', JSON.stringify(images));
      } catch (storageError) {
        console.warn('localStorage 저장 실패:', storageError);
      }

      // 첫 번째 이미지만 프리로드
      await new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = () => {
          img.src = start_puppy;
          resolve();
        };
        img.src = images[0];
      });

    } catch (error) {
      console.error("강아지 이미지 프리로드 실패:", error);
    } finally {
      setIsPreloading(false);
    }
  };

  useEffect(() => {
    preloadDogImages();
  }, []);

  const handleStartClick = () => {
    navigate('/quiz');
  };

  return (
    <div className="h-[100dvh] flex flex-col items-center justify-between bg-gradient-to-b from-orange-50 via-orange-50 to-orange-100 overflow-hidden">
      {/* 메인 컨텐츠 */}
      <div className="flex-1 w-full flex flex-col items-center justify-center px-4 py-2 animate-fade-in">
        {/* 메인 이미지 */}
        <div className="relative w-full max-w-[240px] mt-2 animate-slide-in-down">
          <div className="absolute inset-0 bg-orange-300 rounded-[2.5rem] blur-2xl opacity-20 transform -rotate-6 animate-pulse"></div>
          <img
            src={start_puppy}
            alt="강아지 MBTI"
            className="relative w-full rounded-[2rem] shadow-xl transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* 타이틀 */}
        <h1 className="mt-6 text-center text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400 leading-tight animate-slide-in-left">
          강아지 MBTI
          <br className="pt-2" />
          테스트 
          <span className="inline-block text-black animate-bounce">🐶</span>
        </h1>
        
        <p className="mt-4 text-gray-600 text-sm sm:text-base text-center max-w-xs animate-slide-in-right">
          나와 닮은 강아지는 누구일까요?
          <br className="hidden sm:block" />
          <span className="text-orange-500 font-semibold block mt-1">
            16가지 성격 유형으로 알아보세요!
          </span>
        </p>

        {/* 시작 버튼 */}
        <button 
          onClick={handleStartClick}
          disabled={isPreloading}
          className="mt-6 bg-gradient-to-r from-orange-500 to-orange-400 text-white text-base sm:text-lg font-bold 
                     py-3 px-6 rounded-xl shadow-lg hover:shadow-orange-200/50 
                     hover:from-orange-600 hover:to-orange-500 
                     active:scale-95 transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed">
          {isPreloading ? "로딩중..." : "테스트 시작하기 🚀"}
        </button>

        {/* 추가 정보 */}
        <div className="mt-4 text-xs sm:text-sm text-gray-500">
          🎯 약 3분 소요 | 💡 재미로 보는 심리 테스트
        </div>
      </div>
    </div>
  );
}

export default Start;
