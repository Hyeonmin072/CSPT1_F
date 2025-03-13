import React from "react";
import FormInput from "../shared/FormInput";

const Step2Email = ({
  formData,
  handleChange,
  errors,
  checkEmailDuplicate,
  sendVerificationEmail,
  emailVerified,
  nextStep,
  prevStep,
}) => {
  return (
    <>
      <h3 className="text-center text-sm font-medium mb-4 mt-24">
        이메일을 입력해주세요
      </h3>
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex-grow">
            <input
              type="email"
              id="signup-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
              placeholder="example@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <button
            type="button"
            onClick={checkEmailDuplicate}
            className="ml-2 px-3 py-2 rounded-md text-sm bg-green-300 hover:bg-green-400 text-gray-700 transition-colors whitespace-nowrap"
          >
            중복 확인
          </button>
        </div>

        <div className="flex items-center">
          <button
            type="button"
            onClick={sendVerificationEmail}
            className={`px-3 py-2 rounded-md text-sm flex ml-[150px] ${
              emailVerified
                ? "bg-gray-500 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            } transition-colors`}
            disabled={emailVerified}
          >
            {emailVerified ? "인증 완료" : "이메일 인증"}
          </button>
          {emailVerified && (
            <span className="ml-2 text-green-600 text-xs">
              ✓ 인증되었습니다
            </span>
          )}
        </div>

        <div className="flex justify-center gap-10 mt-10">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 rounded-md text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors text-sm"
          >
            &larr; 이전
          </button>
          <button
            type="button"
            onClick={nextStep}
            disabled={
              Object.keys(errors).length > 0 ||
              !formData.email ||
              !emailVerified
            }
            className={`px-6 py-2 rounded-md text-white font-medium ${
              Object.keys(errors).length > 0 ||
              !formData.email ||
              !emailVerified
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } transition-colors text-sm`}
          >
            다음 &rarr;
          </button>
        </div>
      </div>
    </>
  );
};

export default Step2Email;
