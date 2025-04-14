import React, { useEffect, useState } from "react";
import axios from "axios";

//eslint-disable-next-line
const ProfileInfo = ({ isEditing, onDataChange }) => {
  const [profileData, setProfileData] = useState({
    userName: "",
    userTel: "",
    userEmail: "",
    userAdress: "",
    userGrade: "일반",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("프로필 데이터 요청 시작");
      const response = await axios.get("http://localhost:1271/user/profile", {
        withCredentials: true,
      });
      console.log("API 응답 데이터:", response.data);
      const data = response.data;

      // API 응답 데이터 구조 확인
      console.log("userName:", data.userName);
      console.log("userTel:", data.userTel);
      console.log("userEmail:", data.userEmail);
      console.log("userAdress:", data.userAdress);
      console.log("userGrade:", data.userGrade);

      // null 체크 및 기본값 설정
      setProfileData({
        userName: data.userName || "",
        userTel: data.userTel || "",
        userEmail: data.userEmail || "",
        userAdress: data.userAdress || "",
        userGrade: data.userGrade || "일반", // MemberShip이 null인 경우 기본값 사용
      });
    } catch (error) {
      console.error("프로필 정보를 불러오는데 실패했습니다:", error);
      console.error("에러 상세:", error.response?.data);

      // 에러 발생 시에도 기본값 설정
      setProfileData({
        userName: "",
        userTel: "",
        userEmail: "",
        userAdress: "",
        userGrade: "일반",
      });

      setError(
        "프로필 정보를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 자동으로 데이터 요청
  useEffect(() => {
    fetchProfileData();
  }, []); // 빈 의존성 배열로 컴포넌트 마운트 시 한 번만 실행

  const infoItems = [
    { label: "이름", value: profileData.userName, key: "userName" },
    { label: "연락처", value: profileData.userTel, key: "userTel" },
    { label: "이메일", value: profileData.userEmail, key: "userEmail" },
    { label: "주소", value: profileData.userAdress, key: "userAdress" },
    { label: "내 멤버십 등급", value: profileData.userGrade, key: "userGrade" },
  ];

  const handleChange = (key, value) => {
    console.log("데이터 변경:", key, value);
    setProfileData((prev) => ({
      ...prev,
      [key]: value,
    }));
    onDataChange((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchProfileData}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {infoItems.map((item) => (
          <div
            key={item.label}
            className="bg-gray-50 rounded-lg p-4 transition-all hover:shadow-md"
          >
            <h2 className="text-sm font-medium text-black mb-2">
              {item.label}
            </h2>
            {isEditing ? (
              <input
                type="text"
                value={item.value}
                onChange={(e) => handleChange(item.key, e.target.value)}
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all text-black"
                placeholder={`${item.label} 입력`}
              />
            ) : (
              <div className="flex items-center">
                <p className="text-black font-medium">{item.value}</p>
                {item.key === "userGrade" && (
                  <span className="ml-2 px-2 py-1 text-xs font-semibold bg-gray-100 text-black rounded-full">
                    {item.value}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileInfo;
