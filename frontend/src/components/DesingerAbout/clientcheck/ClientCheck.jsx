import { useState, useEffect, useRef } from "react";
import { format, addDays, subDays } from "date-fns"; // 날짜를 다루는 JS 라이브러리
import { ko } from "date-fns/locale"; // 날짜를 주어진 포맷 문자열에 맞춰 형식화하는 함수

import { dummyProfile } from "../../dummydata/DummyProfile.jsx";
import axiosInstance from "../../sign/axios/AxiosInstance.jsx";

import ScheduleDate from "./ScheduleDate.jsx";
import ClientClock from "./ClientClock.jsx";
import DesignerSchedule from "./DesignerSchedule.jsx";
import ClientCheckModal from "../../modal/clientcheck/ClientCheckModal.jsx";

export default function Clientcheck({ onClose }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);


    // 디자이너 스케줄 관련
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        setSelectedDate(new Date());
    }, []);

    const [designerprofile, setDesignerProfile] = useState("");

    useEffect(() => {
        const fetchDummyData = async () => {
            try {
                const response = await axiosInstance.get("/designer/profile"); // 이후 변경
                const data = response.data;
                setDesignerProfile(data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchDummyData();
    }, []);

    return (
        <div className="p-10 mt-10 mx-auto max-w-7xl">
            {/* 날짜, 스케줄, 디자이너 이름 */}
            <div className="flex mb-5">
                <ScheduleDate
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
                <div className="flex flex-row w-auto ml-auto border rounded-lg px-2 py-2">
                    <div className="rounded-full bg-gray-300 w-12 h-12">
                        {designerprofile && designerprofile.imageURL ? (
                            <img
                                src={designerprofile.imageURL}
                                className="w-12 h-12 rounded-full mb-4"
                            />
                        ) : (
                            <div
                                className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                                {/* 기본 이미지 */}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-center px-4">
                        <p className="text-gray-700 font-semibold">{designerprofile?.name || "로그인을 해주세요"}</p>
                    </div>
                </div>
            </div>

            {/* 예약 스케줄 표시 */}
            <div className=" w-full border rounded-lg bg-white shadow-md">
                <div
                    className="flex"
                    
                >
                    {/* 시간대 열 */}
                    <>
                        <ClientClock/>
                    </>

                    {/* 디자이너와 스케줄 영역 */}
                    <>
                        <DesignerSchedule
                            setModalData={setModalData}
                            setIsModalOpen={setIsModalOpen}
                            selectedDate={selectedDate}
                        />
                    </>

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
};