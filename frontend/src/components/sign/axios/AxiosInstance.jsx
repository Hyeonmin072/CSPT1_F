import axios from "axios";

// 기본 URL 설정 (백엔드 서버 주소)
const API_BASE_URL = "http://localhost:1271";

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
