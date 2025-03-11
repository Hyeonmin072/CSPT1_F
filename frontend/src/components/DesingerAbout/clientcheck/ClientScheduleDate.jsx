import { format, addDays, subDays } from "date-fns";

export default function ClientScheduleDate({ selectedDate, setSelectedDate }){
    const handlePrevDay = () => {
        const prevDate = new Date(selectedDate);
        prevDate.setDate(selectedDate.getDate() - 1);
        setSelectedDate(prevDate);
    };

    const handleNextDay = () => {
        const nextDate = new Date(selectedDate);
        nextDate.setDate(selectedDate.getDate() + 1);
        setSelectedDate(nextDate);
    };

    return (
        <div className="flex items-center space-x-4">
            {/* 이전 날짜 버튼 */}
            <button
                onClick={handlePrevDay}
                className="text-gray-700 text-xl"
            >
                ◀
            </button>

            {/* 날짜 입력 필드 */}
            <input
                type="date"
                className="bg-white"
                value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />

            {/* 다음 날짜 버튼 */}
            <button
                onClick={handleNextDay}
                className="text-gray-700 text-xl"
            >
                ▶
            </button>
        </div>
    );
}