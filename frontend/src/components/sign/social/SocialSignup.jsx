import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const SocialSignup = () => {
  const navigate = useNavigate();

  // 카카오 주소 API 스크립트 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    birthDate: "",
    tel: "",
    address: "",
    post: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.group("🎯 소셜 회원가입 초기화");

    // URL에서 파라미터 확인
    const urlParams = new URLSearchParams(window.location.search);
    const email = decodeURIComponent(urlParams.get("email") || "");
    const name = decodeURIComponent(urlParams.get("name") || "");

    console.log("URL 파라미터 확인:");
    console.log("email:", email);
    console.log("name:", name);

    if (email && name) {
      console.log("✅ 필수 파라미터 확인 완료");
      // 폼 데이터 초기화
      setFormData({
        email,
        name,
        birthDate: "",
        tel: "",
        address: "",
        post: "",
        gender: "",
      });
    } else {
      console.log("❌ 필수 파라미터 누락");
      console.log("email 존재:", !!email);
      console.log("name 존재:", !!name);
      navigate("/");
    }

    console.groupEnd();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.group("📝 폼 데이터 변경");
    console.log("필드:", name);
    console.log("값:", value);

    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: value,
      };
      console.log("업데이트된 폼 데이터:", newData);
      return newData;
    });

    // 유효성 검사
    if (
      name === "tel" &&
      value &&
      !/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(value)
    ) {
      console.log("❌ 전화번호 형식 오류");
      setErrors((prev) => ({
        ...prev,
        tel: "올바른 전화번호 형식이 아닙니다",
      }));
    } else if (name === "post" && value && !/^\d{5}$/.test(value)) {
      console.log("❌ 우편번호 형식 오류");
      setErrors((prev) => ({
        ...prev,
        post: "올바른 우편번호 형식이 아닙니다",
      }));
    } else {
      console.log("✅ 유효성 검사 통과");
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    console.groupEnd();
  };

  // 전화번호 하이픈 자동 추가 함수
  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
      3,
      7
    )}-${phoneNumber.slice(7, 11)}`;
  };

  // 전화번호 입력 핸들러
  const handlePhoneNumberChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    if (formattedPhoneNumber.length <= 13) {
      // 최대 길이 제한 (010-1234-5678)
      setFormData({
        ...formData,
        tel: formattedPhoneNumber,
      });
    }
  };

  const validateForm = () => {
    console.group("🔍 폼 유효성 검사");
    const newErrors = {};

    if (!formData.birthDate) {
      console.log("❌ 생년월일 누락");
      newErrors.birthDate = "생년월일을 입력해주세요";
    }

    if (!formData.tel) {
      console.log("❌ 전화번호 누락");
      newErrors.tel = "전화번호를 입력해주세요";
    } else if (
      !/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(formData.tel)
    ) {
      console.log("❌ 전화번호 형식 오류");
      newErrors.tel = "올바른 전화번호 형식이 아닙니다";
    }

    if (!formData.address) {
      console.log("❌ 주소 누락");
      newErrors.address = "주소를 입력해주세요";
    }

    if (!formData.post) {
      console.log("❌ 우편번호 누락");
      newErrors.post = "우편번호를 입력해주세요";
    } else if (!/^\d{5}$/.test(formData.post)) {
      console.log("❌ 우편번호 형식 오류");
      newErrors.post = "올바른 우편번호 형식이 아닙니다";
    }

    if (!formData.gender) {
      console.log("❌ 성별 누락");
      newErrors.gender = "성별을 선택해주세요";
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log("유효성 검사 결과:", isValid ? "✅ 통과" : "❌ 실패");
    console.log("에러 목록:", newErrors);
    console.groupEnd();
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.group("📤 회원가입 제출");

    if (!validateForm()) {
      console.log("❌ 폼 유효성 검사 실패");
      Swal.fire({
        icon: "warning",
        title: "입력 오류",
        text: Object.values(errors)[0],
        confirmButtonColor: "#3085d6",
      });
      console.groupEnd();
      return;
    }

    try {
      console.log("서버 요청 시작");
      console.log("요청 데이터:", formData);

      const response = await axios.post(
        "http://localhost:1271/api/oauth2/kakao/signup",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.group("📦 서버 응답");
      console.log("상태:", response.status);
      console.log("데이터:", response.data);
      console.groupEnd();

      Swal.fire({
        icon: "success",
        title: "회원가입 완료!",
        text: "환영합니다!",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        console.log("✅ 회원가입 성공 - 메인 페이지로 이동");
        window.dispatchEvent(new Event("loginStatusChanged"));
        navigate("/");
      });
    } catch (error) {
      console.group("❌ 회원가입 실패");
      console.error("에러:", error);
      console.error("응답:", error.response?.data);
      console.groupEnd();

      let errorMessage = "회원가입 처리 중 오류가 발생했습니다.";

      if (error.response?.status === 400) {
        errorMessage = "입력하신 정보를 다시 확인해주세요.";
      } else if (error.response?.status === 401) {
        errorMessage = "인증이 만료되었습니다. 다시 로그인해주세요.";
        navigate("/sign/signin");
      } else if (error.response?.status === 500) {
        // 카카오 API 요청 제한 에러 처리
        if (error.response?.data?.includes("KOE237")) {
          errorMessage =
            "일시적인 서비스 장애가 발생했습니다. 잠시 후 다시 시도해주세요.";
        } else {
          errorMessage = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
        }
      }

      Swal.fire({
        icon: "error",
        title: "오류 발생",
        text: errorMessage,
        confirmButtonColor: "#d33",
      });
    }
    console.groupEnd();
  };

  // 카카오 주소 검색
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        // 쉼표 제거 및 공백 처리
        const baseAddress = data.address.replace(/,/g, "");

        setFormData((prev) => ({
          ...prev,
          post: data.zonecode,
          address: baseAddress,
        }));
      },
    }).open();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          추가 정보 입력
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          회원가입을 완료하기 위해 추가 정보를 입력해주세요
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* 이메일 (읽기 전용) */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                이메일
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 sm:text-sm"
                />
              </div>
            </div>

            {/* 닉네임 (읽기 전용) */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                닉네임
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  disabled
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 sm:text-sm"
                />
              </div>
            </div>

            {/* 생년월일 */}
            <div>
              <label
                htmlFor="birthDate"
                className="block text-sm font-medium text-gray-700"
              >
                생년월일
              </label>
              <div className="mt-1">
                <input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  required
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
              {errors.birthDate && (
                <p className="mt-2 text-sm text-red-600">{errors.birthDate}</p>
              )}
            </div>

            {/* 전화번호 */}
            <div>
              <label
                htmlFor="tel"
                className="block text-sm font-medium text-gray-700"
              >
                전화번호
              </label>
              <div className="mt-1">
                <input
                  id="tel"
                  name="tel"
                  type="tel"
                  required
                  placeholder="010-0000-0000"
                  value={formData.tel}
                  onChange={handlePhoneNumberChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
              {errors.tel && (
                <p className="mt-2 text-sm text-red-600">{errors.tel}</p>
              )}
            </div>

            {/* 우편번호 */}
            <div>
              <label
                htmlFor="post"
                className="block text-sm font-medium text-gray-700"
              >
                우편번호
              </label>
              <div className="mt-1 flex space-x-2">
                <input
                  id="post"
                  name="post"
                  type="text"
                  required
                  placeholder="우편번호"
                  value={formData.post}
                  readOnly
                  className="appearance-none block w-full px-3  border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddressSearch}
                  className="inline-flex items-center px-8 border border-transparent text-sm font-medium rounded-md whitespace-nowrap text-white bg-green-600 py-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  주소 검색
                </button>
              </div>
              {errors.post && (
                <p className="mt-2 text-sm text-red-600">{errors.post}</p>
              )}
            </div>

            {/* 주소 */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                주소
              </label>
              <div className="mt-1">
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={formData.address}
                  readOnly
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
            </div>

            {/* 성별 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                성별
              </label>
              <div className="mt-1 flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="MALE"
                    checked={formData.gender === "MALE"}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-green-600"
                  />
                  <span className="ml-2">남성</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="FEMALE"
                    checked={formData.gender === "FEMALE"}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-green-600"
                  />
                  <span className="ml-2">여성</span>
                </label>
              </div>
              {errors.gender && (
                <p className="mt-2 text-sm text-red-600">{errors.gender}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                가입 완료
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SocialSignup;
