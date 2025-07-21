// components/profile/UserProfileEdit.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import ProfileBannerEdit from "../../components/profile/userprofile/ProfileBannerEdit";
//import ProfileImageEdit from "../../components/profile/userprofile/ProfileImageEdit";

import Header from "../../components/common/Header";
import axiosInstance from "../../components/sign/axios/AxiosInstance";
import PasswordChangeModal from "./PasswordChangeModal";

const UserProfileEdit = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userName: "",
    userEmail: "",
    userAdress: "",
    userTel: "",
    userGrade: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/user/profile", {
          withCredentials: true,
        });
        if (response.data) {
          setUserData({ ...response.data });
        }
      } catch (error) {
        console.error("프로필 데이터 로드 실패:", error);
        // 필요시 에러 처리
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (key, value) => {
    setUserData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePasswordChange = async (passwordData) => {
    try {
      // 비밀번호 변경 API 호출
      await axiosInstance.put("/user/password", passwordData, {
        withCredentials: true,
      });
      alert("비밀번호가 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);
      alert("비밀번호 변경에 실패했습니다.");
    }
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.put("/user/profile", userData, {
        withCredentials: true,
      });
      // 성공 시 프로필 페이지로 이동
      navigate("/profile");
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      alert("프로필 업데이트에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* 헤더 높이만큼 여백 추가 */}
      <div className="h-24"></div>

      <div className="flex flex-col items-center w-full">
        {isLoading ? (
          <div className="flex justify-center items-center h-[calc(100vh-5rem)]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-500"></div>
          </div>
        ) : (
          <div className="w-full max-w-5xl px-4 pb-12">
            <div className="bg-white rounded-xl shadow-md p-6 relative">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 pt-16">
                <h1 className="text-2xl font-bold text-gray-800">
                  프로필 수정
                </h1>
              </div>

              {/* 프로필 정보 수정 폼 */}
              <div className="grid grid-cols-2 gap-y-8 gap-x-16 mb-6">
                {/* 이름 입력 */}
                <div>
                  <h2 className="text-gray-600 text-sm mb-2">이름</h2>
                  <input
                    type="text"
                    value={userData.userName}
                    readOnly
                    className="w-96 p-3 bg-gray-100 rounded focus:outline-none cursor-not-allowed text-gray-500"
                  />
                </div>
                {/* 연락처 입력 */}
                <div>
                  <h2 className="text-gray-600 text-sm mb-2">연락처</h2>
                  <input
                    type="tel"
                    value={userData.userTel}
                    readOnly
                    className="w-96 p-3 bg-gray-100 rounded focus:outline-none cursor-not-allowed text-gray-500"
                  />
                </div>
                {/* 이메일 입력 */}
                <div>
                  <h2 className="text-gray-600 text-sm mb-2">이메일</h2>
                  <input
                    type="email"
                    value={userData.userEmail}
                    onChange={(e) =>
                      handleInputChange("userEmail", e.target.value)
                    }
                    className="w-96 p-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                {/* 주소 입력 */}
                <div>
                  <h2 className="text-gray-600 text-sm mb-2">주소</h2>
                  <input
                    type="text"
                    value={userData.userAdress}
                    onChange={(e) =>
                      handleInputChange("userAdress", e.target.value)
                    }
                    className="w-96 p-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                {/* 멤버십 등급 (읽기 전용) */}
                <div>
                  <h2 className="text-gray-600 text-sm mb-2">내 멤버십 등급</h2>
                  <div className="w-96 p-3 bg-gray-100 rounded text-gray-500">
                    {userData.userGrade}
                  </div>
                </div>
              </div>

              {/* 비밀번호 변경 버튼 */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="px-6 py-2 text-white rounded-lg hover:bg-blue-600 transition-colors bg-blue-500"
                >
                  비밀번호 변경
                </button>
              </div>

              {/* 버튼 섹션 */}
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 text-gray-500 rounded-lg hover:text-gray-600 transition-colors bg-gray-100 hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 text-white rounded-lg hover:bg-teal-600 transition-colors bg-teal-500"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 비밀번호 변경 모달 */}
      <PasswordChangeModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onPasswordChange={handlePasswordChange}
      />
    </div>
  );
};

export default UserProfileEdit;
