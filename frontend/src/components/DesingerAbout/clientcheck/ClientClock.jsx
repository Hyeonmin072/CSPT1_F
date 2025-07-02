export default function ClientClock() {
    const timeSlots = [...Array(32)].map((_, i) => {
        const hour = Math.floor(i / 2) + 8; // 8시부터 시작
        const minute = i % 2 === 0 ? "00" : "30"; // 30분 단위
        return `${hour.toString().padStart(2, "0")}:${minute}`;
    });

    return (
        <div className="bg-gray-100 sticky left-0 pt-20 z-10">
            {timeSlots.map((time, index) => (
                <div
                    key={index}
                    className={`h-20 w-12 flex items-center justify-center border font-semibold ${
                        index === timeSlots.length - 1 ? "border-b-0" : ""
                    }`}
                >
                    {time}
                </div>
            ))}
        </div>
    );
}