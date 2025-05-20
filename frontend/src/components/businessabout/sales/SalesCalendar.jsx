import BusinessHeader from "../../common/BusinessHeader.jsx";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import { format } from "date-fns";
import "react-calendar/dist/Calendar.css";
import axiosInstance from "../../sign/axios/AxiosInstance.jsx";

export default function SalesCalendar() {
    const { designerEmail } = useParams(); 
    const [details, setDetails] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [clickedDate, setClickedDate] = useState(null);

    useEffect(() => {
        const fetchDesignerCalendar = async () => {
            try {
                const year = selectedDate.getFullYear(); 
                const month = selectedDate.getMonth() + 1;
    
                const response = await axiosInstance.get(
                    `/shop/sales/designers/${designerEmail}?year=${year}&month=${month}`
                );
                const data = response.data;
                console.log("디자이너 캘린더 데이터: ", data);
    
                if (data) {
                    // 날짜별 매출 데이터를 스케줄 형식으로 변환
                    const formattedSchedules = Object.entries(data).map(([day, cash]) => ({
                        date: new Date(year, month - 1, parseInt(day)).toISOString().split("T")[0],
                        cash: cash,
                    }));
                    setSchedules(formattedSchedules);
                }
            } catch (error) {
                console.log("디자이너 캘린더 데이터 오류 :", error);
            }
        };
    
        fetchDesignerCalendar();
    }, [designerEmail, selectedDate]);

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showModal]);

    const getSchedulesByDate = (date) => {
        const formattedDate = date.toISOString().split("T")[0];
        return schedules.filter((schedule) => schedule.date === formattedDate);
    };

    // 달력에 표시할 매출 형식화
    const formatSales = (date) => {
        const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD 형식
        const schedule = schedules.find((s) => s.date === formattedDate); // 문자열 비교
        return schedule ? `${schedule.cash.toLocaleString()} 원` : "-";
    };

    // 날짜 클릭 시 모달 열기
    const handleDateClick = async (date) => {
        setClickedDate(date);
        await fetchDetails(date); // 상세 데이터 요청
        setShowModal(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setShowModal(false);
        setClickedDate(null);
    };

    const fetchDetails = async (date) => {
        try {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
    
            const response = await axiosInstance.get(
                `/shop/sales/designers/${designerEmail}/detail?year=${year}&month=${month}&day=${day}`
            );
            const data = response.data;
            console.log("상세 데이터: ", data);
    
            setDetails(data); // 상세 데이터를 상태에 저장
        } catch (error) {
            console.log("상세 데이터 요청 오류: ", error);
        }
    };

    return (
        <div>
            <BusinessHeader />

            <div className="p-5 pt-10 mt-20">
                <div className="flex flex-col items-center justify-center w-full">
                    <h2 className="text-xl font-bold mb-4">디자이너 매출 캘린더</h2>
                    <div className="w-full max-w-[900px]">
                        <Calendar
                            onChange={setSelectedDate}
                            value={selectedDate}
                            onClickDay={handleDateClick}
                            tileContent={({ date }) => (
                                <div className="text-xs text-center mt-1">
                                    {formatSales(date)}
                                </div>
                            )}
                            className="calendar-custom rounded"
                        />
                    </div>

                    <Link to="/sales" className="mt-10 text-[#01A299] block">
                        ← 목록으로 돌아가기
                    </Link>
                </div>
            </div>

            {/* 모달 */}
            {showModal && clickedDate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-60">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] max-h-[500px] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">
                            {clickedDate ? format(clickedDate, "yyyy년 MM월 dd일") : "Null"}의 일정
                        </h2>

                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2 text-left">시간</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">메뉴</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">매출</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">고객 성함</th>
                                </tr>
                            </thead>
                            <tbody>
                                {details
                                    .sort((a, b) => new Date(a.paymentTime) - new Date(b.paymentTime)) // 시간 정렬
                                    .map((detail, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-2">
                                                {new Date(detail.paymentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">{detail.menuName}</td>
                                            <td className="border border-gray-300 px-4 py-2">{detail.integer.toLocaleString()} 원</td>
                                            <td className="border border-gray-300 px-4 py-2">{detail.userName}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>

                        <button
                            onClick={closeModal}
                            className="mt-4 px-4 py-2 bg-green-600 text-white rounded flex ml-auto"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                .calendar-custom {
                    width: 100% !important;
                    min-width: 700px !important;
                    max-width: 900px !important;
                }

                .react-calendar__tile--now {
                    background-color: #00D500 !important; /* 현재 날짜 색상 */
                    color: #ffffff !important;
                }

                .react-calendar__tile--active {
                    background-color: green !important; /* 선택된 날짜 */
                    color: #ffffff !important;
                }
            `}</style>
        </div>
    );
}