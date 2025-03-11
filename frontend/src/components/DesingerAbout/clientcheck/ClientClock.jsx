export default function ClientClock({ timeSlots }){
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