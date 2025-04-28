import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Save, ArrowLeft } from "lucide-react";
import axiosInstance from "../../components/sign/axios/AxiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BusinessHeader from "../../components/common/BusinessHeader";
import { motion } from "framer-motion";

export default function ShopProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHolidays, setSelectedHolidays] = useState([]);
  const [shopData, setShopData] = useState({
    name: "",
    address: "",
    post: 0,
    tel: "",
    pwd: "",
    desc: "",
    open: "",
    close: "",
    regularHoliday: "",
    rating: 0.0,
    reviewNumber: 0,
    reservationNumber: 0,
    joinDate: new Date().toISOString().split("T")[0],
    profileImage: "",
    bannerImage: "",
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

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/shop/profile", {
          withCredentials: true,
        });
        console.log("샵 정보:", response.data);

        setShopData({
          ...response.data,
          // 서버에서 받은 데이터 타입 확인 및 변환
          post: parseInt(response.data.post, 10),
          rating: parseFloat(response.data.rating || 0),
          reviewNumber: parseInt(response.data.reviewNumber || 0, 10),
          reservationNumber: parseInt(response.data.reservationNumber || 0, 10),
          joinDate:
            response.data.joinDate || new Date().toISOString().split("T")[0],
          profileImage: response.data.profileImage || "",
          bannerImage: response.data.bannerImage || "",
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

    fetchShopData();
  }, []);

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

  const handleImageUpload = (type, imageUrl) => {
    setShopData((prev) => ({
      ...prev,
      [type]: imageUrl,
    }));
  };

  const handleSave = async () => {
    try {
      const requestData = {
        name: shopData.name,
        address: shopData.address,
        post: parseInt(shopData.post, 10),
        tel: shopData.tel,
        newPwd: "",
        newPwdConfirm: "",
        desc: shopData.desc || "",
        open: shopData.open || "",
        close: shopData.close || "",
        regularHoliday: shopData.regularHoliday || "",
        profileImage: shopData.profileImage || "",
        bannerImage: shopData.bannerImage || "",
      };

      // 요청 전 데이터 검증
      if (
        !requestData.name ||
        !requestData.address ||
        !requestData.post ||
        !requestData.tel
      ) {
        toast.error("필수 항목을 모두 입력해주세요.");
        return;
      }

      console.log(
        "서버로 전송하는 데이터:",
        JSON.stringify(requestData, null, 2)
      );

      const response = await axiosInstance.patch("/shop/profile", requestData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("샵 정보 업데이트 성공:", response.data);
      toast.success("샵 정보가 성공적으로 업데이트되었습니다.");
      setIsEditing(false);
    } catch (error) {
      console.error("샵 정보 업데이트 실패:", error);
      if (error.response) {
        console.error("서버 응답:", error.response.data);
        toast.error(
          `샵 정보 업데이트 실패: ${
            error.response.data.message || "알 수 없는 오류"
          }`
        );
      } else {
        toast.error("샵 정보 업데이트에 실패했습니다.");
      }
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
                  onImageUploaded={(url) =>
                    handleImageUpload("bannerImage", url)
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
                        onImageUploaded={(url) =>
                          handleImageUpload("profileImage", url)
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
                      className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>저장</span>
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
