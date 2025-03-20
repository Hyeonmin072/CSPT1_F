import { format } from "date-fns";
import { useState, useEffect } from "react";

// 정렬 함수
const sortDesigners = (designers) => {
    return designers.sort((a, b) => a.name.localeCompare(b.name, "ko-KR"));
};

// Properly define dummyDesigners as a named export
export const dummyDesigners = [
    {
        name: "김혜린",
        schedule: [
            { time: "13:00", client: "김수진 고객님", menu: "[EVENT]르블라썸 복구 매직", status: "완료", day: "월", date: "2025-03-21", cash: "17,000원" },
            { time: "15:00", client: "황의정 고객님", menu: "앞머리 컷", status: "완료", day: "화", date: "2025-03-15", cash: "17,000원" },
            { time: "20:00", client: "최희정 고객님", menu: "아윤채 모발 클리닉", status: "미완료", day: "수", date: "2025-03-18", cash: "17,000원" },
            { time: "22:00", client: "김나윤 고객님", menu: "프리미엄염색", status: "미완료", day: "목", date: "2025-03-18", cash: "17,000원" },
        ],
    },
    {
        name: "황새롬",
        schedule: [
            { time: "10:00", client: "한세진 고객님", menu: "샴푸 + 드라이", status: "완료", day: "금", date: "2025-03-19", cash: "17,000원" },
        ],
    },
    {
        name: "박재완",
        schedule: [
            { time: "08:00", client: "Cameron 고객님", menu: "샴푸 + 드라이", status: "완료", day: "월", date: "2025-03-21", cash: "17,000원" },
            { time: "11:00", client: "한세진 고객님", menu: "[시그니처]CS컬 드라이 펌", status: "완료", day: "화", date: "2025-03-21", cash: "17,000원" },
            { time: "13:00", client: "사연진 고객님", menu: "볼륨 매직", status: "완료", day: "수", date: "2025-03-27", cash: "17,000원" },
        ],
    },
    {
        name: "Emmy Massey",
        schedule: [
            { time: "09:00", client: "안세나 고객님", menu: "[EVENT]컷 + 포인트펌 + 다운펌", status: "완료", day: "목", date: "2025-03-30", cash: "17,000원" },
        ],
    },
    {
        name: "김민재",
        schedule: [
            { time: "09:00", client: "안세나 고객님", menu: "[EVENT]컷 + 포인트펌 + 다운펌", status: "완료", day: "금", date: "2025-03-27" , cash: "17,000원"},
        ],
    },
    {
        name: "김민아",
        schedule: [
            { time: "09:00", client: "안세나 고객님", menu: "[EVENT]컷 + 포인트펌 + 다운펌", status: "완료", day: "토", date: "2025-03-20", cash: "17,000원" },
        ],
    },
    {
        name: "김민하",
        schedule: [
            { time: "09:00", client: "안세나 고객님", menu: "[EVENT]컷 + 포인트펌 + 다운펌", status: "완료", day: "일", date: "2025-03-20", cash: "17,000원" },
        ],
    },
    {
        name: "김예원",
        schedule: [
            { time: "09:00", client: "안세나 고객님", menu: "[EVENT]컷 + 포인트펌 + 다운펌", status: "완료", day: "일", date: "2025-03-20", cash: "17,000원" },
        ],
    },
];

export const sortWithSelfFirst = (designers, selfName) => {
    const sortedDesigners = designers.sort((a, b) => a.name.localeCompare(b.name, "ko-KR"));
    const selfIndex = sortedDesigners.findIndex((designer) => designer.name === selfName);
    if (selfIndex !== -1) {
        const [self] = sortedDesigners.splice(selfIndex, 1);
        sortedDesigners.unshift(self);
    }
    return sortedDesigners;
};

export default function DesignerSchedule({ setModalData, setIsModalOpen, selectedView, selectedDate }) {
    const [designerProfile] = useState({
        id: 1,
        imageURL: null,
        name: "김예원", // 현재 로그인된 디자이너 이름
        roll: "헤어디자이너",
        phone: "010-1234-5678",
    });

    const [designers, setDesigners] = useState([]); // 디자이너 데이터 상태

    const timeSlots = [
        "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
        "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
    ];

    useEffect(() => {
        // 더미 데이터를 가져와 정렬 후 상태에 저장
        const sortedDesigners = sortWithSelfFirst(dummyDesigners, designerProfile.name);
        setDesigners(sortedDesigners);
    }, [designerProfile.name]);

    return (
        <div className="flex">
            {designers
                .filter((designer) =>
                    selectedView === "my" ? designer.name === designerProfile.name : true
                )
                .map((designer, index) => (
                    <div key={index} className="min-w-[220px]">
                        <h3 className="text-lg font-bold flex items-center justify-center h-24">
                            {designer.name}
                        </h3>
                        <div>
                            {timeSlots.map((time, slotIndex) => {
                                // 선택된 날짜와 시간에 맞는 예약 필터링
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
                                                setModalData(appointment); // 예약 데이터 설정
                                                setIsModalOpen(true); // 모달 열기
                                            }
                                        }}
                                    >
                                        {appointment ? (
                                            <div className="text-center">
                                                <span className="block text-gray-700 text-lg">{appointment.client}</span>
                                                <span className="block text-sm text-gray-500">{appointment.menu}</span>
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
