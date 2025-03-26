import {useState} from "react";

export default function BlackListCreateModal({ showModal, setShowModal, setBlacklist }){
    const [newEntry, setNewEntry] = useState({ name: "", userId: "", reason: "" });

    const handleAdd = () => {
        if (newEntry.name && newEntry.userId && newEntry.reason) {
            setBlacklist((prev) => [
                ...prev,
                { id: Date.now(), ...newEntry },
            ]);
            setNewEntry({ name: "", userId: "", reason: "" });
            setShowModal(false);
        } else {
            alert("모든 필드를 입력해주세요!");
        }
    };

    return(
        <>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-[600px] bg-white p-6 rounded shadow-lg space-y-2">
                        <h2 className="text-lg font-bold mb-4">블랙리스트 등록</h2>
                        <div className="flex flex-row space-x-3">
                            <div className="mb-2">
                                <label className="block text-sm font-medium">이름</label>
                                <input
                                    type="text"
                                    className="w-[270px] px-2 py-1 border rounded"
                                    value={newEntry.name}
                                    onChange={(e) =>
                                        setNewEntry((prev) => ({...prev, name: e.target.value}))
                                    }
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium">ID</label>
                                <input
                                    type="text"
                                    className="w-[270px] px-2 py-1 border rounded"
                                    value={newEntry.userId}
                                    onChange={(e) =>
                                        setNewEntry((prev) => ({...prev, userId: e.target.value}))
                                    }
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">등록 사유</label>
                            <textarea
                                className="w-full h-[250px] px-2 py-1 border rounded resize-none"
                                value={newEntry.reason}
                                onChange={(e) =>
                                    setNewEntry((prev) => ({...prev, reason: e.target.value}))
                                }
                                rows={4}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 mr-2"
                                onClick={() => setShowModal(false)}
                            >
                                취소
                            </button>
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                onClick={handleAdd}
                            >
                                등록
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}