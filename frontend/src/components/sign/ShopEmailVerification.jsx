import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ShopEmailVerification = ({ email, onVerificationComplete }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendTimeLeft, setResendTimeLeft] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !isVerified) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft, isVerified]);

  useEffect(() => {
    let timer;
    if (resendTimeLeft > 0 && isResendDisabled) {
      timer = setInterval(() => {
        setResendTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (resendTimeLeft === 0) {
      setIsResendDisabled(false);
    }
    return () => clearInterval(timer);
  }, [resendTimeLeft, isResendDisabled]);

  const handleVerification = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/verify-email",
        {
          email: email,
          code: verificationCode,
          userType: "SHOP",
        }
      );

      if (response.data.success) {
        setIsVerified(true);
        onVerificationComplete(true);
        Swal.fire({
          icon: "success",
          title: "이메일 인증 완료",
          text: "이메일 인증이 완료되었습니다.",
          confirmButtonText: "확인",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "인증 실패",
        text: "인증 코드가 올바르지 않습니다.",
        confirmButtonText: "확인",
      });
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/resend-verification",
        {
          email: email,
          userType: "SHOP",
        }
      );

      if (response.data.success) {
        setTimeLeft(180);
        setIsResendDisabled(true);
        setResendTimeLeft(60);
        Swal.fire({
          icon: "success",
          title: "인증 코드 재전송",
          text: "새로운 인증 코드가 이메일로 전송되었습니다.",
          confirmButtonText: "확인",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "재전송 실패",
        text: "인증 코드 재전송에 실패했습니다.",
        confirmButtonText: "확인",
      });
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          사업자 이메일 인증
        </h2>
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            {email}로 전송된 인증 코드를 입력해주세요.
          </p>
          <p className="mt-2 text-sm text-red-500">
            남은 시간: {formatTime(timeLeft)}
          </p>
        </div>
        <div className="mb-6">
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="인증 코드 입력"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isVerified}
          />
        </div>
        <div className="flex flex-col gap-4">
          <button
            onClick={handleVerification}
            disabled={isVerified || verificationCode.length !== 6}
            className={`w-full py-2 text-white rounded-md ${
              isVerified || verificationCode.length !== 6
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isVerified ? "인증 완료" : "인증하기"}
          </button>
          <button
            onClick={handleResendCode}
            disabled={isResendDisabled || isVerified}
            className={`w-full py-2 text-blue-500 border border-blue-500 rounded-md ${
              isResendDisabled || isVerified
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-50"
            }`}
          >
            {isResendDisabled
              ? `재전송 가능까지 ${resendTimeLeft}초`
              : "인증 코드 재전송"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopEmailVerification;
