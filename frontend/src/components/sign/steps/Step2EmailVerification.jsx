import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Step2EmailVerification = ({
  email,
  onVerificationComplete,
  nextStep,
  prevStep,
}) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3분
  const [canResend, setCanResend] = useState(false);
  const [resendTimeLeft, setResendTimeLeft] = useState(0);
  const [isInitialVerification, setIsInitialVerification] = useState(true);
  const [verificationSent, setVerificationSent] = useState(false);

  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !isVerified) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft, isVerified]);

  useEffect(() => {
    let timer;
    if (resendTimeLeft > 0) {
      timer = setInterval(() => {
        setResendTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [resendTimeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleVerification = async () => {
    try {
      const response = await axios.post("http://localhost:1271/email/verify", {
        email,
        authNum: verificationCode,
      });

      if (response.data) {
        setIsVerified(true);
        onVerificationComplete(true);
        Swal.fire({
          icon: "success",
          title: "인증 성공",
          text: "이메일 인증이 완료되었습니다.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
      } else {
        setVerificationCode("");
        Swal.fire({
          icon: "error",
          title: "인증 실패",
          text: "인증번호가 일치하지 않습니다.",
          confirmButtonColor: "#d33",
          confirmButtonText: "확인",
        });
      }
    } catch (error) {
      console.error("Verification error:", error);
      setVerificationCode("");
      Swal.fire({
        icon: "error",
        title: "인증 오류",
        text: "이메일 인증 중 오류가 발생했습니다. 다시 시도해주세요.",
        confirmButtonColor: "#d33",
        confirmButtonText: "확인",
      });
    }
  };

  const handleSendVerification = async () => {
    try {
      await axios.post("http://localhost:1271/email/send", {
        email,
      });
      setVerificationSent(true);
      setIsInitialVerification(false);
      setCanResend(false);
      setResendTimeLeft(60);
      setTimeLeft(180); // 3분 타이머 시작
      Swal.fire({
        icon: "success",
        title: "인증번호 발송",
        text: "인증번호가 이메일로 전송되었습니다.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
    } catch (error) {
      console.error("Verification code send error:", error);
      Swal.fire({
        icon: "error",
        title: "인증번호 발송 실패",
        text: "인증번호 발송에 실패했습니다. 다시 시도해주세요.",
        confirmButtonColor: "#d33",
        confirmButtonText: "확인",
      });
    }
  };

  return (
    <>
      <h3 className="text-center text-sm font-medium mb-4 mt-24">
        이메일 인증을 진행해주세요
      </h3>
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex-grow">
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="인증번호 6자리 입력"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <button
            type="button"
            onClick={handleVerification}
            disabled={verificationCode.length !== 6}
            className="ml-2 px-3 py-2 rounded-md text-sm bg-green-600 hover:bg-green-700 text-white transition-colors whitespace-nowrap disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            인증하기
          </button>
        </div>

        <div className="flex justify-center space-x-4">
          {isInitialVerification ? (
            <button
              type="button"
              onClick={handleSendVerification}
              className="px-3 py-2 rounded-md text-sm bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              인증번호 받기
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSendVerification}
              disabled={!canResend || resendTimeLeft > 0}
              className="px-3 py-2 rounded-md text-sm bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {resendTimeLeft > 0
                ? `${resendTimeLeft}초 후 재전송 가능`
                : "인증번호 다시 받기"}
            </button>
          )}
        </div>

        {!isInitialVerification && timeLeft > 0 && !isVerified && (
          <p className="text-center text-sm text-red-500">
            남은 시간: {formatTime(timeLeft)}
          </p>
        )}
      </div>
    </>
  );
};

export default Step2EmailVerification;
