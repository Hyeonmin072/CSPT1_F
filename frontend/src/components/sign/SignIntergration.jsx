import React, { useState, useEffect } from "react";
import HairismLogo from "../../assets/logo/hairlogo.png";
import LoginForm from "./LoginForm";
import SignupContainer from "./SignupFlow/SignupContainer";

const SignIntegration = ({ isOpen, onClose }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [userType, setUserType] = useState("customer"); // 기본값: 고객

  // 모드 전환 시 로그 추가
  const toggleLoginMode = (isLogin) => {
    setIsLoginForm(isLogin);
    console.log(
      "모드 전환:",
      isLogin ? "로그인으로 전환" : "회원가입으로 전환"
    );
  };

  // 현재 상태 로그 출력
  useEffect(() => {
    console.log("🪪 현재 상태:", isLoginForm ? "로그인" : "회원가입");
  }, [isLoginForm]);

  // 현재 사용자 타입 로그 출력
  useEffect(() => {
    console.log(`🤔 현재 유저 타입 : ${userType}`);
  }, [userType]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
      style={{ margin: 0 }}
    >
      <div
        className="bg-white rounded-lg w-[95%] max-w-4xl mx-auto overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full relative">
          {/* 왼쪽 로그인 섹션 */}
          <div
            className={`w-1/2 p-6 flex flex-col justify-center border-r border-gray-00 transition-opacity duration-500 ease-in-out z-10 ${
              isLoginForm ? "opacity-100" : "opacity-0"
            }`}
          >
            <LoginForm
              userType={userType}
              setUserType={setUserType}
              toggleLoginMode={toggleLoginMode}
              onClose={onClose}
            />
          </div>

          {/* 오른쪽 회원가입 섹션 */}
          <div
            className={`w-1/2 p-6 flex flex-col justify-center transition-opacity duration-500 ease-in-out z-10 ${
              isLoginForm ? "opacity-30" : "opacity-100"
            }`}
          >
            <SignupContainer
              isLoginForm={isLoginForm}
              userType={userType}
              setUserType={setUserType}
              toggleLoginMode={toggleLoginMode}
            />
          </div>

          {/* 로고 레이어 */}
          <div
            className={`absolute top-0 bottom-0 w-1/2 bg-white flex flex-col items-center justify-center transition-all duration-700 ease-in-out z-20 ${
              isLoginForm
                ? "transform translate-x-full opacity-100"
                : "transform translate-x-0 opacity-90"
            }`}
            style={{
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={HairismLogo}
              alt="Hairism 로고"
              className={`w-32 h-auto mb-2 transition-all duration-700 ease-in-out ${
                isLoginForm ? "opacity-100 scale-100" : "opacity-90 scale-95"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIntegration;
