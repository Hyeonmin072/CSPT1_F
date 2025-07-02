import axios from "axios";

// 기본 URL 설정 (백엔드 서버 주소)
const API_BASE_URL = "http://localhost:1271";

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 쿠키 기반 인증을 위해 필요
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  (config) => {
    // 회원가입 요청의 경우 Authorization 헤더를 추가하지 않음
    if (config.url.includes("/signup")) {
      return config;
    }

    // 그 외의 요청에는 토큰 추가
    const token = localStorage.getItem("token");
    if (token && token !== "undefined" && token !== "null") {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // 토큰이 없거나 유효하지 않으면 Authorization 헤더 제거
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
