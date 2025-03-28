import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { dummySchedules } from "../../dummydata/DummySchedules.jsx";
import { startOfWeek, endOfWeek, parseISO, isWithinInterval, format } from "date-fns";

export default function ScheduleQuick() {
    const [currentTime, setCurrentTime] = useState(new Date()); // 현재 시간 상태
    const [upcomingReservations, setUpcomingReservations] = useState([]); // 다음 예약 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [currentWeekRange, setCurrentWeekRange] = useState({ start: null, end: null }); // 주간 범위

    // 현재 요일 가져오기
    const getDayOfWeek = () => {
        const days = ["일", "월", "화", "수", "목", "금", "토"];
        return days[new Date().getDay()];
    };

    useEffect(() => {
        // 현재 날짜를 기준으로 이번 주의 시작과 끝 날짜 계산
        const now = new Date();
        const start = startOfWeek(now, { weekStartsOn: 1 }); // 월요일 시작
        const end = endOfWeek(now, { weekStartsOn: 1 }); // 일요일 끝

        // 주간 범위 상태 저장
        setCurrentWeekRange({ start, end });

        // 더미 데이터에서 현재 주간 스케줄 필터링
        const filteredSchedule = dummySchedules.filter((schedule) => {
            const scheduleDate = parseISO(schedule.date); // 일정 날짜를 파싱
            return isWithinInterval(scheduleDate, { start, end }); // 주간 범위 내인지 확인
        });

        const todayDay = getDayOfWeek(); // 현재 요일 확인

        // 현재 요일과 일치하는 데이터를 필터링
        const todaySchedules = filteredSchedule.filter(
            (schedule) => schedule.day === todayDay
        );

        // 현재 시간 이후의 예약만 필터링
        const futureReservations = todaySchedules
            .map((item) => {
                const [hours, minutes] = item.time.split(":").map(Number);
                const reservationTime = new Date();
                reservationTime.setHours(hours, minutes, 0, 0); // 예약 시간을 설정

                return { ...item, reservationTime };
            })
            .filter((item) => item.reservationTime > currentTime) // 현재 시간 이후만
            .sort((a, b) => a.reservationTime - b.reservationTime); // 가까운 순으로 정렬

        setUpcomingReservations(futureReservations.slice(0, 4)); // 가장 가까운 4개만 저장
        setLoading(false); // 로딩 상태 종료


        console.log("주간 스케줄:", filteredSchedule);
        console.log("예약 데이터:", todaySchedules);
    }, [currentTime]);

    if (loading) {
        return <div className="text-center mt-4">로딩 중...</div>; // 로딩 상태 표시
    }

    if (upcomingReservations.length === 0) {
        return (
            <div className="flex flex-col ml-4  min-h-[250px] overflow-y-auto">
                <div className="text-l font-bold">
                    예정된 나의 예약 손님: {upcomingReservations.length}명
                </div>

                <div className="text-center mt-4 flex items-center justify-center">예정된 예약이 없습니다.</div>
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center mb-4 w-full">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <Bell className="w-[30px] h-[30px] text-white"/>
                </div>
                <div className="ml-4">
                    <div className="text-l font-bold">
                        오늘 나의 예약 손님: {upcomingReservations.length}명
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full min-h-[250px] overflow-y-auto">
                {upcomingReservations.map((item, index) => (
                    <div key={index} className="mb-2">
                        <div className="flex items-center py-1 border-gray-300">
                            <div className="font-bold w-[60px] text-sm">{item.time}</div>
                            <div
                                className={`p-1 flex-1 border-l-4 pl-1 border-l-[#8239BC] bg-gray-200 rounded-lg`}
                            >
                                <div className="flex justify-between pb-1">
                                    <p className="font-bold text-xs px-2">{item.client}</p>
                                    <p className="font-bold text-gray-400 text-xs">상태 | {item.status}</p>
                                </div>
                                <div>
                                    <p className="text-xs px-4"> {item.menu}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
