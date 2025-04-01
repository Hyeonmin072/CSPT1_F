import React from "react";

const StepProgress = ({ currentStep, totalSteps }) => {
  const steps = [
    { step: 1, label: "회원 유형" },
    { step: 2, label: "아이디" },
    { step: 3, label: "이메일" },
    { step: 4, label: "비밀번호" },
    { step: 5, label: "개인정보" },
    { step: 6, label: "추가정보" },
  ];

  return (
    <div className="w-full py-4">
      <div className="flex justify-between items-center mb-4">
        {steps.map(({ step, label }) => (
          <div
            key={step}
            className="flex flex-col items-center relative"
            style={{ width: "16.666%" }}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${
                currentStep === step
                  ? "bg-green-500 text-white"
                  : currentStep > step
                  ? "bg-green-200 text-gray-700"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step}
            </div>
            <div
              className={`text-xs text-center ${
                currentStep === step
                  ? "text-green-500 font-medium"
                  : "text-gray-500"
              }`}
            >
              {label}
            </div>
            {step < totalSteps && (
              <div
                className={`absolute left-1/2 top-4 w-full h-0.5 -z-10 ${
                  currentStep > step ? "bg-green-200" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepProgress;
