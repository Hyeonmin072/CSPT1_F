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
  const [step, setStep] = useState(0);
  const [slideDirection, setSlideDirection] = useState("enter"); // 'enter' 또는 'exit'
  const [availableTimes, setAvailableTimes] = useState([]);

  // 날짜 선택 핸들러
  const handleDateSelect = async (date) => {
    console.log("=== 날짜 선택 시작 ===");
    console.log("선택된 날짜:", date);
    console.log("디자이너 이메일:", designerEmail);
    setSelectedDate(date);

    try {
      console.log("예약 가능 시간 API 요청 시작");
      const response = await axiosInstance.get(
        `/user/reservation/selecttime/available-time?designeremail=${designerEmail}&day=${date}`
      );
      console.log("API 응답 데이터:", response.data);
      console.log("예약 가능 시간 목록:", response.data.availableTimes);

      setAvailableTimes(response.data.availableTimes || []);
      console.log("availableTimes 상태 업데이트 완료");

      goToNextStep(2);
      console.log("다음 단계(시간 선택)로 이동");
    } catch (error) {
      console.error("=== 예약 가능 시간 조회 실패 ===");
      console.error("에러 메시지:", error.message);
      console.error("에러 상세:", error);
      toast.error("예약 가능 시간을 불러오는데 실패했습니다.");
    }
    console.log("=== 날짜 선택 프로세스 종료 ===");
  };

  // 시간 선택 핸들러
  const handleTimeSelect = (time) => {
    console.log("선택된 시간:", time);
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

  // 다음 단계로 이동하는 함수
  const goToNextStep = (nextStep) => {
    setSlideDirection("exit");
    setTimeout(() => {
      setStep(nextStep);
      setSlideDirection("enter");
    }, 300); // 애니메이션 시간과 맞춤
  };

  // 디자이너 카드 컴포넌트
  const renderDesignerCard = () => (
    <div
      className={`
      transform transition-all duration-300 ease-in-out w-full max-w-md
      ${
        slideDirection === "enter"
          ? "translate-x-0 opacity-100"
          : "translate-x-[-100%] opacity-0"
      }
      `}
    >
      <div className="text-2xl font-bold text-center mb-6">선택한 디자이너</div>
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-6">
            <img
              src={designerInfo?.designerImage}
              alt={designerInfo?.designerName}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-center">
            {designerInfo?.designerName}
          </h2>
          <p className="text-gray-600 mt-3 text-center">
            {designerInfo?.designerDesc || "소개가 없습니다"}
          </p>
          <button
            onClick={() => goToNextStep(1)}
            className="mt-8 w-full bg-green-500 text-white py-4 rounded-lg font-medium
              hover:bg-green-600 transition-colors"
          >
            이 디자이너로 예약하기
          </button>
        </div>
      </div>
    </div>
  );

  // 날짜 선택 컴포넌트 수정
  const renderDateSelect = () => {
    // 오늘 날짜 기준으로 7일치 날짜 생성
    const dates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return {
        date: date.getDate(),
        day: ["일", "월", "화", "수", "목", "금", "토"][date.getDay()],
        fullDate: date.toISOString().split("T")[0],
      };
    });

    return (
      <div
        className={`
          transform transition-all duration-300 ease-in-out w-full max-w-2xl
          ${
            slideDirection === "enter"
              ? "translate-x-0 opacity-100"
              : "translate-x-[-100%] opacity-0"
          }
        `}
      >
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-medium mb-6 text-center">날짜 선택</h2>
          <div className="flex justify-between items-center gap-2 px-4">
            {dates.map((item) => (
              <button
                key={item.fullDate}
                onClick={() => handleDateSelect(item.fullDate)}
                className={`
                  flex flex-col items-center justify-center p-3 rounded-lg
                  min-w-[60px] transition-all duration-200
                  ${
                    selectedDate === item.fullDate
                      ? "bg-green-500 text-white"
                      : "hover:bg-gray-50"
                  }
                `}
              >
                <span
                  className={`text-sm mb-1 ${
                    item.day === "일"
                      ? "text-red-500"
                      : item.day === "토"
                      ? "text-blue-500"
                      : "text-gray-500"
                  } ${selectedDate === item.fullDate ? "text-white" : ""}`}
                >
                  {item.day}
                </span>
                <span
                  className={`text-lg font-semibold ${
                    selectedDate === item.fullDate
                      ? "text-white"
                      : "text-gray-700"
                  }`}
                >
                  {item.date}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 시간 선택 컴포넌트
  const renderTimeSelect = () => {
    const now = new Date();
    const currentTime = now.toTimeString().split(" ")[0].substring(0, 5); // "HH:mm"
    const today = now.toISOString().split("T")[0];

    // 오늘이면 현재 시간 이후만, 아니면 모두 표시
    const filteredTimes = availableTimes.filter((time) => {
      const timeWithoutSeconds = time.substring(0, 5);
      const isToday = selectedDate === today;
      return !isToday || timeWithoutSeconds > currentTime;
    });

    if (filteredTimes.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <span className="text-lg text-gray-500 font-semibold">
            현재 날짜는 예약이 불가능합니다
          </span>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl p-8 shadow-2xl mt-12">
        <h2 className="text-2xl font-bold mb-8 text-center text-green-600 tracking-wide">
          예약 가능한 시간
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredTimes.map((time) => {
            const timeWithoutSeconds = time.substring(0, 5);
            return (
              <button
                key={time}
                className={
                  "p-5 rounded-2xl shadow-md border-2 text-xl font-semibold transition-all duration-200 hover:bg-green-100 hover:scale-105 " +
                  (selectedTime === time
                    ? "bg-green-500 text-white border-green-500 scale-105"
                    : "bg-white text-green-700 border-green-100")
                }
                onClick={() => handleTimeSelect(time)}
              >
                <span className="font-semibold">{timeWithoutSeconds}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // 다음 페이지로 이동하는 함수 수정
  const handleNext = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("날짜와 시간을 선택해주세요.");
      return;
    }

    try {
      // 메뉴 정보만 불러오기 (디자이너 이메일만 전달)
      const response = await axiosInstance.get(
        `user/reservation/selectmenu/${designerEmail}`
      );

      // 응답이 성공적이면 다음 페이지로 이동
      // 선택한 날짜와 시간은 state로 전달
      navigate(`/menuselect/${designerEmail}`, {
        state: {
          selectedDate, // 날짜는 다음 페이지에서 사용하기 위해 state로 전달
          selectedTime, // 시간도 다음 페이지에서 사용하기 위해 state로 전달
          designerInfo: response.data, // 서버에서 받은 메뉴 정보
        },
      });
    } catch (error) {
      console.error("메뉴 선택 페이지 이동 중 오류:", error);
      toast.error("메뉴 선택 페이지로 이동하는데 실패했습니다.");
    }
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
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      {/* 커스텀 헤더 */}
      <div className="fixed top-16 left-0 right-0 bg-white border-b z-10 mt-3">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => {
              if (step > 0) {
                goToNextStep(step - 1);
              } else {
                navigate(-1);
              }
            }}
            className="text-gray-600 p-2"
          >
            <IoChevronBackOutline size={24} />
          </button>
          <h1 className="ml-2 text-lg font-medium">
            {step === 0
              ? "디자이너 선택"
              : step === 1
              ? "날짜 선택"
              : "시간 선택"}
          </h1>
        </div>
      </div>

      {/* 메인 컨텐츠 영역 - 중앙 정렬 */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-4xl w-full px-4 py-8 mt-20">
          {/* 각 단계별 컴포넌트 */}
          <div className="relative flex justify-center items-center min-h-[500px]">
            {step === 0 && renderDesignerCard()}
            {step === 1 && renderDateSelect()}
            {step === 2 && renderTimeSelect()}
          </div>
        </div>
      </div>

      {/* 다음 버튼 */}
      {step === 2 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={handleNext}
              className={`w-full py-3 rounded-lg font-medium
                ${
                  selectedDate && selectedTime
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              disabled={!selectedDate || !selectedTime}
            >
              다음
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
