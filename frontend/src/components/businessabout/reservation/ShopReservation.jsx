import { format } from "date-fns";
import {useState, useEffect, useRef} from "react";
import { Search } from "lucide-react";

import ClientClock from "../../DesingerAbout/clientcheck/ClientClock.jsx";
import ClientScheduleDate from "../../DesingerAbout/clientcheck/ClientScheduleDate.jsx";
import ShopReservationCheck from "../../modal/reservationcheck/ShopReservation.jsx";
import d1 from "../../../assets/designer/d1.png";

// 정렬 함수 (ㄱㄴㄷ 순서)
const sortDesigners = (designers) => {
    return designers.sort((a, b) => a.name.localeCompare(b.name, "ko-KR"));
};

// 더미 데이터 정의
export const dummyDesigners = [
    {
        name: "김혜린",
        imageURL: d1,
        schedule: [
            { time: "13:00", client: "김수진 고객님", menu: "[EVENT]르블라썸 복구 매직", status: "완료", day: "월", date: "2025-03-20", cash: "17,000원" },
            { time: "15:00", client: "황의정 고객님", menu: "앞머리 컷", status: "완료", day: "화", date: "2025-03-20", cash: "17,000원" },
            { time: "20:00", client: "최희정 고객님", menu: "아윤채 모발 클리닉", status: "미완료", day: "수", date: "2025-03-20", cash: "17,000원" },
            { time: "22:00", client: "김나윤 고객님", menu: "프리미엄염색", status: "미완료", day: "목", date: "2025-03-18", cash: "17,000원" },
        ],
    },
    {
        name: "황새롬",
        imageURL: d1,
        schedule: [
            { time: "10:00", client: "한세진 고객님", menu: "샴푸 + 드라이", status: "완료", day: "금", date: "2025-03-19", cash: "17,000원" },
        ],
    },
    {
        name: "박재완",
        imageURL: d1,
        schedule: [
            { time: "08:00", client: "Cameron 고객님", menu: "샴푸 + 드라이", status: "완료", day: "월", date: "2025-03-21", cash: "17,000원" },
            { time: "11:00", client: "한세진 고객님", menu: "[시그니처]CS컬 드라이 펌", status: "완료", day: "화", date: "2025-03-21", cash: "17,000원" },
            { time: "13:00", client: "사연진 고객님", menu: "볼륨 매직", status: "완료", day: "수", date: "2025-03-27", cash: "17,000원" },
        ],
    },
    {
        name: "Emmy Massey",
        imageURL: d1,
        schedule: [
            { time: "09:00", client: "안세나 고객님", menu: "[EVENT]컷 + 포인트펌 + 다운펌", status: "완료", day: "목", date: "2025-03-30", cash: "17,000원" },
        ],
    },
    {
        name: "김민재",
        imageURL: d1,
        schedule: [
            { time: "09:00", client: "안세나 고객님", menu: "[EVENT]컷 + 포인트펌 + 다운펌", status: "완료", day: "금", date: "2025-03-27" , cash: "17,000원"},
        ],
    },
    {
        name: "김민아",
        imageURL: d1,
        schedule: [
            { time: "09:00", client: "안세나 고객님", menu: "[EVENT]컷 + 포인트펌 + 다운펌", status: "완료", day: "토", date: "2025-03-20", cash: "17,000원" },
        ],
    },
    {
        name: "김민하",
        imageURL: d1,
        schedule: [
            { time: "09:00", client: "안세나 고객님", menu: "[EVENT]컷 + 포인트펌 + 다운펌", status: "완료", day: "일", date: "2025-03-20", cash: "17,000원" },
        ],
    },
    {
        name: "김예원",
        imageURL: d1,
        schedule: [
            { time: "09:00", client: "안세나 고객님", menu: "[EVENT]컷 + 포인트펌 + 다운펌", status: "완료", day: "일", date: "2025-03-20", cash: "17,000원" },
        ],
    },
];

