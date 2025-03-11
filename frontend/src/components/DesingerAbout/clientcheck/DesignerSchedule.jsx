import { format, addDays, subDays } from "date-fns";

export default function DesignerSchedule({ designers, timeSlots, setModalData,setIsModalOpen, selectedView, selectedDate   }){


    return (
        <div className="flex">
            {designers
                .filter((designer) =>
                    selectedView === "my"
                        ? designer.name === "김혜린 디자이너"
                        : true
                )
                .map((designer, index) => (
                    <div key={index} className="min-w-[220px]">
                        <h3 className="text-lg font-bold flex items-center justify-center h-24">
                            {designer.name}
                        </h3>
                        <div>
                            {timeSlots.map((time, slotIndex) => {
                                // 선택된 날짜와 요일에 맞는 예약 필터링
                                const appointment = designer.schedule?.find(
                                    (app) =>
                                        app.time === time &&
                                        app.date &&
                                        selectedDate &&
                                        format(new Date(app.date), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
                                );

                                const leftBorderColor =
                                    appointment?.status === "완료"
                                        ? "border-l-4 border-l-[#4BFFD2]"
                                        : appointment?.status === "미완료"
                                            ? "border-l-4 border-l-[#8239BC]"
                                            : "";

                                return (
                                    <div
                                        key={slotIndex}
                                        className={`h-24 flex items-center justify-center border ${leftBorderColor}`}
                                        onClick={() => {
                                            if (appointment) {
                                                setModalData(appointment); // 예약 데이터를 설정
                                                setIsModalOpen(true); // 모달 열기
                                            }
                                        }}
                                    >
                                        {appointment ? (
                                            <div className="text-center">
                                                        <span className="block text-gray-700 text-lg">
                                                            {appointment.client}
                                                        </span>
                                                <span className="block text-sm text-gray-500">
                                                            {appointment.menu}
                                                        </span>
                                            </div>
                                        ) : (
                                            <span>&nbsp;</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
        </div>
    );
}