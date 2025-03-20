export default function ClientClock(){
    const timeSlots = [
        "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
        "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00","23:00"
    ];

    return (
        <div className="bg-gray-100 sticky left-0 pt-24 z-10">
            {timeSlots.map((time, index) => (
                <div
                    key={index}
                    className={`h-24 w-12 flex items-center justify-center border font-semibold ${
                        index === timeSlots.length - 1 ? "border-b-0" : ""
                    }`}
                >
                    {time}
                </div>
            ))}
        </div>
    );
}