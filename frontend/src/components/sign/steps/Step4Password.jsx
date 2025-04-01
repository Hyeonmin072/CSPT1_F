import React from "react";
import FormInput from "../shared/FormInput";

const Step4Password = ({
  formData,
  handleChange,
  errors,
  nextStep,
  prevStep,
}) => {
  return (
    <>
      <h3 className="text-center text-sm font-medium mb-4 mt-12">
        비밀번호를 설정해주세요
      </h3>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="signup-password"
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            비밀번호
          </label>
          <input
            type="password"
            id="signup-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm`}
            placeholder="6자 이상 입력해주세요"
          />
          {errors.password && (
            <p
              className="text-red-500 text-xs mt-1"
              style={{
                animation: "fadeIn 1s ease-in-out",
              }}
            >
              {errors.password}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="signup-confirm-password"
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            비밀번호 확인
          </label>
          <input
            type="password"
            id="signup-confirm-password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm`}
            placeholder="비밀번호를 다시 입력해주세요"
          />
          {errors.confirmPassword && (
            <p
              className="text-red-500 text-xs mt-1"
              style={{
                animation: "fadeIn 1s ease-in-out",
              }}
            >
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="flex mt-10 ml-[305px]">
          <button
            type="button"
            onClick={() => nextStep(1)}
            disabled={
              !formData.password ||
              !formData.confirmPassword ||
              Object.keys(errors).length > 0
            }
            className={`px-6 py-2 rounded-md text-white font-medium ${
              formData.password &&
              formData.confirmPassword &&
              Object.keys(errors).length === 0
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            } transition-colors text-sm`}
          >
            다음 &rarr;
          </button>
        </div>
      </div>
    </>
  );
};

export default Step4Password;
