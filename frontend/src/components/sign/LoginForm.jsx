import React, { useState } from "react";
import Swal from "sweetalert2";
import SocialLogin from "../sign/shared/SocialLogin";
import FormInput from "../sign/shared/FormInput";
import { loginApi } from "./axios/authApi";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ userType, setUserType, toggleLoginMode, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 기본 유효성 검사
    if (name === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        email: "올바른 이메일 형식이 아닙니다",
      }));
    } else if (name === "password" && value.length > 0 && value.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "비밀번호는 최소 6자 이상이어야 합니다",
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    } else if (formData.password.length < 6) {
      newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다";
    }

    setErrors(newErrors);

    // 오류가 있는 경우 Sweetalert2로 알림
    if (Object.keys(newErrors).length > 0) {
      Swal.fire({
        icon: "warning",
        title: "입력 오류",
        text: Object.values(newErrors)[0], // 첫 번째 오류 메시지만 표시
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      console.log("로그인 시도:", {
        email: formData.email,
        password: formData.password,
        userType: userType,
        selectedButton:
          userType === "SHOP"
            ? "사장이에요"
            : userType === "USER"
            ? "고객이에요"
            : userType === "DESIGNER"
            ? "디자이너에요"
            : "알 수 없음",
      });

      // 통합 로그인 API 호출
      const response = await loginApi.signin(formData, userType);

      console.log("로그인 응답:", response);

      // 로그인 성공 시 토큰 저장
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userType", userType);
      }

      // 로그인 성공 시 Sweet Alert로 알림
      await Swal.fire({
        icon: "success",
        title: "로그인 성공!",
        text: "환영합니다!",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });

      onClose();

      // 유저 타입에 따른 리다이렉트
      switch (userType) {
        case "SHOP":
          navigate("/hairshop"); // 헤어샵 페이지로 이동
          break;
        case "USER":
          navigate("/"); // 메인 페이지
          break;
        case "DESIGNER":
          navigate("/designerpage"); // 디자이너 페이지로 이동
          break;
        default:
          navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "로그인 실패",
        text:
          error.response?.data?.message ||
          "로그인에 실패했습니다. 다시 시도해주세요.",
        confirmButtonColor: "#d33",
        confirmButtonText: "확인",
      });
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-xl font-bold mb-4 text-center">HAIRISM</h1>

      {/* 사용자 유형 선택 버튼 */}
      <div className="flex justify-center space-x-2 mb-4">
        <button
          type="button"
          onClick={() => setUserType("SHOP")}
          className={`px-2 py-1 text-xs rounded-lg border ${
            userType === "SHOP"
              ? "bg-green-500 text-white border-green-500"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          사장이에요
        </button>
        <button
          type="button"
          onClick={() => setUserType("USER")}
          className={`px-2 py-1 text-xs rounded-lg border ${
            userType === "USER"
              ? "bg-green-500 text-white border-green-500"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          고객이에요
        </button>
        <button
          type="button"
          onClick={() => setUserType("DESIGNER")}
          className={`px-2 py-1 text-xs rounded-lg border ${
            userType === "DESIGNER"
              ? "bg-green-500 text-white border-green-500"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          디자이너에요
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="email"
          name="email"
          type="email"
          label="아이디"
          value={formData.email}
          onChange={handleChange}
          placeholder="이메일 주소를 입력하세요"
          error={errors.email}
        />

        <FormInput
          id="password"
          name="password"
          type="password"
          label="비밀번호"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력하세요"
          error={errors.password}
        />

        <button
          type="submit"
          className="w-full mx-auto block py-2 px-4 rounded-md text-white font-medium bg-gray-400 hover:bg-green-500 transition-colors duration-200 mt-4 text-sm"
        >
          로그인
        </button>
      </form>

      {/* 소셜 로그인 버튼 */}
      <SocialLogin />

      <div className="mt-4 text-center">
        <button
          onClick={() => toggleLoginMode(false)}
          className="text-gray-600 hover:text-gray-800 font-medium text-sm"
        >
          아직 계정이 없으신가요?
          <span className="font-bold hover:text-green-500 transition-colors transition duration-500">
            {" "}
            회원가입
          </span>
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
