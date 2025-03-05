import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { dogTypes } from "../../data/data";
import { Link } from "react-router-dom";
import { Share } from "@mynaui/icons-react";

// MBTI 이미지 import
import sheperd from "../../asset/image/sheperd.png";
import ritriver from "../../asset/image/ritriver.png";
import grayhound from "../../asset/image/grayhound.png";
import bordercoly from "../../asset/image/bordercoly.png";
import welsi from "../../asset/image/welsi.jpg";
import visong from "../../asset/image/visong.jpg";
import speech from "../../asset/image/speech.png";
import hersky from "../../asset/image/hersky.jpg";
import jacklershell from "../../asset/image/jacklershell.png";
import pome from "../../asset/image/pome.png";
import dalma from "../../asset/image/dalma.png";
import austrailian_sheperd from "../../asset/image/austrailian_sheperd.png";
import doberman from "../../asset/image/doberman.png";
import rabrado_ritriver from "../../asset/image/rabrado_ritriver.png";
import koly from "../../asset/image/koly.png";
import german_sheperd from "../../asset/image/german_sheperd.png";
import mix from "../../asset/image/mix.png";

const mbtiImages = {
  ISTJ: sheperd,
  ISFJ: ritriver,
  INFJ: grayhound,
  INTJ: bordercoly,
  ISTP: welsi,
  ISFP: visong,
  INFP: speech,
  INTP: hersky,
  ESTP: jacklershell,
  ESFP: pome,
  ENFP: dalma,
  ENTP: austrailian_sheperd,
  ESTJ: doberman,
  ESFJ: rabrado_ritriver,
  ENFJ: koly,
  ENTJ: german_sheperd,
  DEFAULT: mix,
};

function calculateMBTI(answers) {
  if (!Array.isArray(answers) || answers.length === 0) {
    console.error("Invalid answers:", answers);
    return "ISFP";
  }
  const mbtiMap = [
    ["E", "I"],
    ["S", "N"],
    ["T", "F"],
    ["J", "P"],
  ];
  let result = "";
  for (let i = 0; i < Math.min(answers.length, mbtiMap.length); i++) {
    const choice = answers[i];
    result += mbtiMap[i][choice === undefined ? 0 : choice];
  }
  return result.length === 4 ? result : "ISFP";
}

function Result() {
  const location = useLocation();
  const { mbtiType } = useParams();
  const [mbti, setMbti] = useState("ISFP");
  const [dogInfo, setDogInfo] = useState(dogTypes["ISFP"]);
  const [copying, setCopying] = useState(false);

  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  const handleShare = async () => {
    const shareData = {
      title: '강아지 MBTI 테스트 결과',
      text: `나의 강아지 MBTI는 ${mbti} - ${dogInfo.name}입니다!`,
      url: window.location.href
    };

    try {
      if (isMobile() && navigator.share && navigator.canShare(shareData)) {
        // 모바일 네이티브 공유 사용
        await navigator.share(shareData);
      } else {
        // PC에서는 클립보드 복사
        await navigator.clipboard.writeText(window.location.href);
        setCopying(true);
        setTimeout(() => setCopying(false), 2000);
      }
    } catch (err) {
      console.error('공유 실패:', err);
      // 공유 실패시 클립보드 복사 시도
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopying(true);
        setTimeout(() => setCopying(false), 2000);
      } catch (clipboardErr) {
        console.error('클립보드 복사 실패:', clipboardErr);
      }
    }
  };

  useEffect(() => {
    if (mbtiType) {
      const upperMbti = mbtiType.toUpperCase();
      if (dogTypes[upperMbti]) {
        setMbti(upperMbti);
        setDogInfo(dogTypes[upperMbti]);
        return;
      }
    }
    if (location.state?.answers) {
      try {
        const calculated = calculateMBTI(location.state.answers);
        setMbti(calculated);
        setDogInfo(dogTypes[calculated] || dogTypes["DEFAULT"]);
      } catch (error) {
        console.error("Error calculating MBTI:", error);
        setMbti("ISFP");
        setDogInfo(dogTypes["ISFP"]);
      }
    }
  }, [location.state, mbtiType]);

  if (!dogInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50 text-xl">
        결과를 불러오는 중입니다...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-50 via-orange-50 to-orange-100 animate__animated animate__fadeIn p-4">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">당신의 강아지 MBTI 결과!</h1>
      <div className="max-w-md w-full bg-white rounded-2xl p-6 shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{mbti} - {dogInfo.name}</h2>
        <div className="relative w-full aspect-square mb-6">
          <img
            src={mbtiImages[mbti] || mbtiImages.DEFAULT}
            alt={`${mbti} 강아지`}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
        <div className="text-gray-700 mb-6 whitespace-pre-line text-left">{dogInfo.description}</div>
        <div className="flex gap-4 justify-center">
          <button
            className="px-8 py-3 rounded-full bg-orange-400 text-white font-semibold hover:bg-orange-500 transition duration-300 shadow-md"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            다시 테스트하기
          </button>
          <button 
            className={`flex items-center px-8 py-3 rounded-full bg-gradient-to-r ${
              copying 
                ? 'from-green-400 to-green-600 scale-105' 
                : 'from-blue-400 to-blue-600'
            } text-white font-semibold hover:from-blue-500 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg`}
            onClick={handleShare}
          >
            {copying ? '복사 완료!' : '공유하기'} 
            <Share className={`ml-2 w-5 h-5 ${copying ? 'animate-bounce' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;
