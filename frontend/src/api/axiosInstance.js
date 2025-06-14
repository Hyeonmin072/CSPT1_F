import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // 공통 주소
    withCredentials: true,            // 쿠키 포함 (로그인 유지 등)
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;