import { useState, useEffect } from "react";
import { Trash2, Search } from "lucide-react";
import axiosInstance from "../../sign/axios/AxiosInstance.jsx";

import BlackListCreateModal from "../../modal/blacklist/BlackListCreateModal.jsx";
import BlackListDetailModal from "../../modal/blacklist/BlackListDetailModal.jsx";

export default function BlackList() {
  const [blacklist, setBlacklist] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    const fetchBlacklists = async () => {
      try {
        const response = await axiosInstance.get("/shop/blacklists");
        setBlacklist(response.data);
      } catch (error) {
        console.error("블랙리스트 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    fetchBlacklists();
  }, []);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await axiosInstance.get("/shop/reservations/seven");
        setReservations(res.data);
      } catch (error) {
        console.error("최근 7일 예약을 불러오는 중 오류 발생:", error);
      }
    };
    fetchReservations();
  }, []);

  const toggleCheck = (email) => {
    setCheckedItems((prev) => ({
      ...prev,
      [email]: !prev[email],
    }));
  };

  const toggleAllCheck = () => {
    const allChecked =
        blacklist.length > 0 &&
        Object.keys(checkedItems).length === blacklist.length &&
        Object.values(checkedItems).every(Boolean);
    if (allChecked) {
      setCheckedItems({});
    } else {
      const newChecked = {};
      blacklist.forEach((item) => {
        newChecked[item.userEmail] = true;
      });
      setCheckedItems(newChecked);
    }
  };

  const handleDelete = async () => {
    try {
      const emailsToDelete = Object.entries(checkedItems)
          .filter(([_, checked]) => checked)
          .map(([email]) => email);

      if (emailsToDelete.length === 0) {
        alert("삭제할 항목을 선택해주세요.");
        return;
      }

      await axiosInstance.delete("/shop/blacklists", { data: emailsToDelete });

      setBlacklist((prev) => prev.filter((entry) => !emailsToDelete.includes(entry.userEmail)));
      setCheckedItems({});
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  const handleSingleDelete = async (email) => {
    try {
      await axiosInstance.delete("/shop/blacklists", { data: [email] });

      setBlacklist((prev) => prev.filter((entry) => entry.userEmail !== email));

      setCheckedItems((prev) => {
        const newChecked = { ...prev };
        delete newChecked[email];
        return newChecked;
      });
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  const handleRowClick = async (item) => {
    if (!item.blackListId) {
      alert("상세 정보 조회에 필요한 ID가 없습니다.");
      return;
    }

    setLoadingDetail(true);
    try {
      const response = await axiosInstance.get(`/shop/blacklists/${item.blackListId}`);
      setSelectedItem(response.data);
    } catch (error) {
      console.error("상세 데이터 불러오기 실패:", error);
      alert("상세 정보를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoadingDetail(false);
    }
  };

  return (
      <div className="max-w-7xl p-6 flex flex-col items-center">
        <div className="w-full max-w-[1000px] flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">블랙리스트</h1>

          <div className="flex items-center space-x-3">
            <div className="relative text-gray-400 focus-within:text-gray-600">
              <input
                  type="text"
                  placeholder="이름 검색"
                  className="w-64 border border-gray-300 rounded-md py-2 pl-10 pr-4 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-green-500" />
            </div>

            <button
                onClick={() => setShowCreateModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition"
            >
              블랙리스트 등록
            </button>

            <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition"
            >
              삭제
            </button>
          </div>
        </div>

        <div className="w-full max-w-[1000px] overflow-auto rounded-md border border-gray-200 shadow-sm">
          <table className="w-full table-auto border-collapse text-sm text-gray-700">
            <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-center w-12">
                <label className="inline-flex cursor-pointer select-none items-center">
                  <input
                      type="checkbox"
                      className="hidden peer"
                      onChange={toggleAllCheck}
                      checked={
                          blacklist.length > 0 &&
                          Object.keys(checkedItems).length === blacklist.length &&
                          Object.values(checkedItems).every(Boolean)
                      }
                      aria-label="전체 선택"
                  />
                  <span className="w-5 h-5 inline-block rounded border border-gray-400 peer-checked:bg-green-600 peer-checked:border-green-600 transition"></span>
                </label>
              </th>
              <th className="px-4 py-3 text-left font-medium">유저 이름</th>
              <th className="px-4 py-3 text-left font-medium">유저 이메일</th>
              <th className="px-4 py-3 text-left font-medium">사유</th>
            </tr>
            </thead>
            <tbody>
            {blacklist.length > 0 ? (
                blacklist.map((item) => (
                    <tr
                        key={item.userEmail}
                        className="hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleRowClick(item)}
                    >
                      <td className="px-4 py-3 text-center border-b border-gray-200">
                        <label
                            className="inline-flex cursor-pointer select-none items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                          <input
                              type="checkbox"
                              checked={checkedItems[item.userEmail] || false}
                              onChange={() => toggleCheck(item.userEmail)}
                              className="hidden peer"
                              aria-label={`${item.userName} 선택`}
                          />
                          <span className="w-5 h-5 inline-block rounded border border-gray-400 peer-checked:bg-green-600 peer-checked:border-green-600 transition"></span>
                        </label>
                      </td>
                      <td className="px-4 py-3 border-b border-gray-200">{item.userName}</td>
                      <td className="px-4 py-3 border-b border-gray-200">{item.userEmail}</td>
                      <td className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                        <span>{item.reason}</span>
                        <button
                            className="text-red-500 hover:text-red-700 ml-4"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSingleDelete(item.userEmail);
                            }}
                            aria-label="삭제"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                ))
            ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-10 text-center text-gray-400">
                    등록된 블랙리스트가 없습니다
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>

        <BlackListCreateModal
            showModal={showCreateModal}
            setShowModal={setShowCreateModal}
            setBlacklist={setBlacklist}
            reservations={reservations}
            blacklist={blacklist}
        />

        {selectedItem && (
            <BlackListDetailModal
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                loading={loadingDetail}
            />
        )}
      </div>
  );
}
