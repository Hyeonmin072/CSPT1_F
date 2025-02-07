// components/profile/UserProfileEdit.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileBannerEdit from "../../components/profile/userprofile/ProfileBannerEdit";
import ProfileImageEdit from "../../components/profile/userprofile/ProfileImageEdit";
import d1 from "../../assets/designer/d1.png";

const UserProfileEdit = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "홍길동",
    phone: "010-3579-1271",
    email: "test@gmail.com",
    membership: "일반",
  });

  const [bannerImage, setBannerImage] = useState(d1);
  const [profileImage, setProfileImage] = useState(d1);

  const handleInputChange = (key, value) => {
    setUserData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    // 비밀번호 변경 시 유효성 검사
    if (
      passwordData.newPassword ||
      passwordData.confirmPassword ||
      passwordData.currentPassword
    ) {
      // 모든 필드가 채워져 있는지 확인
      if (
        !passwordData.currentPassword ||
        !passwordData.newPassword ||
        !passwordData.confirmPassword
      ) {
        alert("모든 비밀번호 필드를 입력해주세요.");
        return;
      }

      // 새 비밀번호 유효성 검사
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
      if (!passwordRegex.test(passwordData.newPassword)) {
        alert("새 비밀번호는 영문, 숫자, 특수문자를 포함한 8-20자여야 합니다.");
        return;
      }

      // 새 비밀번호 일치 확인
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        alert("새 비밀번호가 일치하지 않습니다.");
        return;
      }
    }

    // API 호출하여 변경된 정보 저장
    // 성공 시 프로필 페이지로 이동
    navigate("/profile");
  };

  const handleCancel = () => {
    // 변경 사항 없이 프로필 페이지로 이동
    navigate("/userprofile");
  };

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (key, value) => {
    setPasswordData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center w-full mt-12">
      {/* 배너 및 프로필 이미지 섹션 */}
      <div className="relative mb-16 w-[1200px]">
        <ProfileBannerEdit
          bannerImage={bannerImage}
          onImageChange={setBannerImage}
        />
        <ProfileImageEdit
          profileImage={profileImage}
          onImageChange={setProfileImage}
        />
      </div>

      {/* 프로필 정보 수정 폼 */}
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8 text-center">프로필 수정</h1>

        <div className="grid grid-cols-2 gap-y-8 gap-x-16 mb-6">
          {/* 이름 입력 */}
          <div>
            <h2 className="text-gray-600 text-sm mb-2">이름</h2>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-96 p-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* 연락처 입력 */}
          <div>
            <h2 className="text-gray-600 text-sm mb-2">연락처</h2>
            <input
              type="tel"
              value={userData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="w-96 p-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* 이메일 입력 */}
          <div>
            <h2 className="text-gray-600 text-sm mb-2">이메일</h2>
            <input
              type="email"
              value={userData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-96 p-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* 멤버십 등급 (읽기 전용) */}
          <div>
            <h2 className="text-gray-600 text-sm mb-2">내 멤버십 등급</h2>
            <div className="w-96 p-3 bg-gray-100 rounded text-gray-500">
              {userData.membership}
            </div>
          </div>
        </div>

        {/* 비밀번호 변경 섹션 */}
        <h2 className="text-xl font-bold -mb-10 flex justify-center">
          비밀번호 변경
        </h2>
        <div className="mt-12 mb-8 flex justify-center">
          <div className="grid grid-cols-1 gap-y-6">
            {/* 현재 비밀번호 */}
            <div>
              <h2 className="text-gray-600 text-sm mb-2 w-72">현재 비밀번호</h2>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  handlePasswordChange("currentPassword", e.target.value)
                }
                className="w-[1500px] max-w-lg p-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="현재 비밀번호를 입력하세요"
              />
            </div>

            {/* 새 비밀번호 */}
            <div>
              <h2 className="text-gray-600 text-sm mb-2 w-96">새 비밀번호</h2>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  handlePasswordChange("newPassword", e.target.value)
                }
                className="w-full max-w-lg p-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="새 비밀번호를 입력하세요"
              />
              <p className="text-sm text-gray-500 mt-1">
                영문, 숫자, 특수문자 조합 8-20자
              </p>
            </div>

            {/* 새 비밀번호 확인 */}
            <div>
              <h2 className="text-gray-600 text-sm mb-2">새 비밀번호 확인</h2>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  handlePasswordChange("confirmPassword", e.target.value)
                }
                className="w-full max-w-lg p-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="새 비밀번호를 다시 입력하세요"
              />
            </div>
          </div>
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
  );
};

export default UserProfileEdit;
