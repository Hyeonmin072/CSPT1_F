import React from "react";
import FormInput from "../shared/FormInput";

const Step4PersonalInfo = ({
  formData,
  handleChange,
  errors,
  nextStep,
  prevStep,
}) => {
  return (
    <>
      <h3 className="text-center text-sm font-medium mb-4 mt-12">
        개인정보를 입력해주세요
      </h3>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            이름
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm`}
            placeholder="이름을 입력해주세요"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            전화번호
          </label>
          <input
            type="tel"
            id="tel"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.tel ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm`}
            placeholder="연락 가능한 전화번호를 입력해주세요"
          />
          {errors.tel && (
            <p className="text-red-500 text-xs mt-1">{errors.tel}</p>
          )}
        </div>

        <div className="flex justify-center mt-6 gap-10">
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
              Object.keys(errors).length > 0 || !formData.name || !formData.tel
            }
            className={`px-6 py-2 rounded-md text-white font-medium ${
              Object.keys(errors).length > 0 || !formData.name || !formData.tel
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

export default Step4PersonalInfo;
