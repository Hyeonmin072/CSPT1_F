import { useState, useEffect, useRef } from "react";
import d1 from "../../../assets/designer/d1.png";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import axiosInstance from "../../../components/sign/axios/AxiosInstance";
import Swal from "sweetalert2";

export default function DesignerSetting() {
  const [selectedDesigner, setSelectedDesigner] = useState(null); // 모달창 표시 여부
  const [clickCount, setClickCount] = useState({}); // 클릭 횟수 관리
  const [designers, setDesigners] = useState([]); // 디자이너 목록
  const [selectedIds, setSelectedIds] = useState([]); // 체크된 디자이너 ID 관리
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [filteredDesigners, setFilteredDesigners] = useState([]); // 검색된 디자이너 목록
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 표시 중인 디자이너 인덱스
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); // 검색 모달 열림/닫힘 상태
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // 확인 모달 열림/닫힘 상태
  const [registeredDesigners, setRegisteredDesigners] = useState([]); // 등록된 디자이너 목록
  const [editModalOpen, setEditModalOpen] = useState(false); // 수정 모달 열림/닫힘 상태
  const [error, setError] = useState(""); // 에러 메시지
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  const [newdesigner, setNewDesigner] = useState({
    d_id: "",
    d_name: "",
    position: "",
    startTime: "",
    endTime: "",
    d_image: "",
  });

  // 디자이너 목록 불러오기
  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        console.log("디자이너 목록 불러오기 시작");
        const response = await axiosInstance.get("/shop/designers", {
          withCredentials: true,
        });
        console.log("디자이너 목록 불러오기 성공:", response.data);
        setDesigners(response.data);
      } catch (err) {
        console.error(
          "디자이너 목록 불러오기 실패:",
          err.response?.data || err.message
        );
        setError("디자이너 목록을 불러오는데 실패했습니다.");
      }
    };

    fetchDesigners();
  }, []);

  // 디자이너 검색
  const searchDesigner = async () => {
    if (!searchQuery.trim()) {
      setFilteredDesigners([]);
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(searchQuery.trim())) {
      setFilteredDesigners([]);
      return;
    }

    setIsLoading(true);
    try {
      console.log("디자이너 검색 시작:", searchQuery);
      const response = await axiosInstance.post("/shop/designer/search", {
        designerEmail: searchQuery,
      });
      console.log("서버 응답 전체:", response);
      console.log("응답 데이터:", response.data);

      // 배열이 아닌 경우 배열로 변환
      const designerData = Array.isArray(response.data)
        ? response.data
        : [response.data];

      setFilteredDesigners(designerData);
      setCurrentIndex(0);
    } catch (err) {
      console.error("디자이너 검색 실패:", err.response?.data || err.message);
      setFilteredDesigners([]);
      setError("디자이너 검색에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 디바운스 적용
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        searchDesigner();
      } else {
        setFilteredDesigners([]);
      }
    }, 500); // 0.5초 디바운스

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // 디자이너 등록
  const handleRegisterDesigner = async () => {
    const selectedDesigner = filteredDesigners[currentIndex];

    if (!selectedDesigner) {
      setError("등록할 디자이너를 선택해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      console.log("디자이너 등록 시작:", selectedDesigner);
      const response = await axiosInstance.post("/shop/designer", {
        designerEmail: selectedDesigner.email,
      });
      console.log("디자이너 등록 성공:", response.data);

      // 모달 닫기 및 검색 상태 초기화
      setIsSearchModalOpen(false);
      setFilteredDesigners([]);
      setSearchQuery("");

      // 성공 메시지 표시
      Swal.fire({
        icon: "success",
        title: "등록 완료",
        text: "디자이너가 성공적으로 등록되었습니다.",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        // 성공 메시지 닫힌 후 페이지 새로고침
        window.location.reload();
      });
    } catch (err) {
      console.error("디자이너 등록 실패:", err.response?.data || err.message);
      Swal.fire({
        icon: "error",
        title: "등록 실패",
        text:
          "디자이너 등록에 실패했습니다: " +
          (err.response?.data?.message || err.message),
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSelection = (id) => {
    setSelectedIds(
      (prevSelectedIds) =>
        prevSelectedIds.includes(id)
          ? prevSelectedIds.filter((item) => item !== id) // 이미 선택된 경우 제거
          : [...prevSelectedIds, id] // 선택되지 않은 경우 추가
    );
  };

  const deletedDesigners = useRef([]); // 삭제된 디자이너 목록

  const deleteSelected = async () => {
    if (selectedIds.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "선택된 디자이너 없음",
        text: "삭제할 디자이너를 선택해주세요.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    // 삭제 확인
    const result = await Swal.fire({
      icon: "warning",
      title: "디자이너 삭제",
      text: `선택한 ${selectedIds.length}명의 디자이너를 정말 삭제하시겠습니까?`,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    });

    if (!result.isConfirmed) {
      return;
    }

    setIsLoading(true);
    try {
      console.log("선택된 디자이너 삭제 시작:", selectedIds);

      // 선택된 각 디자이너에 대해 삭제 요청
      for (const email of selectedIds) {
        console.log(`디자이너 삭제 요청: ${email}`);
        const response = await axiosInstance.delete("/shop/designer", {
          data: { designerEmail: email },
        });
        console.log(`디자이너 삭제 응답:`, response.data);
      }

      // 디자이너 목록 새로고침
      const response = await axiosInstance.get("/shop/designers");
      setDesigners(response.data);

      // 삭제된 디자이너를 저장
      const removed = designers.filter((designer) =>
        selectedIds.includes(designer.email)
      );
      deletedDesigners.current = [...deletedDesigners.current, ...removed];

      setSelectedIds([]); // 선택 초기화

      // 성공 메시지
      Swal.fire({
        icon: "success",
        title: "삭제 완료",
        text: "선택한 디자이너가 성공적으로 삭제되었습니다.",
        confirmButtonColor: "#3085d6",
      });
    } catch (err) {
      console.error("디자이너 삭제 실패:", err.response?.data || err.message);
      Swal.fire({
        icon: "error",
        title: "삭제 실패",
        text:
          "디자이너 삭제에 실패했습니다: " +
          (err.response?.data?.message || err.message),
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clickCountRef = useRef({}); // 클릭 카운트를 저장

  // 더블 클릭시, 상세보기 열리기 카운트
  const handleDivClick = (designer) => {
    // 클릭 횟수 계산
    const newCount = (clickCountRef.current[designer.email] || 0) + 1;

    // 10초 후 클릭 카운트 초기화
    setTimeout(() => {
      clickCountRef.current[designer.email] = 0; // ref에서 직접 초기화
    }, 3000);

    // 클릭 횟수를 ref에 업데이트
    clickCountRef.current[designer.email] = newCount;

    // 클릭이 두 번 되었을 때 모달 열기
    if (newCount === 2) {
      setSelectedDesigner(designer);
    }

    // 상태 업데이트 (화면 갱신용, 로직에는 영향을 주지 않음)
    setClickCount((prevClickCount) => ({
      ...prevClickCount,
      [designer.email]: newCount,
    }));
  };

  // 상세보기 모달창 닫기
  const detailcloseModal = () => {
    console.log("모달창 닫힘"); // 모달 창 닫힘 확인용 로그
    setClickCount({}); // 클릭 횟수 초기화
    setSelectedDesigner(null); // 모달창 닫기
  };

  // 이전 디자이너로 이동
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredDesigners.length - 1 : prevIndex - 1
    );
  };

  // 다음 디자이너로 이동
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === filteredDesigners.length - 1 ? 0 : prevIndex + 1
    );
  };

  // 역할 변경
  const handleUpdatePosition = async (newPosition) => {
    if (!selectedDesigner) return;

    setIsLoading(true);
    try {
      console.log(
        "디자이너 직함 변경 시작:",
        selectedDesigner.email,
        newPosition
      );
      const response = await axiosInstance.patch(
        `/shop/designer/${selectedDesigner.email}`,
        {
          position: newPosition,
        }

      );
      console.log("디자이너 직함 변경 성공:", response.data);

      // 디자이너 목록 새로고침
      const updatedDesignersResponse = await axiosInstance.get(
        "/shop/designers"
      );
      setDesigners(updatedDesignersResponse.data);

      // 선택된 디자이너 정보 업데이트
      setSelectedDesigner((prev) => ({
        ...prev,
        position: newPosition,
      }));

      alert("디자이너 직함이 성공적으로 변경되었습니다.");
    } catch (err) {
      console.error(
        "디자이너 직함 변경 실패:",
        err.response?.data || err.message
      );
      setError(
        "디자이너 직함 변경에 실패했습니다: " +
          (err.response?.data?.message || err.message)
      );
      alert(
        "디자이너 직함 변경에 실패했습니다: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 시간 변경(start)
  const handleUpdateStartTime = async (newStartTime) => {
    if (!selectedDesigner) return;

    setIsLoading(true);
    try {
      console.log(
        "디자이너 출근 시간 변경 시작:",
        selectedDesigner.email,
        newStartTime
      );
      const response = await axiosInstance.patch(
        `/shop/designer/${selectedDesigner.email}`,
        {
          startTime: newStartTime,
        }
      );
      console.log("디자이너 출근 시간 변경 성공:", response.data);

      // 디자이너 목록 새로고침
      const updatedDesignersResponse = await axiosInstance.get(
        "/shop/designers"
      );
      setDesigners(updatedDesignersResponse.data);

      // 선택된 디자이너 정보 업데이트
      setSelectedDesigner((prev) => ({
        ...prev,
        startTime: newStartTime,
      }));

      alert("디자이너 출근 시간이 성공적으로 변경되었습니다.");
    } catch (err) {
      console.error(
        "디자이너 출근 시간 변경 실패:",
        err.response?.data || err.message
      );
      setError(
        "디자이너 출근 시간 변경에 실패했습니다: " +
          (err.response?.data?.message || err.message)
      );
      alert(
        "디자이너 출근 시간 변경에 실패했습니다: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 시간 변경(end)
  const handleUpdateEndTime = async (newEndTime) => {
    if (!selectedDesigner) return;

    setIsLoading(true);
    try {
      console.log(
        "디자이너 퇴근 시간 변경 시작:",
        selectedDesigner.email,
        newEndTime
      );
      const response = await axiosInstance.patch(
        `/shop/designer/${selectedDesigner.email}`,
        {
          endTime: newEndTime,
        }
      );
      console.log("디자이너 퇴근 시간 변경 성공:", response.data);

      // 디자이너 목록 새로고침
      const updatedDesignersResponse = await axiosInstance.get(
        "/shop/designers"
      );
      setDesigners(updatedDesignersResponse.data);

      // 선택된 디자이너 정보 업데이트
      setSelectedDesigner((prev) => ({
        ...prev,
        endTime: newEndTime,
      }));

      alert("디자이너 퇴근 시간이 성공적으로 변경되었습니다.");
    } catch (err) {
      console.error(
        "디자이너 퇴근 시간 변경 실패:",
        err.response?.data || err.message
      );
      setError(
        "디자이너 퇴근 시간 변경에 실패했습니다: " +
          (err.response?.data?.message || err.message)
      );
      alert(
        "디자이너 퇴근 시간 변경에 실패했습니다: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 mx-auto max-w-7xl">
      <div className="w-full flex flex-col justify-between mb-4">
        <h1 className="font-bold text-2xl">디자이너 관리</h1>

        {/* 디자이너 목록 리스트 */}
        <div className="p-10 flex flex-row space-x-4 flex-nowrap overflow-x-auto">
          {designers.length > 0 ? (
            designers.map((designer) => (
              <button
                key={designer.email}
                className={`relative border rounded h-[300px] ${
                  (clickCount[designer.email] || 0) > 1
                    ? "shadow-inner"
                    : "shadow-md"
                } p-4 flex-none w-[200px] justify-center cursor-pointer hover:bg-gray-100`}
                onClick={() => handleDivClick(designer)}
              >
                <div className="absolute top-2 left-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(designer.email)}
                    onChange={() => toggleSelection(designer.email)}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src={designer.image || d1}
                    alt={`${designer.name} 프로필`}
                    className="rounded-full w-[100px] h-[100px] mb-4"
                  />
                  <div className="text-center space-y-1">
                    <span className="block font-bold">{designer.name}</span>
                    <span className="block text-gray-600">
                      {designer.position || "직책 미지정"}
                    </span>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <span className="bg-blue-100 px-2 py-1 rounded">
                        {designer.gender === "MALE" ? "남성" : "여성"}
                      </span>
                      <span className="bg-pink-100 px-2 py-1 rounded flex items-center">
                        <span>❤️ {designer.like || 0}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500 w-full">
              현재 등록된 디자이너가 없습니다.
            </div>
          )}
        </div>

        {/* 버튼 영역 */}
        <div className="flex flex-row space-x-3 justify-end mt-10">
          <button
            className="border px-5 py-3 rounded-lg bg-green-500 text-white hover:bg-green-700"
            onClick={() => setIsSearchModalOpen(true)}
          >
            새 디자이너 등록
          </button>
          <button
            className="border px-5 py-3 rounded-lg bg-red-500 text-white hover:bg-red-700"
            onClick={deleteSelected}
            disabled={isLoading}
          >
            {isLoading ? "처리 중..." : "삭제하기"}
          </button>
        </div>
      </div>

      {/* 새 디자이너 등록 모달 */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-xl w-[500px] flex flex-col relative shadow-2xl transform transition-all">
            {/* 오른쪽 상단 X 버튼 */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              onClick={() => {
                setIsSearchModalOpen(false); // 모달 닫기
                setFilteredDesigners([]); // 검색 결과 초기화
                setSearchQuery(""); // 검색어 초기화
              }}
            >
              <X size={24} />
            </button>

            {/* 디자이너 ID 검색창 */}
            <h2 className="font-bold text-2xl mb-6 text-gray-800">
              디자이너 추가
            </h2>
            <div className="relative mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="디자이너 아이디(이메일) 검색"
                className="border-2 border-gray-300 p-3 rounded-lg w-full focus:border-blue-500 focus:outline-none transition-colors"
              />
              <button
                onClick={searchDesigner}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-white px-4 py-1.5 rounded-md hover:bg-green-600 transition-colors"
              >
                검색
              </button>
            </div>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                <p className="text-gray-600">검색 중...</p>
              </div>
            ) : filteredDesigners.length > 0 ? (
              <div className="flex flex-col items-center mt-4 border border-gray-200 p-6 rounded-lg bg-gray-50 relative">
                <div className="flex flex-col items-center cursor-pointer hover:bg-gray-100 p-4 rounded-lg transition-colors w-full">
                  <img
                    src={filteredDesigners[currentIndex].image || d1}
                    alt={`${filteredDesigners[currentIndex].name} 프로필`}
                    className="rounded-full w-[120px] h-[120px] mb-4 object-cover border-4 border-white shadow-md"
                  />
                  <p className="text-xl font-bold text-gray-800">
                    {filteredDesigners[currentIndex].name}
                  </p>
                  <p className="text-gray-600">
                    {filteredDesigners[currentIndex].email}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {filteredDesigners[currentIndex].tel}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {filteredDesigners[currentIndex].gender === "MALE"
                      ? "남성"
                      : "여성"}
                  </p>
                  <div className="mt-2 w-full">
                    <div
                      className={`p-2 rounded-md ${
                        filteredDesigners[currentIndex].workTime
                          ? "bg-green-100"
                          : "bg-gray-200"
                      }`}
                    >
                      <p className="text-sm font-medium">
                        근무 시간:{" "}
                        {filteredDesigners[currentIndex].workTime || "미설정"}
                      </p>
                    </div>
                    <div
                      className={`p-2 rounded-md mt-1 ${
                        filteredDesigners[currentIndex].leaveTime
                          ? "bg-green-100"
                          : "bg-gray-200"
                      }`}
                    >
                      <p className="text-sm font-medium">
                        퇴근 시간:{" "}
                        {filteredDesigners[currentIndex].leaveTime || "미설정"}
                      </p>
                    </div>
                    <div
                      className={`p-2 rounded-md mt-1 ${
                        filteredDesigners[currentIndex].regularHoliday
                          ? "bg-green-100"
                          : "bg-gray-200"
                      }`}
                    >
                      <p className="text-sm font-medium">
                        휴무일:{" "}
                        {filteredDesigners[currentIndex].regularHoliday ||
                          "휴무일 없음"}
                      </p>
                    </div>
                  </div>
                </div>
                {/* 화살표 버튼 제거 */}

                <div className="flex space-x-4 w-full mt-6">
                  <button
                    className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
                    onClick={() => {
                      // 확인 알림창 표시
                      Swal.fire({
                        icon: "question",
                        title: "디자이너 등록",
                        text: "이 디자이너가 맞습니까?",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "예",
                        cancelButtonText: "아니오",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleRegisterDesigner();
                        }
                      });
                    }}
                  >
                    확인
                  </button>
                  <button
                    className="flex-1 border-2 border-gray-300 px-6 py-3 rounded-lg bg-white text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                    onClick={() => {
                      setIsSearchModalOpen(false); // 모달 닫기
                      setFilteredDesigners([]); // 검색 결과 초기화
                      setSearchQuery(""); // 검색어 초기화
                    }}
                  >
                    취소
                  </button>
                </div>
              </div>
            ) : searchQuery.trim() ? (
              <div className="text-center py-8">
                <p className="text-gray-500">검색된 디자이너가 없습니다.</p>
                <p className="text-sm text-gray-400 mt-2">
                  다른 검색어를 입력해보세요.
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  디자이너 ID 또는 이름을 입력해주세요.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 확인 모달 */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-xl w-[450px] flex flex-col items-center relative shadow-2xl transform transition-all">
            {/* 오른쪽 상단 X 버튼 */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              onClick={() => setIsConfirmModalOpen(false)} // 확인 모달 닫기
            >
              <X size={24} />
            </button>
            <h2 className="font-bold text-2xl mb-6 text-gray-800">
              디자이너 등록 확인
            </h2>
            {filteredDesigners[currentIndex] && (
              <div className="flex flex-col items-center border border-gray-200 p-6 rounded-lg bg-gray-50 w-full mb-6">
                <img
                  src={filteredDesigners[currentIndex].image || d1}
                  alt={`${filteredDesigners[currentIndex].name} 프로필`}
                  className="rounded-full w-[120px] h-[120px] mb-4 object-cover border-4 border-white shadow-md"
                />
                <p className="text-xl font-bold text-gray-800">
                  {filteredDesigners[currentIndex].name}
                </p>
                <p className="text-gray-600">
                  {filteredDesigners[currentIndex].email}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {filteredDesigners[currentIndex].tel}
                </p>
                <p className="text-gray-500 text-sm">
                  {filteredDesigners[currentIndex].gender === "MALE"
                    ? "남성"
                    : "여성"}
                </p>
              </div>
            )}
            <div className="flex space-x-4 w-full">
              <button
                className="flex-1 border-2 border-green-500 px-6 py-3 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors font-medium"
                onClick={handleRegisterDesigner} // 디자이너 등록
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <div className="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    처리 중...
                  </span>
                ) : (
                  "등록하기"
                )}
              </button>
              <button
                className="flex-1 border-2 border-gray-300 px-6 py-3 rounded-lg bg-white text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                onClick={() => setIsConfirmModalOpen(false)} // 확인 모달 닫기
                disabled={isLoading}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 디자이너 상세보기 모달 */}
      {selectedDesigner && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-[500px] h-[300px] flex flex-col relative">
            <h2 className="font-bold text-xl mb-4">디자이너 정보 상세보기</h2>
            <div className="flex flex-row justify-between mb-3">
              <p>이름: {selectedDesigner.name}</p>
              <p>직함: {selectedDesigner.position}</p>
            </div>
            <div className="flex flex-row justify-between space-x-4 mt-4">
              <div>
                <p>정시 출/퇴근 시간 </p>
                <p>
                  {selectedDesigner.startTime || "미설정"} -{" "}
                  {selectedDesigner.endTime || "미설정"}
                </p>
              </div>
              <div className="flex flex-row space-x-3">
                <button className="mt-4 border px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
                  매출 확인
                </button>
                <button className="mt-4 border px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
                  근태 확인
                </button>
              </div>
            </div>
            {/* 버튼 섹션을 맨 아래로 고정 */}
            <div className="flex justify-center space-x-4 absolute bottom-0 w-full p-4">
              <button
                className="border px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-700"
                onClick={() => {
                  setEditModalOpen(true); // 확인 모달 열기
                }}
              >
                수정
              </button>
              <button
                className="border px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-700"
                onClick={detailcloseModal}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-[400px] h-[400px] flex flex-col relative">
            {/* 오른쪽 상단 X 버튼 */}
            <button
              className="absolute top-4 right-4"
              onClick={() => {
                setEditModalOpen(false);
              }}
            >
              <X size={20} className="text-gray-500 hover:text-red-500" />
            </button>
            <div className="p-2">
              <h2 className="font-bold text-xl mb-4">디자이너 정보 수정</h2>
              <div className="flex flex-row justify-between mb-3">
                <p>이름: {selectedDesigner.name}</p>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col">
                  <label className="mb-3">직함</label>
                  <select
                    value={selectedDesigner.position || ""}
                    onChange={(e) => {
                      // position을 업데이트하는 함수 호출
                      handleUpdatePosition(e.target.value);
                    }}
                    className="border p-2 rounded"
                    disabled={isLoading}
                  >
                    <option value="원장">원장</option>
                    <option value="실장">실장</option>
                    <option value="수석 디자이너">수석 디자이너</option>
                    <option value="일반 디자이너">일반 디자이너</option>
                  </select>
                </div>
                <div>
                  <label>정시 출퇴근 시간</label>
                  <div className="flex items-center mt-3 space-x-2 w-full">
                    <input
                      type="time"
                      value={selectedDesigner.startTime || ""}
                      onChange={(e) => {
                        // startTime을 업데이트하는 함수 호출
                        handleUpdateStartTime(e.target.value);
                      }}
                      className="border p-2 rounded"
                      disabled={isLoading}
                    />
                    <span>-</span>
                    <input
                      type="time"
                      value={selectedDesigner.endTime || ""}
                      onChange={(e) => {
                        // endTime을 업데이트하는 함수 호출
                        handleUpdateEndTime(e.target.value);
                      }}
                      className="border p-2 rounded"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 absolute bottom-0 w-[370px] p-4">
                <button
                  className="border px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-700"
                  onClick={() => {
                    setEditModalOpen(false); // 수정 완료
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "처리 중..." : "수정"}
                </button>
                <button
                  className="border px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-700"
                  onClick={() => {
                    setEditModalOpen(false);
                  }}
                  disabled={isLoading}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
