import React from "react";
import FormInput from "../shared/FormInput";

const Step5TypeSpecific = ({
  userType,
  formData,
  handleChange,
  errors,
  prevStep,
  handleSubmit,
}) => {
  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <h3 className="text-center text-sm font-medium mb-4">
          {userType === "customer"
            ? "고객 추가 정보"
            : userType === "owner"
            ? "사장님 추가 정보"
            : "디자이너 추가 정보"}
        </h3>

        <div className="space-y-4">
          {/* 사장님에게만 필요한 필드 */}
          {userType === "owner" && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                사업자 등록번호
              </label>
              <input
                type="text"
                name="bizId"
                value={formData.bizId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="사업자 등록번호를 입력하세요"
              />
              {errors.bizId && (
                <p className="text-red-500 text-xs mt-1">{errors.bizId}</p>
              )}
            </div>
          )}

          {/* 디자이너에게만 필요한 필드 */}
          {userType === "designer" && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                닉네임
              </label>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="닉네임을 입력하세요"
              />
              {errors.nickname && (
                <p className="text-red-500 text-xs mt-1">{errors.nickname}</p>
              )}
            </div>
          )}

          {/* 고객과 사장님에게 필요한 주소 필드 */}
          {(userType === "customer" || userType === "owner") && (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  우편번호
                </label>
                <div className="flex">
                  <input
                    type="text"
                    name="post"
                    value={formData.post}
                    onChange={handleChange}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="우편번호"
                    readOnly
                  />
                  <button
                    type="button"
                    className="ml-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300"
                    onClick={() => {
                      /* 우편번호 검색 기능 */
                    }}
                  >
                    우편번호 검색
                  </button>
                </div>
                {errors.post && (
                  <p className="text-red-500 text-xs mt-1">{errors.post}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  주소
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="주소를 입력하세요"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>
            </>
          )}

          {/* 고객과 디자이너에게 필요한 생년월일, 성별 필드 */}
          {(userType === "customer" || userType === "designer") && (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  생년월일
                </label>
                <input
                  type="date"
                  name="birth"
                  value={formData.birth}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                {errors.birth && (
                  <p className="text-red-500 text-xs mt-1">{errors.birth}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  성별
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">남성</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">여성</span>
                  </label>
                </div>
                {errors.gender && (
                  <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="mt-9">
        {/* 이전/완료 버튼 */}
        <div className="flex justify-center gap-10">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 rounded-md text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors text-sm"
          >
            &larr; 이전
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-md text-white font-medium bg-green-600 hover:bg-green-700 transition-colors text-sm"
          >
            가입 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step5TypeSpecific;
