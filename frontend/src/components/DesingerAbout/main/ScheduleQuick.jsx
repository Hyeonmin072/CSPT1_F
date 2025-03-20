import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { dummyDesigners } from "../clientcheck/DesignerSchedule.jsx";

export default function ScheduleQuick() {
    const [currentTime, setCurrentTime] = useState(new Date()); // 현재 시간 상태
    const [upcomingReservations, setUpcomingReservations] = useState([]); // 다음 예약 상태
    const [loading, setLoading] = useState(true); // 로딩 상태

    // 현재 시간 업데이트 (1분 간격)
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // 1분마다 업데이트

        return () => clearInterval(timer);
    }, []);

    // 데이터 가져오기
    useEffect(() => {
        const fetchScheduleData = async () => {
            try {
                // 실제 API 호출 시 아래 코드를 활성화
                // const response = await fetch("/api/schedule/today");
                // const data = await response.json();

                // 지금은 더미 데이터 사용
                const data = dummyDesigners;

                // 현재 시간 이후의 예약만 필터링
                const futureReservations = data
                    .map((item) => {
                        const [hours, minutes] = item.time.split(":").map(Number);
                        const reservationTime = new Date();
                        reservationTime.setHours(hours, minutes, 0, 0); // 예약 시간을 설정

                        return { ...item, reservationTime };
                    })
                    .filter((item) => item.reservationTime > currentTime) // 현재 시간 이후만
                    .sort((a, b) => a.reservationTime - b.reservationTime); // 가까운 순으로 정렬

                setUpcomingReservations(futureReservations.slice(0, 4)); // 가장 가까운 4개만 저장
            } catch (error) {
                console.error("Error fetching schedule data:", error);
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchScheduleData();
    }, [currentTime]); // currentTime이 변경될 때마다 실행

    if (loading) {
        return <div className="text-center mt-4">로딩 중...</div>; // 로딩 상태 표시
    }

    if (upcomingReservations.length === 0) {
        return <div className="text-center mt-4">예정된 예약이 없습니다.</div>; // 예약 데이터가 없을 때
    }

    return (
        <>
            <div className="flex items-center mb-4 w-full">
                <div className="w-12 h-12 rounded-full bg-[#00E7D5] flex items-center justify-center">
                    <Bell className="w-[30px] h-[30px] text-white" />
                </div>
                <div className="ml-4">
                    <div className="text-l font-bold">A가게</div>
                    <div className="text-l font-bold">
                        오늘의 총 예약 손님: {dummyDesigners.length}명
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
                                    <p className="font-bold text-gray-400 text-xs">담당 | {item.designer}</p>
                                </div>
                                <div>
                                    <p className="text-xs px-4"> - {item.menu}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
