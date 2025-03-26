export default function SeekWorkDays({ selectedDays }){
    return(
        <div className="flex flex-col w-full max-w-4xl p-4 border-b-2 pb-8">
            <h2 className="text-2xl font-semibold mb-4">희망 근무요일</h2>
            <div className=" rounded-lg w-full max-w-4xl">
                <div className="border p-3 rounded">
                    <div className="flex space-x-3">
                        {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
                            <span
                                key={day}
                                className={`px-4 py-2 rounded ${selectedDays.includes(day) ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"}`}
                            >
                                {day}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}