import { Star, QrCode , UserRoundPen, LogOut } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import {useState} from "react";

import QRCodeModal from "../../modal/qrcode/QRCode.jsx";

export default function ProfileInfo(){
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [qrValue, setQrValue] = useState(""); // QR 코드 값 상태 관리

    // 모달 열기
    const handleOpenModal = () => {
        // localhost URL 기반 QR 생성
        // const attendanceUrl = `http://localhost:5173/attendance?sessionId=${Math.random()
        //     .toString(36)
        //     .substr(2, 10)}`;
        //setQrValue(attendanceUrl); // QR 코드 값 설정
        setIsModalOpen(true);
    };

        return(
        <>
            <header className="mb-4 flex justify-between items-center h-[140px]">
                {/* 상점 이름과 리뷰 */}
                <div className="p-6">
                    <div className="w-full">
                        <h1 className="text-2xl font-bold mb-2">김봉팔 헤어</h1>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current"/>
                        <p className="text-gray-500"> 4.5 (194 리뷰)</p>
                    </div>
                </div>
                {/* 로그아웃 버튼 */}
                <button
                    className="m-4 flex items-center justify-center gap-2 bg-gray-300 w-[150px] h-10 rounded-full text-md text-gray-600 hover:text-gray-900 p-5 font-bold">
                    <span>로그아웃</span>
                    <LogOut className="w-4 h-4"/>
                </button>
            </header>
            {/* 버튼들 */}
            <div className="flex border-t-2">
                <button
                    className="w-1/2 border-r-2 py-2 px-4 hover:bg-gray-100 flex flex-row gap-2 justify-center"
                    onClick={() => navigate("/profile")}>
                    <UserRoundPen/>
                    <p>정보 수정</p>
                </button>
                <button
                    className="w-1/2 py-2 px-4 hover:bg-gray-100 flex flex-row gap-2 justify-center"
                    onClick={handleOpenModal}
                >
                    <QrCode/>
                    <p>근태QR</p>
                </button>

                {/* QR 코드 모달 */}
                <QRCodeModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    qrValue={qrValue} // QR 코드 값 전달
                />
            </div>
        </>
        );
    }