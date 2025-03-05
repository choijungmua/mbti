import { create } from 'zustand';
import axios from 'axios';
import start_puppy from '../asset/image/start_puppy.png';
import sheperd from "../asset/image/sheperd.png";
import ritriver from "../asset/image/ritriver.png";
import grayhound from "../asset/image/grayhound.png";
import bordercoly from "../asset/image/bordercoly.png";
import welsi from "../asset/image/welsi.jpg";
import visong from "../asset/image/visong.jpg";
import speech from "../asset/image/speech.png";
import hersky from "../asset/image/hersky.jpg";
import jacklershell from "../asset/image/jacklershell.png";
import pome from "../asset/image/pome.png";
import dalma from "../asset/image/dalma.png";
import austrailian_sheperd from "../asset/image/austrailian_sheperd.png";
import doberman from "../asset/image/doberman.png";
import rabrado_ritriver from "../asset/image/rabrado_ritriver.png";
import koly from "../asset/image/koly.png";
import german_sheperd from "../asset/image/german_sheperd.png";
import mix from "../asset/image/mix.png";
import bbak from "../asset/image/bbak.png";

// MBTI 이미지 배열
const mbtiImages = [
  sheperd, ritriver, grayhound, bordercoly, welsi, visong, bbak, hersky,
  jacklershell, pome, dalma, austrailian_sheperd, doberman, rabrado_ritriver,
  koly, german_sheperd, mix
];

// 기본 이미지 배열 (API 실패시 사용)
const fallbackImages = [
  start_puppy,
  ...mbtiImages
];

const useImageStore = create((set, get) => ({
  dogImages: [],
  isLoading: false,
  error: null,
  imageCache: new Map(),
  
  // 이미지 로드 함수
  loadDogImages: async (count = 8) => {
    try {
      set({ isLoading: true });
      
      // 랜덤하게 MBTI 이미지 선택
      const shuffledImages = [...mbtiImages]
        .sort(() => Math.random() - 0.5)
        .slice(0, count);
      
      // 이미지 프리로드
      const loadImage = (url) => {
        if (get().imageCache.has(url)) {
          return Promise.resolve(url);
        }

        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            get().imageCache.set(url, true);
            resolve(url);
          };
          img.onerror = () => {
            get().imageCache.set(start_puppy, true);
            resolve(start_puppy);
          };
          img.src = url;
        });
      };

      // 이미지 로드 시작 전에 기본 이미지 설정
      set({ dogImages: Array(count).fill(start_puppy) });

      // 병렬로 이미지 로드
      const loadedImages = await Promise.all(
        shuffledImages.map(url => loadImage(url))
      );

      set({ dogImages: loadedImages });
      return loadedImages;
    } catch (error) {
      console.error("이미지 로드 실패:", error);
      return Array(count).fill(start_puppy);
    } finally {
      set({ isLoading: false });
    }
  },

  // 초기 이미지 프리로드 (Start 페이지용)
  preloadInitialImages: async () => {
    const cache = get().imageCache;
    if (cache.size > 0) {
      set({ dogImages: Array.from(cache.keys()).slice(0, 3) });
      return;
    }

    try {
      set({ isLoading: true });
      // 랜덤하게 3개의 MBTI 이미지 선택
      const selectedImages = [...mbtiImages]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      set({ dogImages: selectedImages });
      
      // 백그라운드에서 이미지 프리로드
      selectedImages.forEach(url => {
        const img = new Image();
        img.src = url;
        img.onload = () => cache.set(url, true);
        img.onerror = () => cache.set(start_puppy, true);
      });
    } catch (error) {
      console.error("초기 이미지 로드 실패:", error);
      set({ dogImages: fallbackImages.slice(0, 3) });
    } finally {
      set({ isLoading: false });
    }
  },

  // 스토어 초기화
  resetStore: () => {
    const cache = get().imageCache;
    cache.clear();
    set({ dogImages: [], isLoading: false, error: null });
  }
}));

export default useImageStore; 