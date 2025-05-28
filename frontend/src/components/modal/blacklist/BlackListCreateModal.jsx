// BlackListCreateModal.jsx (등록 모달)
import { useState, useEffect } from "react";
import axiosInstance from "../../sign/axios/AxiosInstance";

export default function BlackListCreateModal({ showModal, setShowModal, setBlacklist, blacklist, reservations }) {
    const [selectedUserEmail, setSelectedUserEmail] = useState("");
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    // 예약에서 중복 없이 유저 이메일 + 이름 목록 만들기 (props로 reservations 받음)
    const uniqueUsers = [];
    const emailSet = new Set();
    for (const r of reservations) {
        if (r.userEmail && !emailSet.has(r.userEmail)) {
            emailSet.add(r.userEmail);
            uniqueUsers.push({ userName: r.userName, userEmail: r.userEmail });
        }
    }

    const handleAdd = async () => {
        if (!selectedUserEmail) {
            alert("블랙리스트에 등록할 유저를 선택해주세요.");
            return;
        }
        if (!reason.trim()) {
            alert("등록 사유를 입력해주세요.");
            return;
        }

        // 중복 체크: 이미 blacklist에 있으면 alert 후 중단
        if (blacklist.some(entry => entry.userEmail === selectedUserEmail)) {
            alert("이미 블랙리스트에 등록된 유저입니다.");
            return;
        }

        setLoading(true);
        try {
            await axiosInstance.post("/shop/blacklists", {
                userEmail: selectedUserEmail,
                reason,
            });

            // 등록 후 전체 블랙리스트 다시 불러오기
            const updatedList = await axiosInstance.get("/shop/blacklists");
            setBlacklist(updatedList.data);

            setSelectedUserEmail("");
            setReason("");
            setShowModal(false);
        } catch (error) {
            console.error("블랙리스트 등록 실패:", error);
            alert("블랙리스트 등록 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="w-[600px] bg-white p-6 rounded shadow-lg space-y-4">
                        <h2 className="text-lg font-bold mb-2">블랙리스트 등록</h2>

                        <div>
                            <label className="block mb-1 font-medium">유저 선택 (지난 7일 예약 기준)</label>
                            <select
                                className="w-full border rounded px-2 py-1"
                                value={selectedUserEmail}
                                onChange={(e) => setSelectedUserEmail(e.target.value)}
                            >
                                <option value="">-- 유저를 선택하세요 --</option>
                                {uniqueUsers.map((user) => (
                                    <option key={user.userEmail} value={user.userEmail}>
                                        {user.userName} ({user.userEmail})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">등록 사유</label>
                            <textarea
                                className="w-full border rounded px-2 py-1 resize-none"
                                rows={6}
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="등록 사유를 입력하세요"
                            />
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${
                                    loading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                onClick={handleAdd}
                                disabled={loading}
                            >
                                등록
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={() => setShowModal(false)}
                                disabled={loading}
                            >
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
