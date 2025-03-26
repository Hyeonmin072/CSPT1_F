import { useState, useEffect } from "react";
import { Trash2, Search } from "lucide-react";

import BlackListCreateModal from "../../modal/blacklist/BlackListCreateModal.jsx";
import BlackListDetailModal from "../../modal/blacklist/BlackListDetailModal.jsx";

export const DummyProfile = [
    { id: 1, name: "김현민", userId: "asdf", reason: "강 차단" },
    { id: 2, name: "김형섭", userId: "asdf2", reason: "진상 손님" },
    { id: 3, name: "최민수", userId: "asdf3", reason: "규칙 위반" },
];

export default function BlackList() {
    const [blacklist, setBlacklist] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [checkedItems, setCheckedItems] = useState({}); // 체크박스 상태 관리
    const [clickCount, setClickCount] = useState(0); // 클릭 횟수 상태

    useEffect(() => {
        setBlacklist(DummyProfile);
    }, []);

    const toggleCheck = (id) => {
        setCheckedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleDelete = (id) => {
        setBlacklist((prev) => prev.filter((entry) => entry.id !== id));
    };

    const handleDeleteChecked = () => {
        setBlacklist((prev) => prev.filter((entry) => !checkedItems[entry.id]));
        setCheckedItems({}); // 체크 상태 초기화
    };

    const handleRowClick = (item) => {
        // 두 번 클릭했을 때만 모달을 엽니다.
        setClickCount((prev) => prev + 1);

        if (clickCount === 1) {
            setSelectedItem(item);
            setClickCount(0); // 초기화
        }

        // 클릭 횟수 초기화 타이머 설정 (예: 500ms 내에 두 번 클릭해야 함)
        setTimeout(() => {
            setClickCount(0);
        }, 500);
    };

    return (
        <div className="max-w-8xl p-6 flex flex-col items-center">
            <div className="w-[1000px] flex flex-row justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">블랙리스트</h1>

                <div className="flex flex-row space-x-5">
                    <div className="flex-1 flex items-center border rounded-xl px-2">
                        <input type="text" placeholder="이름 검색" className="w-full outline-none" />
                        <Search className="w-5 h-5 text-gray-400" />
                    </div>
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        onClick={() => setShowModal(true)}
                    >
                        블랙리스트 등록
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                        onClick={handleDeleteChecked}
                    >
                        체크목록 삭제
                    </button>
                </div>
            </div>

            <div className="flex justify-center overflow-auto">
                <table className="table-auto w-[1000px] rounded overflow-hidden">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="px-6 py-4 border-gray-300 flex items-center justify-center">
                            <button
                                className="text-gray bg-white flex items-center justify-center font-bold h-5 w-5"
                                onClick={() => {
                                    // 선택된 체크박스 모두 해제
                                    setCheckedItems({});
                                }}
                            >
                                {Object.keys(checkedItems).length > 0 ? "−" : ""}
                            </button>
                        </th>
                        <th className="px-6 py-4 border-gray-300">이름</th>
                        <th className="px-6 py-4 border-gray-300">ID</th>
                        <th className="px-6 py-4 border-gray-300">사유</th>
                    </tr>
                    </thead>
                    <tbody>
                    {blacklist.map((item) => (
                        <tr
                            key={item.id}
                            className="hover:bg-gray-100"
                            onClick={() => handleRowClick(item)} // 행 클릭
                        >
                            <td className="px-6 py-4 border text-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-blue-500"
                                    checked={checkedItems[item.id] || false}
                                    onChange={(e) => {
                                        e.stopPropagation(); // 체크박스 클릭 시 행 클릭 방지
                                        toggleCheck(item.id);
                                    }}
                                />
                            </td>
                            <td className="px-6 py-5 border">{item.name}</td>
                            <td className="px-6 py-5 border">{item.userId}</td>
                            <td className="px-6 py-5 flex flex-row justify-between items-center border">
                                <span>{item.reason}</span>
                                <button
                                    className="text-red-500 hover:text-red-700 ml-auto"
                                    onClick={(e) => {
                                        e.stopPropagation(); // 삭제 버튼 클릭 시 행 클릭 방지
                                        handleDelete(item.id);
                                    }}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* 모달 창 */}
            <BlackListCreateModal
                showModal={showModal}
                setShowModal={setShowModal}
                setBlacklist={setBlacklist}
            />

            {/* 상세 모달 */}
            <BlackListDetailModal
                setShowModal={setShowModal}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
            />
        </div>
    );
}

