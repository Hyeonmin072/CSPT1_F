import d1 from "../../assets/designer/d1.png";
import ProfileBanner from "../../components/profile/userprofile/ProfileBanner";
import ProfileImage from "../../components/profile/userprofile/ProfileImage";
import ProfileBannerEdit from "../../components/profile/userprofile/ProfileBannerEdit";
import ProfileImageEdit from "../../components/profile/userprofile/ProfileImageEdit";
import ProfileInfo from "../../components/profile/userprofile/ProfileInfo";
import MyCouponButton from "../../components/button/MyCouponButton";
import ProfileEditButton from "../../components/button/ProfileEditButton";
import Header from "../../components/common/Header";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axiosInstance from "../../components/sign/axios/AxiosInstance";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    userName: "",
    userEmail: "",
    userAdress: "",
    userTel: "",
    userGrade: "",
    reservationCnt: 0,
    reviewedCnt: 0,
    likedDesignerCnt: 0,
    profileImage: d1,
    bannerImage: d1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/user/profile", {
          withCredentials: true,
        });
        console.log("load된 유저 데이터", response.data);
        if (response.data) {
          setUserData({ ...response.data });
        }
      } catch (error) {
        console.error("프로필 데이터 로드 실패:", error);
        toast.error("프로필 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    try {
      await axiosInstance.put("/user/profile", userData, {
        withCredentials: true,
      });
      toast.success("프로필이 성공적으로 업데이트되었습니다.");
      setIsEditing(false);
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      toast.error("프로필 업데이트에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="h-24"></div>
      {isLoading ? (
        <div className="flex justify-center items-center h-[calc(100vh-5rem)]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-500"></div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center w-full"
        >
          {/* 프로필 배너 섹션 - 필요시 별도 관리 */}
          <div className="w-full max-w-5xl mb-8">
            <div className="h-48 rounded-xl overflow-hidden shadow-lg">
              {isEditing ? (
                <ProfileBannerEdit
                  bannerImage={userData.bannerImage}
                  onImageChange={(newImage) =>
                    setUserData({ ...userData, bannerImage: newImage })
                  }
                />
              ) : (
                <ProfileBanner bannerImage={userData.bannerImage} />
              )}
            </div>
          </div>

          {/* 프로필 정보 섹션 */}
          <div className="w-full max-w-5xl px-4 pb-12">
            <div className="bg-white rounded-xl shadow-md p-6 relative">
              {/* 프로필 이미지를 카드 위로 올림 - 필요시 별도 관리 */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  {isEditing ? (
                    <ProfileImageEdit
                      profileImage={userData.profileImage}
                      onImageChange={(newImage) =>
                        setUserData({ ...userData, profileImage: newImage })
                      }
                    />
                  ) : (
                    <ProfileImage profileImage={userData.profileImage} />
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 pt-4">
                <h1 className="text-2xl font-bold text-gray-800">
                  {userData.userName}님의 프로필
                </h1>
                <div className="flex space-x-3">
                  <MyCouponButton />
                  {isEditing ? (
                    <button
                      onClick={handleSaveProfile}
                      className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                    >
                      저장
                    </button>
                  ) : (
                    <ProfileEditButton onClick={handleEditToggle} />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {/* ProfileInfo 컴포넌트가 내부에서 필드명을 맞춰서 사용해야 함 */}
                  <ProfileInfo
                    userName={userData.userName}
                    userEmail={userData.userEmail}
                    userAdress={userData.userAdress}
                    userTel={userData.userTel}
                    userGrade={userData.userGrade}
                    isEditing={isEditing}
                    onDataChange={setUserData}
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-5">
                  <h2 className="text-lg font-semibold mb-4 text-gray-700">
                    활동 통계
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="text-sm text-green-600">예약 횟수</p>
                      <p className="text-xl font-bold text-green-700">
                        {userData.reservationCnt}
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="text-sm text-green-600">리뷰 작성</p>
                      <p className="text-xl font-bold text-green-700">
                        {userData.reviewedCnt}
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="text-sm text-green-600">
                        즐겨찾기 디자이너
                      </p>
                      <p className="text-xl font-bold text-green-700">
                        {userData.likedDesignerCnt}
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="text-sm text-green-600">등급</p>
                      <p className="text-base font-bold text-green-700">
                        {userData.userGrade}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UserProfile;
