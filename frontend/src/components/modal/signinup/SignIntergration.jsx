import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Overlay } from "../../overlay/OverLay";

const SignIntegration = ({ isOpen, onClose }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    } else if (formData.password.length < 6) {
      newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다";
    }

    if (!isLoginForm) {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "비밀번호가 일치하지 않습니다";
      }
      if (!formData.name) {
        newErrors.name = "이름을 입력해주세요";
      }
      if (!formData.phone) {
        newErrors.phone = "전화번호를 입력해주세요";
      }
    }

    setErrors(newErrors);

    // 오류가 있는 경우 Sweetalert2로 알림
    if (Object.keys(newErrors).length > 0) {
      const errorMessages = Object.values(newErrors).join("\n");
      Swal.fire({
        icon: "warning",
        title: "입력 오류",
        text: Object.values(newErrors)[0], // 첫 번째 오류 메시지만 표시
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isLoginForm) {
        console.log("로그인 시도:", {
          email: formData.email,
          password: formData.password,
        });

        // 로그인 성공 시 Sweet Alert로 알림
        await Swal.fire({
          icon: "success",
          title: "로그인 성공!",
          text: "환영합니다!",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
      } else {
        console.log("회원가입 시도:", formData);

        // 회원가입 성공 시 Sweet Alert로 알림
        await Swal.fire({
          icon: "success",
          title: "회원가입 완료!",
          text: "회원가입이 성공적으로 완료되었습니다.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
      }
      onClose();
    } catch (error) {
      console.error("Error:", error);

      // 오류 발생 시 Sweet Alert로 에러 메시지 표시
      Swal.fire({
        icon: "error",
        title: "오류 발생",
        text: isLoginForm
          ? "로그인에 실패했습니다. 다시 시도해주세요."
          : "회원가입에 실패했습니다. 다시 시도해주세요.",
        confirmButtonColor: "#d33",
        confirmButtonText: "확인",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay 컴포넌트 사용 */}
      <Overlay isOpen={isOpen} onClose={onClose}>
        <div className="bg-white rounded-lg w-[98%] max-w-4xl mx-auto overflow-hidden relative">
          {/* 현재 모달 콘텐츠 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10"
          >
            {/* 닫기 버튼 */}
          </button>

          <div className="flex w-full">{/* 로그인 및 회원가입 섹션 */}</div>
        </div>
      </Overlay>

      {/* 모달 컨텐츠 - 중앙 정렬 및 크기 최적화 */}
      <div className="fixed inset-0 flex items-center justify-center z-40">
        <div className="bg-white rounded-lg w-[95%] max-w-4xl mx-auto overflow-hidden relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex w-full">
            {/* 왼쪽 로그인 섹션 */}
            <div className="w-1/2 p-6 flex flex-col justify-center border-r border-gray-200">
              <div className="w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">로그인</h2>

                <form
                  onSubmit={
                    isLoginForm ? handleSubmit : (e) => e.preventDefault()
                  }
                  className="space-y-3"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      아이디
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="이메일 주소를 입력하세요"
                    />
                    {isLoginForm && errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      비밀번호
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="비밀번호를 입력하세요"
                    />
                    {isLoginForm && errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full mx-auto block py-2 px-4 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 transition-colors duration-200 mt-4"
                  >
                    로그인
                  </button>
                </form>

                <div className="mt-4">
                  <button
                    onClick={() => setIsLoginForm(false)}
                    className="w-full mx-auto block py-2 px-4 rounded-md text-gray-700 font-medium border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                  >
                    회원가입
                  </button>
                </div>
              </div>
            </div>

            {/* 오른쪽 회원가입 섹션 */}
            <div className="w-1/2 relative">
              {/* 로고 레이어 - absolute로 회원가입 폼 위에 배치 */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center bg-white transition-transform duration-500 ease-in-out ${
                  isLoginForm ? "" : "translate-x-[-100%]"
                }`}
              >
                <div className="w-40 h-28 border border-gray-300 mb-4"></div>
                <h1 className="text-3xl font-bold">Hairlism</h1>
              </div>

              {/* 회원가입 폼 - 로고 아래에 있다가 로고가 이동하면 보임 */}
              <div className="w-full h-full p-6 flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  회원가입
                </h2>

                <form
                  onSubmit={
                    !isLoginForm ? handleSubmit : (e) => e.preventDefault()
                  }
                  className="space-y-2"
                >
                  <div>
                    <label
                      htmlFor="signup-email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      이메일
                    </label>
                    <input
                      type="email"
                      id="signup-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {!isLoginForm && errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="signup-password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      비밀번호
                    </label>
                    <input
                      type="password"
                      id="signup-password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {!isLoginForm && errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      비밀번호 확인
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {!isLoginForm && errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      이름
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {!isLoginForm && errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      전화번호
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {!isLoginForm && errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full mx-auto block py-2 px-4 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 transition-colors duration-200 mt-4"
                  >
                    회원가입
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => setIsLoginForm(true)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    로그인으로 돌아가기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIntegration;
