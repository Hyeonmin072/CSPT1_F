import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { startOfWeek, endOfWeek, parseISO, isWithinInterval, format } from "date-fns";
import axiosInstance from "../../sign/axios/AxiosInstance.jsx";

export default function ScheduleQuick() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [upcomingReservations, setUpcomingReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentWeekRange, setCurrentWeekRange] = useState({ start: null, end: null });

    useEffect(() => {
        // 현재 시간을 실시간으로 업데이트
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // 1분마다 업데이트

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (!selectedDate || isNaN(new Date(selectedDate).getTime())) {
            return;
        }

        const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
        const end = endOfWeek(selectedDate, { weekStartsOn: 1 });
        setCurrentWeekRange({ start, end });

        const fetchSchedule = async () => {
            try {
                const response = await axiosInstance.get(`/designer/reservation?date=${format(selectedDate, "yyyy-MM-dd")}`);
        
                if (!response.data || !Array.isArray(response.data)) {
                    throw new Error("Invalid response data format");
                }
        
                const data = response.data.map((item) => ({
                    serviceDate: parseISO(item.serviceDate), // serviceDate를 Date 객체로 변환
                    userName: item.userName,
                    menu: { name: item.menuName, price: item.menuPrice },
                    reservationStatus: item.reservationStatus,
                }));
        
                // 오늘 날짜와 현재 시간 이후의 예약만 필터링
                const today = format(new Date(), "yyyy-MM-dd");
                const filteredSchedule = data.filter((schedule) => {
                    const scheduleDate = format(schedule.serviceDate, "yyyy-MM-dd");
                    return scheduleDate === today && schedule.serviceDate > currentTime;
                });
        
                const futureReservations = filteredSchedule.sort((a, b) => a.serviceDate - b.serviceDate);
        
                setUpcomingReservations(futureReservations.slice(0, 4));
            } catch (error) {
                console.error("스케줄 데이터를 불러오는 데 실패했습니다:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSchedule();
    }, [selectedDate, currentTime]);

    if (loading) {
        return <div className="text-center mt-4">로딩 중...</div>;
    }

    if (upcomingReservations.length === 0) {
        return (
            <div className="flex flex-col ml-4 min-h-[260px] overflow-y-auto">
                <div className="text-l font-bold">오늘 예약 손님: 0명</div>
                <div className="text-center mt-4 flex items-center justify-center">예정된 예약이 없습니다.</div>
            </div>
        );
    }

    const getBorderColor = (status) => {
        if (status === "COMPLETE") return "border-l-4 border-l-green-600";
        if (status === "INCOMPLETE") return "border-l-4 border-l-red-600";
        return "border-l-4 border-l-gray-300";
    };

    return (
        <div className="w-full">
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <Bell className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                    <p className="text-m font-bold text-gray-800">
                        오늘의 예약 손님: {upcomingReservations.length}명
                    </p>
                </div>
            </div>
            <div className="flex flex-col w-full max-h-[250px] overflow-y-auto space-y-2">
                {upcomingReservations.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center p-3 bg-gray-100 rounded-lg shadow-sm"
                    >
                        <div className="font-bold w-[50px] text-sm text-gray-700">
                            {format(item.serviceDate, "HH:mm")}
                        </div>
                        <div className={`flex-1 border-l-4 pl-2 border-purple-500 ${getBorderColor(
                            item?.reservationStatus)}`}>
                            <div className="flex justify-between">
                                <p className="font-bold text-gray-800 text-sm">{item.userName}</p>
                                <div className="flex justify-between">
                                    <span className="text-xs text-gray-700">상태:
                                        {item.reservationStatus === "COMPLETE" ? "완료" : "미완료"}
                                    </span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                                {item.menu.name} - {item.menu.price}원
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}