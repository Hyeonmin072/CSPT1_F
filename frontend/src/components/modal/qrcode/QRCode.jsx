import React, { useState } from "react";
import { QRCodeCanvas as QRCode } from "qrcode.react";

export default function QRCodeModal({ isModalOpen, setIsModalOpen }) {
    const qrValue = "출석 완료!"; // QR 코드에 텍스트 메시지를 직접 포함
    // 모달 닫기
    const handleCloseModal = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    if (!isModalOpen) return null; // 모달 닫히면 아무것도 렌더링하지 않음

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-96 text-center flex flex-col">
                <h2 className="text-xl font-bold mb-4">출석 QR 코드</h2>

                {/* QR 코드 출력 */}
                <div className="p-4 border rounded bg-white flex justify-center">
                    <QRCode value={qrValue} size={128} />
                </div>

                {/* 닫기 버튼 */}
                <button
                    className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={handleCloseModal}
                >
                    닫기
                </button>
            </div>
        </div>
    );
}
