import axiosInstance from "./AxiosInstance";

// 회원가입 API 함수
export const signupApi = {
  // 일반 회원 가입
  customerSignup: (userData) => {
    console.log("유저 회원가입: ", userData);
    return axiosInstance.post("/user/signup", userData);
  },

  // 사장님 회원 가입
  ownerSignup: (userData) => {
    console.log("사장 회원가입: ", userData);
    return axiosInstance.post("/shop/signup", userData);
  },

  // 디자이너 회원 가입
  designerSignup: (userData) => {
    console.log("디자이너 회원가입: ", userData);
    return axiosInstance.post("/designer/signup", userData);
  },

  // 이메일 중복 확인
  checkEmailDuplicate: (email) => {
    console.log("이메일 중복 확인: ", email);
    return axiosInstance.post("/auth/check-email", { email });
  },

  // 이메일 인증 코드 발송
  sendVerificationEmail: (email) => {
    console.log("이메일 인증 코드 발송: ", email);
    return axiosInstance.post("/auth/send-verification", { email });
  },

  // 이메일 인증 코드 확인
  verifyEmailCode: (email, code) => {
    console.log("이메일 인증 코드 확인: ", email, code);
    return axiosInstance.post("/auth/verify-code", { email, code });
  },
};

// 로그인 API 함수
export const loginApi = {
  signin: (loginData, userType) => {
    const data = {
      who: userType,
      email: loginData.email,
      password: loginData.password,
    };
    console.log("로그인 시도:", data);
    return axiosInstance.post("/signin", data);
  },
};
