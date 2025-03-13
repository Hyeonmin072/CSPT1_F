import React from "react";

const StepProgress = ({ currentStep, totalSteps }) => {
  const steps = [
    "유형 선택",
    "이메일 인증",
    "비밀번호",
    "유저 정보",
    "추가 정보",
  ];

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1">
        {steps.map((step, index) => (
          <span
            key={index}
            className={`text-xs ${
              index < currentStep
                ? "text-green-600 font-medium"
                : "text-gray-500"
            }`}
          >
            {step}
          </span>
        ))}
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StepProgress;
