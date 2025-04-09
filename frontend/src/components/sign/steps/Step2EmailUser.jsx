import React from "react";
import Swal from "sweetalert2";

const Step2EmailUser = ({
  formData,
  handleChange,
  errors,
  checkEmailDuplicate,
  nextStep,
  prevStep,
  emailVerified,
  setEmailVerified,
}) => {
  const handleDuplicateCheck = async () => {
    try {
      const response = await checkEmailDuplicate(formData.email);
      console.log("중복 확인 응답:", response);

      if (response.data.isDuplicate) {
        console.log("중복된 이메일 처리");
        setEmailVerified(false);
        Swal.fire({
          icon: "error",
          title: "중복된 이메일",
          text: "이미 사용 중인 이메일입니다.",
          confirmButtonColor: "#d33",
          confirmButtonText: "확인",
        });
      } else {
        console.log("사용 가능한 이메일 처리");
        setEmailVerified(true);
        Swal.fire({
          icon: "success",
          title: "사용 가능한 이메일",
          text: "해당 이메일은 사용 가능합니다.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
      }
    } catch (error) {
      console.error("이메일 중복 확인 오류:", error);
      setEmailVerified(false);
      Swal.fire({
        icon: "error",
        title: "오류 발생",
        text: "이메일 중복 확인 중 오류가 발생했습니다.",
        confirmButtonColor: "#d33",
        confirmButtonText: "확인",
      });
    }
  };

  return (
    <>
      <h3 className="text-center text-sm font-medium mb-4 mt-24">
        고객 이메일을 입력해주세요
      </h3>
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex-grow">
            <input
              type="email"
              id="signup-email"
              name="email"
              value={formData.email}
              onChange={(e) => {
                handleChange(e);
                setEmailVerified(false);
              }}
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
              placeholder="user@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleDuplicateCheck}
            className="ml-2 px-3 py-2 rounded-md text-sm bg-green-300 hover:bg-green-400 text-gray-700 transition-colors whitespace-nowrap"
          >
            중복 확인
          </button>
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
              !emailVerified ||
              Object.keys(errors).length > 0 ||
              !formData.email
            }
            className={`px-6 py-2 rounded-md text-white font-medium ${
              !emailVerified ||
              Object.keys(errors).length > 0 ||
              !formData.email
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

export default Step2EmailUser;
