import { useState, useEffect } from "react";
import { Trash2, Search } from "lucide-react";
import axios from "axios";

import BlackListCreateModal from "../../modal/blacklist/BlackListCreateModal.jsx";
import BlackListDetailModal from "../../modal/blacklist/BlackListDetailModal.jsx";
import ApiBlacklist from "./api/ApiBlackList.jsx";

export default function BlackList() {
  const [blacklist, setBlacklist] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [sId, setSId] = useState("merchant123"); // 현재 로그인한 사업자 ID

  useEffect(() => {
    const fetchBlacklists = async () => {
      try {
        const response = await axios.get("/shop/blacklists");
        console.log("블랙리스트 데이터:", response.data);
        setBlacklist(response.data);
      } catch (error) {
        console.error("블랙리스트 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    fetchBlacklists();
  }, [sId]);

  const toggleCheck = (b_id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [b_id]: !prev[b_id],
    }));
  };

  const handleDelete = async (b_id) => {
    try {
      const result = await ApiBlacklist.deleteBlacklist([b_id]); // 배열로 전달
      if (result) {
        setBlacklist((prev) => prev.filter((entry) => entry.b_id !== b_id));
      }
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  const handleDeleteChecked = async () => {
    const idsToDelete = Object.keys(checkedItems).filter(
      (b_id) => checkedItems[b_id]
    );

    if (idsToDelete.length === 0) {
      alert("삭제할 항목을 선택하세요.");
      return;
    }

    try {
      const result = await ApiBlacklist.deleteBlacklist(idsToDelete);
      if (result) {
        setBlacklist((prev) =>
          prev.filter((entry) => !idsToDelete.includes(entry.b_id))
        );
        setCheckedItems({});
      }
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  const [clickCounts, setClickCounts] = useState({}); // 유저별 클릭 횟수 관리

  const handleRowClick = (item) => {
    setClickCounts((prev) => {
      const currentCount = prev[item.b_id] || 0; // 해당 유저의 현재 클릭 횟수 가져오기

      if (currentCount + 1 === 2) {
        // 두 번 클릭된 경우 모달 열기
        setSelectedItem(item);
        return { ...prev, [item.b_id]: 0 }; // 클릭 횟수 초기화
      } else {
        // 첫 번째 클릭인 경우 클릭 횟수 증가
        return { ...prev, [item.b_id]: currentCount + 1 };
      }
    });

    // 클릭 초기화를 위한 타이머 설정
    setTimeout(() => {
      setClickCounts((prev) => ({ ...prev, [item.b_id]: 0 })); // 타이머 종료 후 해당 유저 클릭 횟수 초기화
    }, 1000);
  };

  return (
    <div className="max-w-8xl p-6 flex flex-col items-center">
      <div className="w-[1000px] flex flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">블랙리스트</h1>

        <div className="flex flex-row space-x-5">
          <div className="flex-1 flex items-center border rounded-xl px-2">
            <input
              type="text"
              placeholder="이름 검색"
              className="w-full outline-none"
            />
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

      <div className="w-[1000px] max-h-[500px] overflow-y-auto">
        <table className="table-auto w-full rounded overflow-hidden border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-4 border-gray-300 flex items-center justify-center">
                <button
                  className="text-gray bg-white flex items-center justify-center font-bold h-5 w-5"
                  onClick={() => setCheckedItems({})}
                >
                  {Object.keys(checkedItems).length > 0 ? "−" : ""}
                </button>
              </th>
              <th className="px-6 py-4 border-gray-300">이름</th>
              <th className="px-6 py-4 border-gray-300">유저 ID</th>
              <th className="px-6 py-4 border-gray-300">사유</th>
            </tr>
          </thead>
          <tbody>
            {blacklist.length > 0 ? (
              blacklist.map((item) => (
                <tr
                  key={item.b_id}
                  className="hover:bg-gray-100"
                  onClick={() => handleRowClick(item)}
                >
                  <td className="px-6 py-4 border text-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500"
                      checked={checkedItems[item.b_id] || false}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleCheck(item.b_id);
                      }}
                    />
                  </td>
                  <td className="px-6 py-5 border">{item.u_name}</td>
                  <td className="px-6 py-5 border">{item.u_id}</td>
                  <td className="px-6 py-5 flex flex-row justify-between items-center border">
                    <span>{item.b_reason}</span>
                    <button
                      className="text-red-500 hover:text-red-700 ml-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.b_id);
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-10 border text-center text-gray-500"
                >
                  등록된 블랙리스트가 없습니다
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 모달 창 */}
      <BlackListCreateModal
        showModal={showModal}
        setShowModal={setShowModal}
        setBlacklist={setBlacklist}
        sId={sId}
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
