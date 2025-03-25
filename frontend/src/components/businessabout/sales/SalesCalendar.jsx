import BusinessHeader from "../../common/BusinessHeader.jsx";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { designers } from "./DesignerSales.jsx";
import { dummySchedules } from "../../DesingerAbout/clientcheck/DesignerSchedule.jsx";

export default function SalesCalendar() {
    const { id } = useParams(); // URL에서 id 가져오기
    const designer = designers.find((d) => d.id === parseInt(id));
    console.log("선택한 디자이너:", designer); // 선택한 디자이너만 출력



    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false); // 모달 상태 관리
    const [clickedDate, setClickedDate] = useState(null); // 클릭한 날짜 저장

    // 선택된 날짜의 예약 데이터를 필터링
    const getSchedulesByDate = (date) => {
        const formattedDate = date.toISOString().split("T")[0];
        return dummySchedules.filter((schedule) => schedule.date === formattedDate);
    };

    // 특정 날짜의 총 매출 계산
    const getTotalCashByDate = (date) => {
        const schedules = getSchedulesByDate(date);
        return schedules.reduce(
            (acc, schedule) => acc + parseInt(schedule.cash.replace(/,/g, "")),
            0
        );
    };

    // 달력에 표시할 매출 형식화
    const formatSales = (date) => {
        const totalCash = getTotalCashByDate(date);
        return totalCash > 0 ? `${totalCash.toLocaleString()} 원` : "-";
    };

    // 날짜 클릭 시 모달 열기
    const handleDateClick = (date) => {
        setClickedDate(date);
        setShowModal(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setShowModal(false);
        setClickedDate(null);
    };

    return (
        <>
            <BusinessHeader />

            <div className="p-4">
                <div className="flex flex-col items-center justify-center w-full">
                    <h2 className="text-xl font-bold mb-4">
                        {designer?.name}의 매출 캘린더
                    </h2>
                    <div className="w-full max-w-[900px]">
                        <Calendar
                            onChange={setSelectedDate}
                            value={selectedDate}
                            onClickDay={(date) => {
                                console.log(`Clicked date: ${date.toLocaleDateString()}`); // 날짜 출력
                                handleDateClick(date); // 기존 클릭 이벤트 호출
                            }}
                            tileContent={({date}) => (
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
                        <h2 className="text-xl font-bold mb-4">
                            {clickedDate.toLocaleDateString()}의 일정
                        </h2>

                        {/* Table 형식으로 변경 */}
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">시간</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">메뉴</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">매출</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">고객</th>
                            </tr>
                            </thead>
                            <tbody>
                            {getSchedulesByDate(clickedDate).map((schedule, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">{schedule.time}</td>
                                    <td className="border border-gray-300 px-4 py-2">{schedule.menu}</td>
                                    <td className="border border-gray-300 px-4 py-2">{schedule.cash}</td>
                                    <td className="border border-gray-300 px-4 py-2">{schedule.client}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <button
                            onClick={closeModal}
                            className="mt-4 px-4 py-2 bg-[#019592] text-white rounded flex ml-auto"
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
                    background-color: #03DAC5 !important; /* 현재 날짜 색상 */
                    color: #ffffff !important;
                }

                .react-calendar__tile--active {
                    background-color: #01A299 !important; /* 선택된 날짜 */
                    color: #ffffff !important;
                }
            `}</style>
        </>
    );
}
