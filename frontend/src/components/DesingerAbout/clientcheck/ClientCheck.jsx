import { useState, useEffect } from "react";
import axiosInstance from "../../sign/axios/AxiosInstance.jsx";

import ScheduleDate from "./ScheduleDate.jsx";
import ClientClock from "./ClientClock.jsx";
import DesignerSchedule from "./DesignerSchedule.jsx";
import ClientCheckModal from "../../modal/clientcheck/ClientCheckModal.jsx";

export default function ClientCheck({ onClose }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [designerProfile, setDesignerProfile] = useState(null);
    const [designerSchedule, setDesignerSchedule] = useState([]);

    // 초기 selectedDate 설정
    useEffect(() => {
        setSelectedDate(new Date());
    }, []);

    // 디자이너 프로필 데이터 가져오기
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axiosInstance.get("/designer/profile");
                setDesignerProfile(response.data);
            } catch (error) {
                console.error("Failed to fetch designer profile:", error);
            }
        };

        // 모달 외부 클릭 감지
        const handleClickOutside = (e) => {
            if (isModalOpen && !e.target.closest(".modal-container")) {
                setIsModalOpen(false);
            }
        };

        fetchProfileData();
        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isModalOpen]);

    return (
        <div className="p-10 mt-10 mx-auto max-w-7xl">
            {/* 상단: 날짜 선택 및 디자이너 정보 */}
            <div className="flex mb-5">
                <ScheduleDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                <div className="flex flex-row w-auto ml-auto border rounded-lg px-2 py-2">
                    <div className="rounded-full bg-gray-300 w-12 h-12">
                        {designerProfile?.image ? (
                            <img
                                src={designerProfile.image}
                                alt="Designer"
                                className="w-12 h-12 rounded-full mb-4"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                                {/* 기본 이미지 */}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-center px-4">
                        <p className="text-gray-700 font-semibold">
                            {designerProfile?.name || "로그인을 해주세요"}
                        </p>
                    </div>
                </div>
            </div>

            {/* 예약 스케줄 표시 */}
            <div className="w-full border rounded-lg bg-white shadow-md">
                <div className="flex">
                    {/* 시간대 열 */}
                    <ClientClock />

                    {/* 디자이너와 스케줄 영역 */}
                    <DesignerSchedule
                        setModalData={setModalData}
                        setIsModalOpen={setIsModalOpen}
                        selectedDate={selectedDate}
                    />

                    {/* 모달 컴포넌트 */}
                    <ClientCheckModal
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        modalData={modalData}
                    />
                </div>
            </div>
        </div>
    );
}