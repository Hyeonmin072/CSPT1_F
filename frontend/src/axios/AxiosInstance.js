import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:1271',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 인증 실패 시 로그인 페이지로 리다이렉트
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      localStorage.removeItem('userName');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 