import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Save, ArrowLeft } from "lucide-react";
import axiosInstance from "../../components/sign/axios/AxiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BusinessHeader from "../../components/common/BusinessHeader";
import { motion } from "framer-motion";
import ImageUploader from "../../components/DesingerAbout/profile/ImageUploader";

export default function ShopProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedHolidays, setSelectedHolidays] = useState([]);
  const [profileImageFile, setProfileImageFile] = useState(null); // 프로필 이미지 파일 상태 분리
  const [bannerImageFile, setBannerImageFile] = useState(null); // 배너 이미지 파일 상태 분리
  const [shopData, setShopData] = useState({
    name: "",
    address: "",
    post: 0,
    tel: "",
    pwd: "",
    newPwd: "",
    newPwdConfirm: "",
    desc: "",
    open: "",
    close: "",
    regularHoliday: "",
    rating: 0.0,
    reviewNumber: 0,
    reservationNumber: 0,
    joinDate: new Date().toISOString().split("T")[0],
    profileImage: "",
    thumbnail: "",
    bannerImage: "",
    bannerImages: [],
  });

  const weekDays = [
    { id: "MONDAY", label: "월" },
    { id: "TUESDAY", label: "화" },
    { id: "WEDNESDAY", label: "수" },
    { id: "THURSDAY", label: "목" },
    { id: "FRIDAY", label: "금" },
    { id: "SATURDAY", label: "토" },
    { id: "SUNDAY", label: "일" },
  ];

  const fetchShopData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/shop/profile", {
        withCredentials: true,
      });
      console.log("샵 정보 원본:", response.data);

      // 이미지 데이터 로깅
      console.log("이미지 데이터:", {
        bannerImage: response.data.bannerImage,
        bannerImages: response.data.bannerImages,
        thumbnail: response.data.thumbnail,
        profileImage: response.data.profileImage,
      });

      // 배너 이미지 처리
      let bannerImageUrl = "";
      if (response.data.bannerImages && response.data.bannerImages.length > 0) {
        bannerImageUrl = response.data.bannerImages[0];
        console.log("배너 이미지 URL (배열에서):", bannerImageUrl);
      } else if (response.data.bannerImage) {
        bannerImageUrl = response.data.bannerImage;
        console.log("배너 이미지 URL (단일 필드에서):", bannerImageUrl);
      }

      // 프로필 이미지 처리
      let profileImageUrl = "";
      if (response.data.thumbnail) {
        profileImageUrl = response.data.thumbnail;
        console.log("프로필 이미지 URL (thumbnail 필드에서):", profileImageUrl);
      } else if (response.data.profileImage) {
        profileImageUrl = response.data.profileImage;
        console.log(
          "프로필 이미지 URL (profileImage 필드에서):",
          profileImageUrl
        );
      }

      setShopData({
        ...response.data,
        // 서버에서 받은 데이터 타입 확인 및 변환
        post: parseInt(response.data.post, 10),
        rating: parseFloat(response.data.rating || 0),
        reviewNumber: parseInt(response.data.reviewNumber || 0, 10),
        reservationNumber: parseInt(response.data.reservationNumber || 0, 10),
        joinDate:
          response.data.joinDate || new Date().toISOString().split("T")[0],
        // 처리된 프로필 이미지 URL 사용
        profileImage: profileImageUrl,
        // 처리된 배너 이미지 URL 사용
        bannerImage: bannerImageUrl,
        newPwd: "",
        newPwdConfirm: "",
      });

      // 정기 휴무일 문자열을 배열로 변환
      if (
        response.data.regularHoliday &&
        response.data.regularHoliday !== "NONE"
      ) {
        setSelectedHolidays(response.data.regularHoliday.split(","));
      } else {
        setSelectedHolidays([]);
      }
    } catch (error) {
      console.error("샵 정보 로드 실패:", error);
      toast.error("샵 정보를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShopData();
  }, []);

  useEffect(() => {
    console.log("shopData 변경됨:", shopData);
  }, [shopData]);

  const handleChange = (field, value) => {
    setShopData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleHolidayToggle = (dayId) => {
    setSelectedHolidays((prev) => {
      const newHolidays = prev.includes(dayId)
        ? prev.filter((day) => day !== dayId)
        : [...prev, dayId];

      // 정기 휴무일 문자열 업데이트
      handleChange("regularHoliday", newHolidays.join(","));

      return newHolidays;
    });
  };

  const handleImageUpload = (type, file) => {
    console.log("업로드 타입:", type, "파일:", file);
    // 이미지 파일 상태 분리하여 관리
    if (type === "profile") {
      setProfileImageFile(file);
      // 미리보기용 URL 생성
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        handleChange("profileImage", previewUrl);
      }
    } else if (type === "banner") {
      setBannerImageFile(file);
      // 미리보기용 URL 생성
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        handleChange("bannerImage", previewUrl);
      }
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      console.log("저장 전 상태:", {
        shopData,
        profileImageFile,
        bannerImageFile,
      });

      const formData = new FormData();

      // shopData에서 이미지 URL 제외
      const shopDataWithoutImages = {
        ...shopData,
        // 이미지 URL은 서버에 전송하지 않음 (파일은 별도로 전송)
        profileImage: undefined,
        thumbnail: undefined,
        bannerImage: undefined,
        // bannerImages가 필요한 경우 빈 배열로 초기화
        bannerImages: [],
      };

      console.log("서버로 전송할 데이터:", shopDataWithoutImages);

      formData.append(
        "request",
        new Blob([JSON.stringify(shopDataWithoutImages)], {
          type: "application/json",
        })
      );

      // 프로필 이미지 파일이 있으면 추가
      if (profileImageFile) {
        console.log(
          "프로필 이미지 파일 추가 (thumbnail):",
          profileImageFile.name
        );
        formData.append("thumbnail", profileImageFile);
      }

      // 배너 이미지 파일이 있으면 추가
      if (bannerImageFile) {
        console.log("배너 이미지 파일 추가 (banner):", bannerImageFile.name);
        formData.append("banner", bannerImageFile);
      }

      // === 서버로 전송하는 데이터 로깅 ===
      console.log("=== 서버 전송 데이터 로깅 시작 ===");
      for (let pair of formData.entries()) {
        if (pair[0] === "request") {
          try {
            const requestData = JSON.parse(await pair[1].text());
            console.log("request 데이터:", requestData);
          } catch (error) {
            console.error("request 데이터 파싱 실패:", error);
          }
        } else {
          console.log(
            `${pair[0]}: ${pair[1] instanceof File ? "파일 객체" : pair[1]} ${
              pair[1] instanceof File
                ? `(파일명: ${pair[1].name}, 타입: ${pair[1].type}, 크기: ${pair[1].size} bytes)`
                : ""
            }`
          );
        }
      }
      console.log("=== 서버 전송 데이터 로깅 종료 ===");

      // Content-Type을 지정하지 않고 axios가 알아서 설정하도록 함
      const response = await axiosInstance.patch("/shop/profile", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // 성공 시 처리
      if (response.status === 200) {
        toast.success("프로필이 성공적으로 업데이트되었습니다.");
        setIsEditing(false);
        // 이미지 파일 상태 초기화
        setProfileImageFile(null);
        setBannerImageFile(null);
        fetchShopData(); // 업데이트된 데이터 다시 불러오기
      }
    } catch (error) {
      console.error("프로필 업데이트 중 오류 발생:", error);
      toast.error("프로필 업데이트 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <BusinessHeader />

      {/* 헤더 높이만큼 여백 추가 */}
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
          {/* 프로필 배너 섹션 */}
          <div className="w-full max-w-5xl mb-8">
            <div className="h-48 rounded-xl overflow-hidden shadow-lg bg-gray-200">
              {isEditing ? (
                <ImageUploader
                  imageType="banner"
                  defaultImage={shopData.bannerImage}
                  onImageSelected={(type, file) =>
                    handleImageUpload(type, file)
                  }
                  className="w-full h-full"
                />
              ) : shopData.bannerImage ? (
                <img
                  src={shopData.bannerImage}
                  alt="샵 배너"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-400">배너 이미지 없음</span>
                </div>
              )}
            </div>
          </div>

          {/* 프로필 정보 섹션 */}
          <div className="w-full max-w-5xl px-4 pb-12">
            <div className="bg-white rounded-xl shadow-md p-6 relative">
              {/* 프로필 이미지를 카드 위로 올림 */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  <div className="w-40 h-40 bg-white rounded-full overflow-hidden border-4 border-white shadow-lg">
                    {isEditing ? (
                      <ImageUploader
                        imageType="profile"
                        defaultImage={shopData.profileImage}
                        onImageSelected={(type, file) =>
                          handleImageUpload(type, file)
                        }
                        className="w-full h-full"
                      />
                    ) : shopData.profileImage ? (
                      <img
                        src={shopData.profileImage}
                        alt="샵 프로필"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400">이미지 없음</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 pt-16">
                <h1 className="text-2xl font-bold text-gray-800">
                  {shopData.name}
                </h1>
                <div className="flex space-x-3">
                  {isEditing ? (
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className={`px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center gap-2 ${
                        isSaving ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSaving ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                          <span>저장 중...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>저장</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                    >
                      수정
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {/* 왼쪽 컬럼: 기본 정보 */}
                  <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="flex flex-col space-y-2">
                      <h2 className="text-sm font-medium text-gray-500">
                        연락처
                      </h2>
                      {isEditing ? (
                        <input
                          type="text"
                          value={shopData.tel}
                          onChange={(e) => handleChange("tel", e.target.value)}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all text-gray-800"
                          placeholder="연락처를 입력하세요"
                        />
                      ) : (
                        <p className="text-gray-800 font-medium">
                          {shopData.tel}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="flex flex-col space-y-2">
                      <h2 className="text-sm font-medium text-gray-500">
                        주소
                      </h2>
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={shopData.post}
                            onChange={(e) =>
                              handleChange("post", e.target.value)
                            }
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all text-gray-800"
                            placeholder="우편번호를 입력하세요"
                          />
                          <input
                            type="text"
                            value={shopData.address}
                            onChange={(e) =>
                              handleChange("address", e.target.value)
                            }
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all text-gray-800"
                            placeholder="주소를 입력하세요"
                          />
                        </div>
                      ) : (
                        <p className="text-gray-800 font-medium">
                          [{shopData.post}] {shopData.address}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* 오른쪽 컬럼: 추가 정보 */}
                  <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="flex flex-col space-y-2">
                      <h2 className="text-sm font-medium text-gray-500">
                        영업 시간
                      </h2>
                      {isEditing ? (
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <input
                              type="time"
                              value={shopData.open}
                              onChange={(e) =>
                                handleChange("open", e.target.value)
                              }
                              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all text-gray-800"
                            />
                            <span className="flex items-center">~</span>
                            <input
                              type="time"
                              value={shopData.close}
                              onChange={(e) =>
                                handleChange("close", e.target.value)
                              }
                              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all text-gray-800"
                            />
                          </div>
                          <div className="mt-4">
                            <h3 className="text-sm font-medium text-gray-500 mb-2">
                              정기 휴무일
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {weekDays.map((day) => (
                                <button
                                  key={day.id}
                                  onClick={() => handleHolidayToggle(day.id)}
                                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                    selectedHolidays.includes(day.id)
                                      ? "bg-red-100 text-red-600 border border-red-200"
                                      : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200"
                                  }`}
                                >
                                  {day.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <p className="text-gray-800 font-medium">
                            {shopData.open} ~ {shopData.close}
                          </p>
                          <p className="text-gray-600 text-sm">
                            정기 휴무일:{" "}
                            {shopData.regularHoliday
                              ? shopData.regularHoliday
                                  .split(",")
                                  .map(
                                    (day) =>
                                      weekDays.find((wd) => wd.id === day)
                                        ?.label
                                  )
                                  .join(", ")
                              : "없음"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="flex flex-col space-y-2">
                      <h2 className="text-sm font-medium text-gray-500">
                        설명
                      </h2>
                      {isEditing ? (
                        <textarea
                          value={shopData.desc}
                          onChange={(e) => handleChange("desc", e.target.value)}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all text-gray-800 h-32 resize-none"
                          placeholder="샵에 대한 설명을 입력하세요"
                        />
                      ) : (
                        <p className="text-gray-800 font-medium whitespace-pre-wrap">
                          {shopData.desc}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 활동 통계 */}
              <div className="mt-8 pt-6 border-t">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">
                  활동 통계
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-green-600">평점</p>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <p className="text-xl font-bold text-green-700">
                        {shopData.rating}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-green-600">리뷰 수</p>
                    <p className="text-xl font-bold text-green-700">
                      {shopData.reviewNumber}
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-green-600">예약 수</p>
                    <p className="text-xl font-bold text-green-700">
                      {shopData.reservationNumber}
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-green-600">가입일</p>
                    <p className="text-base font-bold text-green-700">
                      {shopData.joinDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
