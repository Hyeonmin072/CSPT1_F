import { useState, useEffect } from "react";
import { Trash2, Search } from "lucide-react";
import axios from "axios";

import BlackListCreateModal from "../../modal/blacklist/BlackListCreateModal.jsx";
import BlackListDetailModal from "../../modal/blacklist/BlackListDetailModal.jsx";
import axiosInstance from "../../sign/axios/AxiosInstance.jsx";

export default function BlackList() {
  const [blacklist, setBlacklist] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    const fetchBlacklists = async () => {
      try {
        const response = await axiosInstance.get("/shop/blacklists");
        console.log("블랙리스트 데이터:", response.data);
        setBlacklist(response.data);
      } catch (error) {
        console.error("블랙리스트 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    fetchBlacklists();
  }, []);

  const toggleCheck = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDelete = async (name) => {
    try {
      const result = await axiosInstance.deleteBlacklist("/shop/blacklist"); // 배열로 전달
      if (result) {
        setBlacklist((prev) => prev.filter((entry) => entry.userName !== name));
      }
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  const [clickCounts, setClickCounts] = useState({}); // 유저별 클릭 횟수 관리

  const handleRowClick = (item) => {
    setClickCounts((prev) => {
      const currentCount = prev[item.userEmail] || 0; // 해당 유저의 현재 클릭 횟수 가져오기

      if (currentCount + 1 === 2) {
        // 두 번 클릭된 경우 모달 열기
        setSelectedItem(item);
        return { ...prev, [item.userEmail]: 0 }; // 클릭 횟수 초기화
      } else {
        return { ...prev, [item.userEmail]: currentCount + 1 };
      }
    });

    setTimeout(() => {
      setClickCounts((prev) => ({ ...prev, [item.userEmail]: 0 })); // 타이머 종료 후 해당 유저 클릭 횟수 초기화
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
            onClick={handleDelete}
          >
            삭제
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
              <th className="px-6 py-4 border-gray-300">유저 이름</th>
              <th className="px-6 py-4 border-gray-300">유저 이메일</th>
              <th className="px-6 py-4 border-gray-300">사유</th>
            </tr>
          </thead>
          <tbody>
            {blacklist.length > 0 ? (
              blacklist.map((item) => (
                <tr
                  key={item.userEmail}
                  className="hover:bg-gray-100"
                  onClick={() => handleRowClick(item)}
                >
                  <td className="px-6 py-4 border text-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500"
                      checked={checkedItems[item.userEmail] || false}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleCheck(item.userEmail);
                      }}
                    />
                  </td>
                  <td className="px-6 py-5 border">{item.userName}</td>
                  <td className="px-6 py-5 border">{item.userEmail}</td>
                  <td className="px-6 py-5 flex flex-row justify-between items-center border">
                    <span>{item.reason}</span>
                    <button
                      className="text-red-500 hover:text-red-700 ml-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.userEmail);
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
