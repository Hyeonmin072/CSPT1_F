import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import StepProgress from "./StepProgress";
import Step1UserType from "../steps/Step1UserType";
import Step2Email from "../steps/Step2Email";
import Step2EmailVerification from "../steps/Step2EmailVerification";
import Step4Password from "../steps/Step4Password";
import Step4PersonalInfo from "../steps/Step4PersonalInfo";
import Step5TypeSpecific from "../steps/Step5TypeSpecific";
import { signupApi } from "../axios/authApi";
import axios from "axios";

const SignupContainer = ({
  isLoginForm,
  userType,
  setUserType,
  toggleLoginMode,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [emailVerified, setEmailVerified] = useState(false);
  const [formData, setFormData] = useState({
    // 공통 필드
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    tel: "",

    // 사장 필드
    bizId: "",

    // 디자이너 필드
    nickname: "",

    // 공통 필드
    address: "",
    post: "",
    birth: "",
    gender: "",
  });

  //렌더링 추적용
  const [errors, setErrors] = useState({});
  useEffect(() => {
    console.log("✅ 로그인/회원가입 컨테이너 렌더링");
  }, []);

  // 현재 회원가입 단계 로그 출력
  useEffect(() => {
    if (!isLoginForm) {
      console.log(`📝 현재 회원가입 단계: ${currentStep}`);
    }
  }, [currentStep, isLoginForm]);

  // 전화번호 포맷팅
  const formatPhoneNumber = (value) => {
    // 숫자만 추출
    const numbers = value.replace(/[^\d]/g, "");
    // 길이에 따라 포맷팅
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
        7,
        11
      )}`;
    }
  };

  // 전화번호 형식 검증 함수
  const isValidPhoneNumber = (phoneNumber) => {
    // 010-0000-0000 형식 검사
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    return phoneRegex.test(phoneNumber);
  };

  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`입력 감지: ${name} = ${value}`);

    if (name === "tel") {
      const formattedValue = formatPhoneNumber(value);
      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));

      // 전화번호 형식 유효성 검사
      if (formattedValue && !isValidPhoneNumber(formattedValue)) {
        setErrors((prev) => ({
          ...prev,
          tel: "올바른 전화번호 형식이 아닙니다 (예: 010-0000-0000)",
        }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.tel;
          return newErrors;
        });
      }
    } else if (name === "password" || name === "confirmPassword") {
      // 비밀번호 관련 필드 처리
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };

        // 비밀번호 길이 검사
        if (name === "password") {
          if (value.length < 6 && value.length > 0) {
            newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다";
          } else {
            delete newErrors.password;
          }
        }

        // 비밀번호 일치 여부 검사
        const currentPassword = name === "password" ? value : formData.password;
        const currentConfirmPassword =
          name === "confirmPassword" ? value : formData.confirmPassword;

        if (currentPassword && currentConfirmPassword) {
          if (currentPassword !== currentConfirmPassword) {
            newErrors.confirmPassword = "비밀번호가 일치하지 않습니다";
          } else {
            delete newErrors.confirmPassword;
          }
        }

        return newErrors;
      });
    } else {
      // 기타 필드 처리
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // 기본 유효성 검사
      if (name === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "올바른 이메일 형식이 아닙니다",
        }));
      } else if (name === "name" && !value) {
        setErrors((prev) => ({
          ...prev,
          name: "이름을 입력해주세요",
        }));
      } else {
        // 오류 상태 제거
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  // 이메일 중복 검사
  const checkEmailDuplicate = async (email) => {
    try {
      console.log("이메일 중복 검사 시도:", email);
      let endpoint;

      // 사용자 타입에 따라 다른 엔드포인트 사용
      switch (userType) {
        case "customer":
          endpoint = `http://localhost:1271/user/checkemail/${encodeURIComponent(
            email
          )}`;
          break;
        case "owner":
          endpoint = `http://localhost:1271/shop/checkemail/${encodeURIComponent(
            email
          )}`;
          break;
        case "designer":
          endpoint = `http://localhost:1271/designer/checkemail/${encodeURIComponent(
            email
          )}`;
          break;
        default:
          throw new Error("유효하지 않은 사용자 유형입니다.");
      }

      console.log("사용할 엔드포인트:", endpoint);
      const response = await axios.get(endpoint);
      console.log("인코딩 이메일: ", encodeURIComponent(email));
      console.log("백엔드 응답:", response.data);
      console.log("응답 타입:", typeof response.data);

      // response.data가 true면 중복된 이메일, false면 사용 가능한 이메일
      if (response.data === true) {
        console.log("중복된 이메일 처리");
        return { data: { isDuplicate: true } };
      } else if (response.data === false) {
        console.log("사용 가능한 이메일 처리");
        return { data: { isDuplicate: false } };
      } else {
        console.error("예상치 못한 응답:", response.data);
        return { data: { isDuplicate: true } };
      }
    } catch (error) {
      console.error("이메일 중복 확인 오류:", error);
      // 에러 발생 시 중복된 이메일로 처리
      return { data: { isDuplicate: true } };
    }
  };

  // 이메일 인증
  const verifyEmail = async (verificationCode) => {
    try {
      if (verificationCode) {
        console.log("입력된 인증 코드:", verificationCode);
        const response = await signupApi.verifyEmailCode(
          formData.email,
          verificationCode
        );

        if (response.data.success) {
          console.log("✅ 이메일 인증 성공: TRUE");
          setEmailVerified(true);
          console.log("✅ 이메일 인증 상태 업데이트: TRUE");
          Swal.fire({
            icon: "success",
            title: "인증 성공",
            text: "이메일 인증이 완료되었습니다.",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "확인",
          });
        } else {
          console.log("❌ 이메일 인증 실패: 잘못된 코드");
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
      console.log("❗ 이메일 인증 에러: ERROR");
    }
  };

  // 닉네임 중복 검사
  const checkNicknameDuplicate = async (nickname) => {
    try {
      console.log("닉네임 중복 검사 시도:", nickname);
      const response = await axios.get(
        `http://localhost:1271/designer/nickname/${encodeURIComponent(
          nickname
        )}/exists`
      );
      console.log("백엔드 응답:", response.data);
      console.log("응답 타입:", typeof response.data);

      // response.data가 true면 중복된 닉네임, false면 사용 가능한 닉네임
      if (response.data === true) {
        console.log("중복된 닉네임 처리");
        return { data: { isDuplicate: true } };
      } else if (response.data === false) {
        console.log("사용 가능한 닉네임 처리");
        return { data: { isDuplicate: false } };
      } else {
        console.error("예상치 못한 응답:", response.data);
        return { data: { isDuplicate: true } };
      }
    } catch (error) {
      console.error("닉네임 중복 확인 오류:", error);
      return { data: { isDuplicate: true } };
    }
  };

  // 단계별 유효성 검사
  const validateStep = (step) => {
    console.log("validateStep 호출됨, 현재 단계:", step);
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
        }
        break;
      case 3: // 이메일 인증 단계
        if (!emailVerified) {
          newErrors.email = "이메일 인증이 필요합니다";
        }
        break;
      case 4: // 비밀번호 입력 단계
        if (!formData.password) {
          newErrors.password = "비밀번호를 입력해주세요";
        } else if (formData.password.length < 6) {
          newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다";
        }

        if (!formData.confirmPassword) {
          newErrors.confirmPassword = "비밀번호 확인을 입력해주세요";
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "비밀번호가 일치하지 않습니다";
        }
        break;
      case 5: // 개인정보 입력 단계
        console.log("5단계 검증 - 현재 formData:", formData);
        if (!formData.name) {
          newErrors.name = "이름을 입력해주세요";
        }
        if (!formData.tel) {
          newErrors.tel = "전화번호를 입력해주세요";
        } else if (!isValidPhoneNumber(formData.tel)) {
          newErrors.tel = "올바른 전화번호 형식이 아닙니다";
        }
        console.log("5단계 검증 결과 - 에러:", newErrors);
        break;
      case 6: // 유저 타입별 추가 정보
        // 사장님인 경우 사업자 등록번호 검증
        if (userType === "owner" && !formData.bizId) {
          newErrors.bizId = "사업자 등록번호를 입력해주세요";
        }

        // 디자이너인 경우 닉네임 검증
        if (userType === "designer" && !formData.nickname) {
          newErrors.nickname = "닉네임을 입력해주세요";
        }

        // 고객과 사장님에게 필요한 주소 검증
        if (
          (userType === "customer" || userType === "owner") &&
          !formData.post
        ) {
          newErrors.post = "우편번호를 입력해주세요";
        }

        // 고객과 디자이너에게 필요한 생년월일, 성별 검증
        if (
          (userType === "customer" || userType === "designer") &&
          !formData.birth
        ) {
          newErrors.birth = "생년월일을 입력해주세요";
        }

        if (
          (userType === "customer" || userType === "designer") &&
          !formData.gender
        ) {
          newErrors.gender = "성별을 선택해주세요";
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log("검증 결과:", isValid ? "통과" : "실패", newErrors);
    return isValid;
  };

  // 다음 단계로 진행
  const nextStep = () => {
    console.log("현재 단계:", currentStep);

    // 유효성 검사
    if (Object.keys(errors).length > 0) {
      Swal.fire({
        icon: "warning",
        title: "입력 오류",
        text: Object.values(errors)[0],
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      return;
    }

    // 다음 단계로 이동
    const nextStepValue = currentStep + 1;
    console.log("다음 단계로 이동:", nextStepValue);
    setCurrentStep(nextStepValue);
  };

  // 이전 단계로 돌아가기
  const prevStep = () => {
    if (currentStep > 1) {
      const prevStepValue = currentStep - 1;
      console.log("이전 단계로 이동:", prevStepValue);

      // 상태 업데이트
      setCurrentStep(prevStepValue);
    }
  };

  // 폼 초기화
  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      tel: "",
      bizId: "",
      nickname: "",
      address: "",
      post: "",
      birth: "",
      gender: "",
    });
    setErrors({});
    setCurrentStep(1);
    setEmailVerified(false);
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 회원가입 완료 처리 (마지막 단계에서만)
    if (currentStep === 6 && validateStep(currentStep)) {
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
        let signupFunction;

        switch (userType) {
          case "customer": // 일반 유저 추가데이터
            typeSpecificData = {
              address: formData.address,
              post: formData.post,
              birth: formData.birth,
              gender: formData.gender,
            };
            signupFunction = signupApi.customerSignup;
            break;

          case "owner": // 사장 추가 데이터
            typeSpecificData = {
              bizId: formData.bizId,
              address: formData.address,
              post: formData.post,
            };
            signupFunction = signupApi.ownerSignup;
            break;

          case "designer": // 디자이너 추가 데이터
            typeSpecificData = {
              nickname: formData.nickname,
              birth: formData.birth,
              gender: formData.gender,
            };
            //signupFunction = signupApi.designerSignup;
            break;

          default:
            throw new Error("유효하지 않은 사용자 유형입니다.");
        }

        // 최종 제출 데이터 (공통 + 타입별 데이터 병합)
        const submitData = {
          ...commonData,
          ...typeSpecificData,
        };

        console.log("🎁 회원가입 데이터:", submitData);
        console.log(" └유저 타입:", userType);

        let response;
        // API 호출 코드
        if (userType === "customer") {
          response = await signupApi.customerSignup(submitData);
        } else if (userType === "owner") {
          response = await signupApi.ownerSignup(submitData);
        } else if (userType === "designer") {
          response = await signupApi.designerSignup(submitData);
        } else {
          throw new Error("알 수 없는 유저 타입입니다");
        }

        console.log("회원가입 응답:", response);

        // 성공 메시지 표시
        await Swal.fire({
          icon: "success",
          title: "회원가입 완료!",
          text: "회원가입이 성공적으로 완료되었습니다.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });

        // 회원가입 완료 후 로그인 폼으로 전환
        toggleLoginMode(true);
        resetForm();
      } catch (error) {
        console.error("회원가입 오류:", error);

        // 에러 메시지 추출
        let errorMessage = "회원가입에 실패했습니다. 다시 시도해주세요.";
        if (error.response) {
          // 서버가 응답을 반환한 경우
          console.error("응답 데이터:", error.response.data);
          console.error("응답 상태:", error.response.status);
          console.error("응답 헤더:", error.response.headers);
        } else if (error.request) {
          // 요청이 만들어졌으나 응답을 받지 못한 경우
          console.error("요청 정보:", error.request);
        } else {
          // 요청 설정 중 오류가 발생한 경우
          console.error("오류 메시지:", error.message);
        }

        Swal.fire({
          icon: "error",
          title: "가입 실패",
          text: errorMessage,
          confirmButtonColor: "#d33",
          confirmButtonText: "확인",
        });
      }
    }
  };

  // 각 단계별 컴포넌트 렌더링
  const renderSignupStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1UserType
            userType={userType}
            setUserType={setUserType}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <Step2Email
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            checkEmailDuplicate={checkEmailDuplicate}
            nextStep={nextStep}
            prevStep={prevStep}
            userType={userType}
            emailVerified={emailVerified}
            setEmailVerified={setEmailVerified}
          />
        );
      case 3:
        return (
          <Step2EmailVerification
            email={formData.email}
            userType={userType}
            onVerificationComplete={(success) => {
              if (success) {
                nextStep();
              }
            }}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <Step4Password
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 5:
        return (
          <Step4PersonalInfo
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 6:
        return (
          <Step5TypeSpecific
            userType={userType}
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
            checkNicknameDuplicate={checkNicknameDuplicate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {!isLoginForm && (
        <StepProgress currentStep={currentStep} totalSteps={6} />
      )}

      {!isLoginForm && (
        <form onSubmit={handleSubmit} className="flex flex-col min-h-[320px]">
          {renderSignupStep()}
        </form>
      )}

      {!isLoginForm && (
        <div className="mt-4 text-center">
          <button
            onClick={() => toggleLoginMode(true)}
            className="text-gray-600 hover:text-gray-800 font-medium text-sm"
          >
            이미 계정이 있으신가요?{" "}
            <span className="font-bold hover:text-green-500 transition-colors transition duration-500">
              로그인
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SignupContainer;
