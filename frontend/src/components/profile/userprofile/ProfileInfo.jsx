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
      const response = await axios.get("http://localhost:1271/user/profile", {
        withCredentials: true,
      });
      const data = response.data;

      setProfileData({
        userName: data.userName || "",
        userTel: data.userTel || "",
        userEmail: data.userEmail || "",
        userAdress: data.userAdress || "",
        userGrade: data.userGrade || "일반",
      });
    } catch (error) {
      console.error("프로필 정보를 불러오는데 실패했습니다:", error);
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

  useEffect(() => {
    fetchProfileData();
  }, []);

  const infoItems = [
    { label: "이름", value: profileData.userName, key: "userName" },
    { label: "연락처", value: profileData.userTel, key: "userTel" },
    { label: "이메일", value: profileData.userEmail, key: "userEmail" },
    { label: "주소", value: profileData.userAdress, key: "userAdress" },
    { label: "내 멤버십 등급", value: profileData.userGrade, key: "userGrade" },
  ];

  const handleChange = (key, value) => {
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
      <div className="grid grid-cols-1 gap-4">
        {infoItems.map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            <div className="flex flex-col space-y-2">
              <h2 className="text-sm font-medium text-gray-500">
                {item.label}
              </h2>
              {isEditing ? (
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => handleChange(item.key, e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all text-gray-800"
                  placeholder={`${item.label} 입력`}
                />
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-gray-800 font-medium">{item.value}</p>
                  {item.key === "userGrade" && (
                    <span className="px-4 py-1.5 text-sm font-medium bg-gray-100 text-gray-800 rounded-full w-32 text-center">
                      {item.value}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileInfo;
