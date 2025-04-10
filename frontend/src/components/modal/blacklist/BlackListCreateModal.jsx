import { useState } from "react";
import ApiBlacklist from "../../businessabout/blacklist/api/ApiBlackList.jsx";

export default function BlackListCreateModal({ showModal, setShowModal, setBlacklist, sId }) {
    // 이후 리뷰페이지 제작 후, 그 고객 리뷰게시글에서 신고 버튼을 눌렀을 떄,유저 id와 name을 props로 받아 가져오도록 수정
    const [newEntry, setNewEntry] = useState({ u_name: "", u_id: "", b_reason: "" });
    
    // 블랙리스트 등록 함수
    const handleAdd = async () => {
        if (newEntry.u_name && newEntry.u_id && newEntry.b_reason) {
            try {
                // 중복 체크 API 호출
                const isAlreadyBlacklisted = await ApiBlacklist.checkBlacklistEntry(sId, newEntry.u_id);
                if (isAlreadyBlacklisted) {
                    alert("이미 등록되어있습니다.");
                    return;
                }

                const b_id = crypto.randomUUID(); // 랜덤 UUID 생성
                const entryWithIds = {
                    u_id: newEntry.u_id, // 유저 ID
                    b_id, // 블랙리스트 고유 ID 
                    s_id: sId, // 현재 사업자 ID
                    b_reason: newEntry.b_reason, // 등록 사유
                };

                const addedEntry = await ApiBlacklist.addBlacklist(entryWithIds); // API 호출
                setBlacklist((prev) => [...prev, addedEntry]); // 상태 업데이트
                setNewEntry({ u_name: "", u_id: "", b_reason: "" }); // 입력 필드 초기화
                setShowModal(false);
            } catch (error) {
                console.error("Error adding entry:", error);
                alert("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        } else {
            alert("모든 필드를 입력해주세요!");
        }
    };


    return (
        <>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-[600px] bg-white p-6 rounded shadow-lg space-y-2">
                        <h2 className="text-lg font-bold mb-4">블랙리스트 등록</h2>
                        <div className="flex flex-row space-x-3">
                            <div className="mb-2">
                                <label className="block text-sm font-medium">유저 ID</label>
                                <input
                                    type="text"
                                    className="w-[270px] px-2 py-1 border rounded"
                                    value={newEntry.u_id}
                                    readOnly
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium">이름</label>
                                <input
                                    type="text"
                                    className="w-[270px] px-2 py-1 border rounded bg-gray-100"
                                    value={newEntry.u_name}
                                    readOnly
                                />
                            </div>

                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">등록 사유</label>
                            <textarea
                                className="w-full h-[250px] px-2 py-1 border rounded resize-none"
                                value={newEntry.b_reason}
                                onChange={(e) =>
                                    setNewEntry((prev) => ({...prev, b_reason: e.target.value}))
                                }
                                rows={4}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
                                onClick={handleAdd}
                            >
                                등록
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 "
                                onClick={() => setShowModal(false)}
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
