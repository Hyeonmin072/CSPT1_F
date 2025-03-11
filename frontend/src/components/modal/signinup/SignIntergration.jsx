import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Overlay } from "../../overlay/OverLay";
import HairismLogo from "../../../assets/logo/hairlogo.png";

const SignIntegration = ({ isOpen, onClose }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [currentStep, setCurrentStep] = useState(1); // 회원가입 단계
  const [formData, setFormData] = useState({
    //공통 필드
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    tel: "",

    //유저 필드(none)

    //사장 필드
    bizId: "",

    //디자이너 필드
    nickname: "",

    //사장, 디자이너 공통 필드(none)

    //유저, 사장 공통 필드
    adrees: "",
    post: "",

    //디자이너, 유저 공통 필드
    birth: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const [userType, setUserType] = useState("customer"); // 기본값: 고객
  const [emailVerified, setEmailVerified] = useState(false); // 이메일 인증 상태
  const navigate = useNavigate();

  // 5단계 (유저 타입별 추가 정보) 렌더링 함수
  const renderUserTypeSpecificForm = () => {
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
                  placeholder="활동할 닉네임을 입력하세요"
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
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address}
                    </p>
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
        <div className="mt-[55px]">
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
              className="px-6 py-2 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 transition-colors text-sm"
            >
              가입 완료
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 현재 상태 로그 출력
  useEffect(() => {
    console.log("🪪 현재 상태:", isLoginForm ? "로그인" : "회원가입");
  }, [isLoginForm]);

  // 현재 사용자 타입 로그 출력
  useEffect(() => {
    console.log(`🤔 현재 유저 타입 : ${userType}`);
  }, [userType]);

  // 현재 회원가입 단계 로그 출력
  useEffect(() => {
    if (!isLoginForm) {
      console.log(`📝 현재 회원가입 단계: ${currentStep}`);
    }
  }, [currentStep, isLoginForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 단계별 유효성 검사
  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1: // 유저 타입 선택 단계
        // 유저 타입은 기본값이 설정되어 있으므로 별도 검증 불필요
        break;
      case 2: // 이메일 입력 단계
        if (!formData.email) {
          newErrors.email = "이메일을 입력해주세요";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "올바른 이메일 형식이 아닙니다";
        } else if (!emailVerified) {
          newErrors.email = "이메일 인증이 필요합니다";
        }
        break;
      case 3: // 비밀번호 입력 단계
        if (!formData.password) {
          newErrors.password = "비밀번호를 입력해주세요";
        } else if (formData.password.length < 6) {
          newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다";
        }

        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "비밀번호가 일치하지 않습니다";
        }
        break;
      case 4: // 개인정보 입력 단계
        if (!formData.name) {
          newErrors.name = "이름을 입력해주세요";
        }
        if (!formData.phone) {
          newErrors.phone = "전화번호를 입력해주세요";
        }
        break;
      default:
        break;
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
      return false;
    }
    return true;
  };

  // 다음 단계로 진행
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  // 이전 단계로 돌아가기
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // 이메일 중복 검사
  const checkEmailDuplicate = async () => {
    try {
      // 여기에 이메일 중복 검사 API 호출 코드를 추가
      console.log("이메일 중복 검사 시도:", formData.email);

      // 임시로 성공했다고 가정
      await Swal.fire({
        icon: "success",
        title: "사용 가능한 이메일",
        text: "해당 이메일은 사용 가능합니다.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      return true;
    } catch (error) {
      console.error("이메일 중복 검사 오류:", error);
      Swal.fire({
        icon: "error",
        title: "중복된 이메일",
        text: "이미 사용 중인 이메일입니다.",
        confirmButtonColor: "#d33",
        confirmButtonText: "확인",
      });
      return false;
    }
  };

  // 이메일 인증
  const sendVerificationEmail = async () => {
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      Swal.fire({
        icon: "warning",
        title: "유효하지 않은 이메일",
        text: "올바른 이메일 주소를 입력해주세요.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      return;
    }

    try {
      // 여기에 이메일 인증 코드 발송 API 호출 코드를 추가
      console.log("인증 이메일 발송 시도:", formData.email);

      // 임시로 인증 코드 입력 다이얼로그 표시
      const { value: verificationCode } = await Swal.fire({
        title: "인증 코드 입력",
        input: "text",
        inputLabel: `${formData.email}로 전송된 인증 코드를 입력하세요`,
        inputPlaceholder: "인증 코드",
        showCancelButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
        inputValidator: (value) => {
          if (!value) {
            return "인증 코드를 입력해주세요";
          }
        },
      });

      if (verificationCode) {
        // 인증 코드 검증 (예시 코드)
        if (verificationCode === "123456" || verificationCode) {
          // 임시로 모든 코드 허용
          Swal.fire({
            icon: "success",
            title: "인증 성공",
            text: "이메일 인증이 완료되었습니다.",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "확인",
          });
          setEmailVerified(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "인증 실패",
            text: "잘못된 인증 코드입니다. 다시 시도해주세요.",
            confirmButtonColor: "#d33",
            confirmButtonText: "확인",
          });
        }
      }
    } catch (error) {
      console.error("이메일 인증 오류:", error);
      Swal.fire({
        icon: "error",
        title: "인증 오류",
        text: "이메일 인증 중 오류가 발생했습니다. 다시 시도해주세요.",
        confirmButtonColor: "#d33",
        confirmButtonText: "확인",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoginForm) {
      // 로그인 처리
      if (!validateForm()) return;

      try {
        console.log("로그인 시도:", {
          email: formData.email,
          password: formData.password,
          userType: userType,
        });

        // 로그인 성공 시 Sweet Alert로 알림
        await Swal.fire({
          icon: "success",
          title: "로그인 성공!",
          text: "환영합니다!",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
        onClose();
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "오류 발생",
          text: "로그인에 실패했습니다. 다시 시도해주세요.",
          confirmButtonColor: "#d33",
          confirmButtonText: "확인",
        });
      }
    } else {
      // 회원가입 완료 처리 (마지막 단계에서만)
      if (currentStep === 5 && validateStep(currentStep)) {
        try {
          // 모든 사용자 타입에 공통으로 필요한 기본 데이터
          const commonData = {
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            name: formData.name,
            tel: formData.tel,
          };

          // 사용자 타입에 따라 필요한 추가 데이터 구성
          let typeSpecificData = {};

          switch (userType) {
            case "customer": // 일반 유저 추가데이터
              typeSpecificData = {
                address: formData.address,
                post: formData.post,
                birth: formData.birth,
                gender: formData.gender,
              };
              break;

            case "owner": // 사장 추가 데이터
              typeSpecificData = {
                bizId: formData.bizId,
                address: formData.address,
                post: formData.post,
              };
              break;

            case "designer": // 디자이너 추가 데이터
              typeSpecificData = {
                nickname: formData.nickname,
                birth: formData.birth,
                gender: formData.gender,
              };
              break;

            default:
              break;
          }

          // 최종 제출 데이터 (공통 + 타입별 데이터 병합)
          const submitData = {
            ...commonData,
            ...typeSpecificData,
          };

          console.log("회원가입 데이터 전송:", submitData);

          // API 호출 코드 (예시)
          // const response = await registerUser(submitData);

          // 성공 시 처리
          await Swal.fire({
            icon: "success",
            title: "회원가입 완료!",
            text: "회원가입이 성공적으로 완료되었습니다.",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "확인",
          });

          // 회원가입 완료 후 로그인 폼으로 전환
          setIsLoginForm(true);
          resetForm();
        } catch (error) {
          console.error("회원가입 오류:", error);
          Swal.fire({
            icon: "error",
            title: "오류 발생",
            text: "회원가입에 실패했습니다. 다시 시도해주세요.",
            confirmButtonColor: "#d33",
            confirmButtonText: "확인",
          });
        }
      }
    }
  };

  // 전체 폼 유효성 검사 (로그인용)
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

  const handleSocialLogin = (provider) => {
    console.log(`${provider} 로그인 시도`);
    // 소셜 로그인 로직 구현
  };

  // 모드 전환 시 로그 추가
  const toggleLoginMode = (isLogin) => {
    setIsLoginForm(isLogin);
    resetForm();
    console.log(
      "모드 전환:",
      isLogin ? "로그인으로 전환" : "회원가입으로 전환"
    );
  };

  // 폼 초기화
  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: "",
    });
    setErrors({});
    setCurrentStep(1);
    setEmailVerified(false);
  };

  // 회원가입 단계별 컴포넌트 렌더링
  const renderSignupStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h3 className="text-center text-sm font-medium mb-4">
              어떤 유형의 사용자인가요?
            </h3>
            <div className="flex justify-center space-x-3 mb-5">
              <button
                type="button"
                onClick={() => setUserType("owner")}
                className={`px-4 py-2 text-sm rounded-lg border transition-all ${
                  userType === "owner"
                    ? "bg-blue-500 text-white border-blue-500 shadow-md transform scale-105"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                사장
              </button>
              <button
                type="button"
                onClick={() => setUserType("customer")}
                className={`px-4 py-2 text-sm rounded-lg border transition-all ${
                  userType === "customer"
                    ? "bg-blue-500 text-white border-blue-500 shadow-md transform scale-105"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                고객
              </button>
              <button
                type="button"
                onClick={() => setUserType("designer")}
                className={`px-4 py-2 text-sm rounded-lg border transition-all ${
                  userType === "designer"
                    ? "bg-blue-500 text-white border-blue-500 shadow-md transform scale-105"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                디자이너
              </button>
            </div>
            <div className="flex justify-center mt-auto mt-6">
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 transition-colors text-sm"
              >
                다음 &rarr;
              </button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-center text-sm font-medium mb-4">
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
                  className="ml-2 px-3 py-2 rounded-md text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors whitespace-nowrap"
                >
                  중복 확인
                </button>
              </div>

              <div className="flex items-center">
                <button
                  type="button"
                  onClick={sendVerificationEmail}
                  className={`px-3 py-2 rounded-md text-sm ${
                    emailVerified
                      ? "bg-green-500 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
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
                  className="px-6 py-2 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 transition-colors text-sm"
                >
                  다음 &rarr;
                </button>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h3 className="text-center text-sm font-medium mb-4">
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
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                  placeholder="6자 이상 입력해주세요"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  비밀번호 확인
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                  placeholder="비밀번호를 다시 입력해주세요"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 rounded-md text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors text-sm"
                >
                  &larr; 이전
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 transition-colors text-sm"
                >
                  다음 &rarr;
                </button>
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h3 className="text-center text-sm font-medium mb-4">
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
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
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
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                  placeholder="연락 가능한 전화번호를 입력해주세요"
                />
                {errors.tel && (
                  <p className="text-red-500 text-xs mt-1">{errors.tel}</p>
                )}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 rounded-md text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors text-sm"
                >
                  &larr; 이전
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 rounded-md text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors text-sm"
                >
                  &larr; 다음
                </button>
              </div>
            </div>
          </>
        );
      case 5:
        return renderUserTypeSpecificForm(); // 유저 타입별 추가 정보 단계
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay 컴포넌트 사용 */}
      <Overlay isOpen={isOpen} onClose={onClose}>
        <div className="bg-white rounded-lg w-[98%] max-w-4xl mx-auto overflow-hidden relative">
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10"
          >
            {/* 닫기 버튼 */}
          </button>
        </div>
      </Overlay>

      {/* 모달 컨텐츠 - 중앙 정렬 및 크기 최적화 */}
      <div className="fixed inset-0 flex items-center justify-center z-40">
        <div className="bg-white rounded-lg w-[95%] max-w-4xl max-h-[90vh] mx-auto overflow-hidden relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 z-30"
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

          <div className="flex w-full relative">
            {/* 왼쪽 로그인 섹션 */}
            <div
              className={`w-1/2 p-6 flex flex-col justify-center border-r border-gray-300 transition-opacity duration-500 ease-in-out z-10 ${
                isLoginForm ? "opacity-100" : "opacity-30"
              }`}
            >
              <div className="w-full">
                <h2 className="text-xl font-bold mb-4 text-center">로그인</h2>

                {/* 사용자 유형 선택 버튼 */}
                <div className="flex justify-center space-x-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setUserType("owner")}
                    className={`px-2 py-1 text-xs rounded-full border ${
                      userType === "owner"
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    사장이에요
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType("customer")}
                    className={`px-2 py-1 text-xs rounded-full border ${
                      userType === "customer"
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    고객이에요
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType("designer")}
                    className={`px-2 py-1 text-xs rounded-full border ${
                      userType === "designer"
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    디자이너에요
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      아이디
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="이메일 주소를 입력하세요"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      비밀번호
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="비밀번호를 입력하세요"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full mx-auto block py-2 px-4 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 transition-colors duration-200 mt-4 text-sm"
                  >
                    로그인
                  </button>
                </form>

                {/* 소셜 로그인 버튼 */}
                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => handleSocialLogin("google")}
                    className="w-full mx-auto flex items-center justify-center py-2 px-4 rounded-md text-gray-700 font-medium border border-gray-300 hover:bg-gray-50 transition-colors duration-200 text-sm"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                        fill="#4285F4"
                      />
                    </svg>
                    Google 로그인
                  </button>

                  <button
                    onClick={() => handleSocialLogin("kakao")}
                    className="w-full mx-auto flex items-center justify-center py-2 px-4 rounded-md text-gray-800 font-medium bg-yellow-300 hover:bg-yellow-400 transition-colors duration-200 text-sm"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 3C5.9 3 1 6.9 1 11.3c0 2.5 1.4 4.7 3.5 6.3-.4 1.6-1.4 5.2-1.5 5.6 0 .1 0 .2.1.3.1.1.3.2.5.1l6.6-3.7c.6.1 1.2.1 1.8.1 6.1 0 11-3.9 11-8.7S18.1 3 12 3"
                        fill="#000000"
                      />
                    </svg>
                    Kakao 로그인
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => toggleLoginMode(false)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    아직 계정이 없으신가요? 회원가입
                  </button>
                </div>
              </div>
            </div>

            {/* 오른쪽 회원가입 섹션 - 단계별 양식 */}
            <div
              className={`w-1/2 p-6 flex flex-col justify-center transition-opacity duration-500 ease-in-out z-10 ${
                isLoginForm ? "opacity-30" : "opacity-100"
              }`}
            >
              <div className="w-full">
                <h2 className="text-xl font-bold mb-4 text-center">회원가입</h2>

                {/* 단계 표시 바 */}
                {!isLoginForm && (
                  <div className="mb-6">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500">유형 선택</span>
                      <span className="text-xs text-gray-500">이메일 인증</span>
                      <span className="text-xs text-gray-500">비밀번호</span>
                      <span className="text-xs text-gray-500">유저 정보</span>
                      <span className="text-xs text-gray-500">추가 정보</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all duration-300 ease-out"
                        style={{ width: `${(currentStep / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* 단계별 컨텐츠 */}
                {!isLoginForm && (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col min-h-[320px]"
                  >
                    {renderSignupStep()}
                  </form>
                )}

                {/* 로그인으로 돌아가기 버튼 - 맨 아래에 고정 */}
                {!isLoginForm && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => toggleLoginMode(true)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      이미 계정이 있으신가요? 로그인
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 로고 레이어 - 이제 가장 위에 위치하며 부드러운 이동 애니메이션 적용 */}
            <div
              className={`absolute top-0 bottom-0 w-1/2 bg-white flex flex-col items-center justify-center transition-all duration-700 ease-in-out z-20 ${
                isLoginForm
                  ? "transform translate-x-full opacity-100"
                  : "transform translate-x-0 opacity-90"
              }`}
              style={{
                boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={HairismLogo}
                alt="Hairism 로고"
                className={`w-32 h-auto mb-2 transition-all duration-700 ease-in-out ${
                  isLoginForm ? "opacity-100 scale-100" : "opacity-90 scale-95"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIntegration;
