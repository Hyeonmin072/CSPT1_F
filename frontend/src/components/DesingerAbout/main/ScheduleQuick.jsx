import { useState, useEffect } from "react";
import { Bell } from "lucide-react";

export default function ScheduleQuick({ scheduleData }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [upcomingReservations, setUpcomingReservations] = useState([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date()); // 1분마다 현재 시간 업데이트
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // 현재 시간 이후의 예약만 필터링
        const futureReservations = scheduleData
            .map((item) => {
                const [hours, minutes] = item.time.split(":").map(Number);
                const reservationTime = new Date();
                reservationTime.setHours(hours, minutes, 0, 0); // 예약 시간을 설정

                return {
                    ...item,
                    reservationTime,
                };
            })
            .filter((item) => item.reservationTime > currentTime) // 현재 시간 이후만
            .sort((a, b) => a.reservationTime - b.reservationTime); // 가장 가까운 예약 순으로 정렬

        // 가장 가까운 4개 예약만 가져오기
        setUpcomingReservations(futureReservations.slice(0, 4));
    }, [currentTime, scheduleData]); // currentTime과 scheduleData 변경 시마다 실행

    return (
        <>
            <div className="flex items-center mb-4 w-full">
                <div className="w-12 h-12 rounded-full bg-[#00E7D5] flex items-center justify-center">
                    <Bell className="w-[30px] h-[30px] text-white" />
                </div>
                <div className="ml-4">
                    <div className="text-l font-bold">A가게</div>
                    <div className="text-l font-bold">
                        오늘의 총 예약 손님: {scheduleData.length}명
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full">
                {upcomingReservations.map((item, index) => {
                    let borderColor = "border-l-gray-300"; // 기본값

                    if (item.reservationTime > currentTime) {
                        borderColor = "border-l-[#8239BC]"; // 예정된 예약
                    } else if (item.reservationTime <= currentTime) {
                        borderColor = "border-l-[#12BDB2]"; // 완료된 예약
                    }

                    return (
                        <div key={index} className="mb-2">
                            <div className="flex items-center py-1 border-gray-300">
                                <div className="font-bold w-[60px] text-sm">
                                    {item.time}
                                </div>
                                <div
                                    className={`p-1 flex-1 border-l-4 pl-1 ${borderColor} bg-gray-200 rounded-lg`}
                                >
                                    <div className="flex justify-between pb-1">
                                        <p className="font-bold text-xs px-2">
                                            {item.customer}
                                        </p>
                                        <p className="font-bold text-gray-400 text-xs">
                                            담당 | {item.designer}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs px-4"> - {item.service}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
