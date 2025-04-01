//eslint-disable
import React, { useState } from "react";
import Swal from "sweetalert2";

const Step5TypeSpecific = ({
  userType,
  formData,
  handleChange,
  errors,
  prevStep,
  handleSubmit,
  checkNicknameDuplicate,
}) => {
  const [nicknameVerified, setNicknameVerified] = useState(false);

  const handleNicknameDuplicateCheck = async () => {
    try {
      // 닉네임 유효성 검사
      const nickname = formData.nickname.trim();
      if (!nickname) {
        Swal.fire({
          icon: "error",
          title: "입력 오류",
          text: "닉네임을 입력해주세요.",
          confirmButtonColor: "#d33",
          confirmButtonText: "확인",
        });
        return;
      }

      // 닉네임 형식 검사 (영문, 숫자, 한글만 허용)
      if (!/^[a-zA-Z0-9가-힣]+$/.test(nickname)) {
        Swal.fire({
          icon: "error",
          title: "입력 오류",
          text: "닉네임은 영문, 숫자, 한글만 사용할 수 있습니다.",
          confirmButtonColor: "#d33",
          confirmButtonText: "확인",
        });
        return;
      }

      const response = await checkNicknameDuplicate(nickname);
      if (response.data.isDuplicate) {
        setNicknameVerified(false);
        Swal.fire({
          icon: "error",
          title: "중복된 닉네임",
          text: "이미 사용 중인 닉네임입니다.",
          confirmButtonColor: "#d33",
          confirmButtonText: "확인",
        });
      } else {
        setNicknameVerified(true);
        Swal.fire({
          icon: "success",
          title: "사용 가능한 닉네임",
          text: "해당 닉네임은 사용 가능합니다.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
      }
    } catch (error) {
      console.error("닉네임 중복 확인 오류:", error);
      Swal.fire({
        icon: "error",
        title: "오류 발생",
        text: "닉네임 중복 확인 중 오류가 발생했습니다.",
        confirmButtonColor: "#d33",
        confirmButtonText: "확인",
      });
    }
  };

  const renderDesignerFields = () => (
    <div className="space-y-4">
      <div className="flex items-start">
        <div className="flex-grow">
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={(e) => {
              handleChange(e);
              setNicknameVerified(false);
            }}
            placeholder="닉네임을 입력해주세요"
            className={`w-full px-3 py-2 border ${
              errors.nickname ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
          />
          {errors.nickname && (
            <p className="text-red-500 text-xs mt-1">{errors.nickname}</p>
          )}
        </div>
        <button
          type="button"
          onClick={handleNicknameDuplicateCheck}
          disabled={!formData.nickname}
          className="ml-2 px-3 py-2 rounded-md text-sm bg-green-300 hover:bg-green-400 text-gray-700 transition-colors whitespace-nowrap disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          중복 확인
        </button>
      </div>
      {/* 기존 생년월일, 성별 필드 */}
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
        <label className="flex justify-center block text-xs font-medium text-gray-700 mb-1">
          성별
        </label>
        <div className="flex space-x-4 justify-center">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="gender"
              value="MALE"
              checked={formData.gender === "MALE"}
              onChange={handleChange}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-700">남성</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="gender"
              value="FEMALE"
              checked={formData.gender === "FEMALE"}
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
    </div>
  );

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
          {userType === "designer" && renderDesignerFields()}

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
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="mt-9">
        {/* 완료 버튼 */}
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
            onClick={handleSubmit}
            disabled={userType === "designer" && !nicknameVerified}
            className={`px-6 py-2 rounded-md text-white font-medium ${
              userType === "designer" && !nicknameVerified
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } transition-colors text-sm`}
          >
            가입하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step5TypeSpecific;
