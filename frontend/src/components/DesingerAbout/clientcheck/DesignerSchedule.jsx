import { useEffect, useState } from "react";
import { startOfWeek, endOfWeek, addDays, format, parseISO } from "date-fns";
import axiosInstance from "../../sign/axios/AxiosInstance.jsx";

export default function DesignerSchedule({ selectedDate, setModalData, setIsModalOpen }) {
    const [personalSchedule, setPersonalSchedule] = useState([]);
    const [currentWeekRange, setCurrentWeekRange] = useState({ start: null, end: null });

    // 시간대 생성 (8:00 ~ 23:30)
    const timeSlots = [...Array(32)].map((_, i) => {
        const hour = Math.floor(i / 2) + 8;
        const minute = i % 2 === 0 ? "00" : "30";
        return `${hour.toString().padStart(2, "0")}:${minute}`;
    });

    // 요일 배열
    const daysOfWeek = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];

    // 선택된 날짜에 따라 주간 범위 및 스케줄 데이터 가져오기
    useEffect(() => {
        console.log("Selected Date:", selectedDate);

        if (!selectedDate || isNaN(new Date(selectedDate).getTime())) {
            console.error("유효하지 않은 날짜가 선택되었습니다.");
            return;
        }

        // 주간 범위 설정
        const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
        const end = endOfWeek(selectedDate, { weekStartsOn: 1 });
        setCurrentWeekRange({ start, end });

        // 스케줄 데이터 가져오기
        const fetchSchedule = async () => {
            try {
                const response = await axiosInstance.get(`/designer/reservation?date=${format(selectedDate, "yyyy-MM-dd")}`);
                const data = response.data.map((item) => ({
                    serviceDate: item.serviceDate,
                    userName: item.userName,
                    menu: { name: item.menuName, price: item.menuPrice },
                    reservationStatus: item.reservationStatus,
                }));
                setPersonalSchedule(data);
            } catch (err) {
                console.error("스케줄 불러오기 실패:", err);
                alert("스케줄 데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.");
            }
        };

        fetchSchedule();
    }, [selectedDate]);

    // 예약 상태에 따른 테두리 색상 반환
    const getBorderColor = (status) => {
        if (status === "COMPLETE") return "border-l-4 border-l-green-600";
        if (status === "INCOMPLETE") return "border-l-4 border-l-red-600";
        return "border-l-4 border-l-gray-300";
    };

    return (
        <div className="flex overflow-x-auto">
            {/* 주간 날짜 및 예약 표시 */}
            {currentWeekRange.start &&
                daysOfWeek.map((day, dayIndex) => {
                    const currentDayDate = addDays(currentWeekRange.start, dayIndex);
                    const formattedDate = format(currentDayDate, "yyyy-MM-dd");
                    const isSelected = formattedDate === format(selectedDate, "yyyy-MM-dd");

                    return (
                        <div
                            key={dayIndex}
                            className={`min-w-[165px] border-r border-gray-300 ${
                                isSelected ? "bg-yellow-100" : "bg-white"
                            } duration-500`}
                        >
                            {/* 요일 헤더 */}
                            <h3 className="h-20 flex text-lg font-semibold items-center justify-center py-4 border-b border-gray-300">
                                {day}
                            </h3>

                            {/* 시간대별 예약 표시 */}
                            <div>
                                {timeSlots.map((time, slotIndex) => {
                                    const appointment = personalSchedule.find((app) => {
                                        const dt = parseISO(app.serviceDate);
                                        return (
                                            format(dt, "yyyy-MM-dd") === formattedDate &&
                                            format(dt, "HH:mm") === time
                                        );
                                    });

                                    return (
                                        <div
                                            key={slotIndex}
                                            className={`h-20 flex items-center justify-center border-b border-gray-200 ${getBorderColor(
                                                appointment?.reservationStatus
                                            )}`}
                                            onClick={() => {
                                                if (appointment) {
                                                    setModalData(appointment);
                                                    setIsModalOpen(true);
                                                }
                                            }}
                                        >
                                            {appointment ? (
                                                <button className="text-center">
                                                    <span className="block text-gray-800 text-s font-bold">
                                                        {appointment.userName}
                                                    </span>
                                                    <span className="block text-xs text-gray-400">
                                                        {appointment.menu.name}
                                                    </span>
                                                </button>
                                            ) : (
                                                <span className="text-gray-400 text-sm">&nbsp;</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}