export default function ShopReservation() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [designers, setDesigners] = useState([]); // 디자이너 데이터 상태

    const timeSlots = [
        "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
        "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
    ];

    useEffect(() => {
        const sortedDesigners = sortDesigners(dummyDesigners); // ㄱㄴㄷ 정렬
        setDesigners(sortedDesigners);
    }, []);

    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        const handleMouseDown = (e) => {
            isDown = true;
            container.classList.add("cursor-grabbing");
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        };

        const handleMouseUp = () => {
            isDown = false;
            container.classList.remove("cursor-grabbing");
        };

        const handleMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2; // 스크롤 속도
            container.scrollLeft = scrollLeft - walk;
        };

        container.addEventListener("mousedown", handleMouseDown);
        container.addEventListener("mouseleave", handleMouseUp);
        container.addEventListener("mouseup", handleMouseUp);
        container.addEventListener("mousemove", handleMouseMove);

        return () => {
            container.removeEventListener("mousedown", handleMouseDown);
            container.removeEventListener("mouseleave", handleMouseUp);
            container.removeEventListener("mouseup", handleMouseUp);
            container.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className="p-8 mx-auto max-w-7xl">
            <div className="flex flex-row justify-between">
                <ClientScheduleDate
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />

                <div
                    className="flex flex-row items-center justify-center border rounded-xl px-2 py-2 w-[400px]">
                    <input type="text" placeholder="디자이너 이름 검색" className="w-full outline-none"/>
                    <Search className="w-5 h-5 text-gray-400"/>
                </div>
            </div>

            <div className="flex flex-row justify-center items-center">
                <p className="bg-white font-bold text-2xl p-5">
                    {selectedDate ? format(selectedDate, "yyyy년 MM월 dd일") : "날짜가 선택되지 않았습니다"}
                </p>
            </div>
            <div className="w-full">
                <div className="flex overflow-x-auto border rounded cursor-grab"
                     ref={scrollContainerRef}>
                    <>
                        <ClientClock/>
                    </>

                    <>
                        {designers.map((designer, index) => (
                            <div key={index} className="min-w-[220px]">
                                {/* 디자이너 이미지와 이름 */}
                                <div className="flex flex-row items-center justify-center space-x-4">
                                    <img
                                        src={designer.imageURL}
                                        className="w-12 h-12 rounded-full mb-2"
                                    />
                                    <h3 className="text-lg font-bold h-24 flex items-center">{designer.name}</h3>
                                </div>

                                {/* 시간대별 스케줄 표시 */}
                                <div>
                                    {timeSlots.map((time, slotIndex) => {
                                        const appointment = designer.schedule?.find(
                                            (app) =>
                                                app.time === time &&
                                                app.date &&
                                                selectedDate &&
                                                format(new Date(app.date), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
                                        );

                                        const leftBorderColor =
                                            appointment?.status === "완료"
                                                ? "border-l-4 border-l-green-500"
                                                : appointment?.status === "미완료"
                                                    ? "border-l-4 border-l-red-600"
                                                    : "";

                                        return (
                                            <div
                                                key={slotIndex}
                                                className={`h-24 flex items-center justify-center border ${leftBorderColor}`}
                                                onClick={() => {
                                                    if (appointment) {
                                                        setModalData({
                                                            client: appointment.client,
                                                            menu: appointment.menu,
                                                            designer: designer.name,
                                                            status: appointment.status,
                                                            imageURL: designer.imageURL,
                                                            time: appointment.time,
                                                            date: appointment.date,
                                                            cash: appointment.cash,
                                                        });
                                                        setIsModalOpen(true);
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

                    </>
                </div>
            </div>

            {/* 모달 창 */}
            <>
                <ShopReservationCheck
                    isModalOpen={isModalOpen}
                    modalData={modalData}
                    setIsModalOpen={setIsModalOpen}/>
            </>
        </div>

    );
}
