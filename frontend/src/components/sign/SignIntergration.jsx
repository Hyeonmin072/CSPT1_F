import React, { useState, useEffect } from "react";
import HairismLogo from "../../assets/logo/hairlogo.png";
import LoginForm from "./LoginForm";
import SignupContainer from "./SignupFlow/SignupContainer";

const SignIntegration = ({ isOpen, onClose }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [userType, setUserType] = useState("USER"); // 기본값: USER로 변경

  // 모드 전환 시 로그 추가
  const toggleLoginMode = (isLogin) => {
    setIsLoginForm(isLogin);
    console.log(
      isLogin
        ? "⬅️ 모드 전환:로그인으로 전환"
        : "➡️ 모드 전환:회원가입으로 전환"
    );
  };

  // 현재 상태 로그 출력
  useEffect(() => {
    console.log("🪪 현재 상태:", isLoginForm ? "로그인" : "회원가입");
  }, [isLoginForm]);

  // 현재 사용자 타입 로그 출력
  useEffect(() => {
    console.log(`🤔 현재 로그인 모달 유저 타입 : ${userType}`);
  }, [userType]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
      style={{ margin: 0 }}
    >
      <div
        className={`bg-white rounded-lg w-[95%] max-w-4xl mx-auto transition-all duration-500 ease-out ${
          isLoginForm ? "h-[480px]" : "h-[560px]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full h-full relative overflow-hidden">
          {/* 왼쪽 로그인 섹션 */}
          <div
            className={`w-1/2 p-6 flex flex-col justify-center border-r border-gray-200 transition-all duration-500 ease-out ${
              isLoginForm
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-12"
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
            className={`w-1/2 p-6 flex flex-col justify-center overflow-y-auto scrollbar-hide transition-opacity transition-transform duration-500 ease-out ${
              isLoginForm
                ? "opacity-20 translate-y-12"
                : "opacity-100 translate-y-0"
            }`}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitScrollbar: "none",
            }}
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
            className={`absolute top-0 bottom-0 w-1/2 bg-white flex flex-col items-center justify-center transition-all duration-500 ease-out shadow-lg rounded-lg ${
              isLoginForm
                ? "transform translate-x-full opacity-100"
                : "transform translate-x-0 opacity-90"
            }`}
          >
            <img
              src={HairismLogo}
              alt="Hairism 로고"
              className="w-32 h-auto mb-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIntegration;
