import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../components/sign/axios/AxiosInstance";
import CalendarSelect from "../../components/reservation/calendarselect/CalendarSelect.jsx";
import Header from "../../components/common/Header.jsx";
import { toast } from "react-hot-toast";
import { IoChevronBackOutline } from "react-icons/io5";

export default function CalendarSelectPage() {
  const { designerEmail } = useParams();
  const navigate = useNavigate();
  const [designerInfo, setDesignerInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 날짜 선택 핸들러
  const handleDateSelect = (date) => {
    console.log("선택된 날짜:", date);
    setSelectedDate(date);
  };

  // 시간 선택 핸들러
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  // 디자이너 정보 조회
  useEffect(() => {
    const fetchDesignerInfo = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/user/reservation/selecttime/${designerEmail}`
        );
        setDesignerInfo(response.data);
      } catch (error) {
        console.error("디자이너 정보 조회 실패:", error);
        setError("디자이너 정보 조회에 실패했습니다.");
        toast.error("디자이너 정보 조회에 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (designerEmail) {
      fetchDesignerInfo();
    }
  }, [designerEmail]);

  const timeSlots = [
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
  ];

  // 다음 페이지로 이동
  const handleNext = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("날짜와 시간을 선택해주세요.");
      return;
    }
    navigate(`/menuselect/${designerEmail}`, {
      state: { selectedDate, selectedTime },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* 커스텀 헤더 */}
      <div className="fixed top-16 left-0 right-0 bg-white border-b z-10 mt-3">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <button onClick={() => navigate(-1)} className="text-gray-600 p-2">
            <IoChevronBackOutline size={24} />
          </button>
          <h1 className="ml-2 text-lg font-medium">디자이너 선택</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 mt-32">
        {/* 날짜 선택 섹션 */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4 mt-4">날짜 선택</h2>
          <CalendarSelect
            availableTimes={designerInfo?.availableTime || []}
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
