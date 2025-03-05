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
      const promises = Array(8).fill().map(() => 
        axios.get("https://dog.ceo/api/breeds/image/random")
      );
      const responses = await Promise.all(promises);
      const images = responses.map(response => response.data.message);
      
      // localStorage에 이미지 URL들을 저장
      localStorage.setItem('preloadedDogImages', JSON.stringify(images));
      
      // 이미지들을 실제로 브라우저에 캐시
      await Promise.all(
        images.map(url => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = url;
          });
        })
      );
    } catch (error) {
      console.error("강아지 이미지 프리로드 실패:", error);
      localStorage.setItem('preloadedDogImages', JSON.stringify(Array(8).fill(start_puppy)));
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
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-orange-50 via-orange-50 to-orange-100">
      {/* 메인 컨텐츠 */}
      <div className="flex-1 w-full flex flex-col items-center px-6 py-4 animate-fade-in">
        {/* 메인 이미지 */}
        <div className="relative w-full max-w-[350px] sm:max-w-[240px] mt-4 animate-slide-in-down">
          <div className="absolute inset-0 bg-orange-300 rounded-[2.5rem] blur-2xl opacity-20 transform -rotate-6 animate-pulse"></div>
          <img
            src={start_puppy}
            alt="강아지 MBTI"
            className="relative w-full rounded-[2rem] shadow-xl transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* 타이틀 */}
        <h1 className="mt-8 text-center text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400 leading-tight animate-slide-in-left">
          강아지 MBTI
          <br className="pt-4" />
          테스트 
          <span className="inline-block text-black animate-bounce">🐶</span>
        </h1>
        
        <p className="mt-6 text-gray-600 text-base sm:text-lg text-center max-w-xs animate-slide-in-right">
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
          className="mt-10 bg-gradient-to-r from-orange-500 to-orange-400 text-white text-lg font-bold 
                     py-4 px-8 rounded-2xl shadow-lg hover:shadow-orange-200/50 
                     hover:from-orange-600 hover:to-orange-500 
                     active:scale-95 transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed">
          {isPreloading ? "로딩중..." : "테스트 시작하기 🚀"}
        </button>

        {/* 추가 정보 */}
        <div className="mt-6 flex items-center gap-3 text-sm text-gray-500">
          <div className="w-full text-sm text-gray-500 mt-8">
            🎯 약 3분 소요 | 💡 재미로 보는 심리 테스트
          </div>
        </div>
      </div>
    </div>
  );
}

export default Start;
