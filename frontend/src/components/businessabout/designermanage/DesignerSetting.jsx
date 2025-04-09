import { useState, useEffect,useRef } from "react";
import d1 from "../../../assets/designer/d1.png";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export const dbDesigners = [
    { d_id: "001", d_name: "홍길동", position: "원장", d_image: d1 },
    { d_id: "002", d_name: "김철수", position: "실장", d_image: d1 },
    { d_id: "003", d_name: "이영희", position: "수석 디자이너", d_image: d1 },
    { d_id: "004", d_name: "박지수", position: "디자이너", d_image: d1 },
    { d_id: "005", d_name: "최민수", position: "인턴 디자이너", d_image: d1 },
    { d_id: "006", d_name: "정하늘", position: "주니어 디자이너", d_image: d1 },
    { d_id: "007", d_name: "이강호", position: "프리랜서 디자이너", d_image: d1 },
];


export default function DesignerSetting() {
    const [selectedDesigner, setSelectedDesigner] = useState(null); // 모달창 표시 여부
    const [clickCount, setClickCount] = useState({}); // 클릭 횟수 관리
    const [designers, setDesigners] = useState([
        { d_id: "001", d_name: "홍길동", position: "원장", d_image: d1 },
        { d_id: "002", d_name: "김철수", position: "실장", d_image: d1 },
        { d_id: "003", d_name: "이영희", position: "수석 디자이너", d_image: d1 },
    ]); // 더미 데이터
    const [selectedIds, setSelectedIds] = useState([]); // 체크된 디자이너 ID 관리
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
    const [filteredDesigners, setFilteredDesigners] = useState([]); // 검색된 디자이너 목록
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 표시 중인 디자이너 인덱스
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); // 검색 모달 열림/닫힘 상태
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // 확인 모달 열림/닫힘 상태
    const [registeredDesigners, setRegisteredDesigners] = useState([]); // 등록된 디자이너 목록

    const [newdesigner, setNewDesigner] = useState({
        d_id: "",
        d_name: "",
        position: "",
        startTime: "",
        endTime: "",
        d_image: "",
    });

    // uuid 입력과 동시에 디자이너 검색
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredDesigners([]);
            setCurrentIndex(0);
            return;
        }

        // 등록되지 않은 디자이너와 삭제된 디자이너를 포함하는 필터링
        const results = dbDesigners.filter(
            (designer) =>
                (designer.d_id?.includes(searchQuery) || designer.d_name?.includes(searchQuery)) &&
                (!designers.some((registered) => registered.d_id === designer.d_id) || // 등록되지 않은 디자이너
                    deletedDesigners.current.some((deleted) => deleted.d_id === designer.d_id)) // 삭제된 디자이너 포함
        );

        setFilteredDesigners(results); // 필터링된 결과 업데이트
        setCurrentIndex(0);
    }, [searchQuery, designers]);



    const handleRegisterDesigner = () => {
        const selectedDesigner = filteredDesigners[currentIndex];

        // 이미 등록된 디자이너인지 확인
        if (designers.some((designer) => designer.d_id === selectedDesigner.d_id)) {
            alert("이미 가게에 등록되어있는 디자이너입니다."); // 경고 메시지 표시
            return;
        }

        // 새 디자이너 등록
        const newDesigner = {
            ...selectedDesigner,
            position: "일반 디자이너", // 기본 직책 설정
        };
        setDesigners((prev) => [...prev, newDesigner]); // 디자이너 목록 업데이트
        setRegisteredDesigners((prev) => [...prev, selectedDesigner]); // 등록된 디자이너 업데이트

        // 모달 닫기 및 검색 상태 초기화
        setIsConfirmModalOpen(false);
        setFilteredDesigners([]);
        setSearchQuery("");
    };



    const toggleSelection = (id) => {
        setSelectedIds((prevSelectedIds) =>
            prevSelectedIds.includes(id)
                ? prevSelectedIds.filter((item) => item !== id) // 이미 선택된 경우 제거
                : [...prevSelectedIds, id] // 선택되지 않은 경우 추가
        );
    };

    const deletedDesigners = useRef([]); // 삭제된 디자이너 목록

    const deleteSelected = () => {
        setDesigners((prevDesigners) => {
            const remainingDesigners = prevDesigners.filter(
                (designer) => !selectedIds.includes(designer.d_id)
            );

            // 삭제된 디자이너를 저장
            const removed = prevDesigners.filter((designer) =>
                selectedIds.includes(designer.d_id)
            );
            deletedDesigners.current = [...deletedDesigners.current, ...removed];

            return remainingDesigners;
        });

        setSelectedIds([]); // 선택 초기화
    };


    const clickCountRef = useRef({}); // 클릭 카운트를 저장할 ref

    const handleDivClick = (designer) => {
        // 클릭 횟수 계산
        const newCount = (clickCountRef.current[designer.d_id] || 0) + 1;

        // 10초 후 클릭 카운트 초기화
        setTimeout(() => {
            clickCountRef.current[designer.d_id] = 0; // ref에서 직접 초기화
        }, 3000);

        // 클릭 횟수를 ref에 업데이트
        clickCountRef.current[designer.d_id] = newCount;

        // 클릭이 두 번 되었을 때 모달 열기
        if (newCount === 2) {
            setSelectedDesigner(designer);
        }

        // 상태 업데이트 (화면 갱신용, 로직에는 영향을 주지 않음)
        setClickCount((prevClickCount) => ({
            ...prevClickCount,
            [designer.d_id]: newCount,
        }));
    };



    const closeModal = () => {
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

    return (
        <div className="p-8 mx-auto max-w-7xl">
            <div className="w-full flex flex-col justify-between mb-4">
                <h1 className="font-bold text-2xl">디자이너 관리</h1>

                {/* 디자이너 목록 리스트 */}
                <div className=" p-10 flex flex-row space-x-4 flex-nowrap overflow-x-auto">
                    {designers.map((designer) => (
                        <button
                            key={designer.d_id}
                            className={`relative border rounded h-[300px] ${
                                (clickCount[designer.id] || 0) > 1 ? "shadow-inner" : "shadow-md"
                            } p-4 flex-none w-[200px] justify-center cursor-pointer hover:bg-gray-100`}
                            onClick={() => handleDivClick(designer)}
                        >
                            <div className="absolute top-2 left-2">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(designer.d_id)}
                                    onChange={() => toggleSelection(designer.d_id)}
                                />
                            </div>
                            <div className="flex flex-col items-center">
                                <img
                                    src={designer.d_image}
                                    alt={`${designer.name} 프로필`}
                                    className="rounded-full w-[100px] h-[100px] mb-4"
                                />
                                <div className="text-center">
                                    <span className="block font-bold">{designer.d_name}</span>
                                    <span className="block text-gray-600">{designer.position}</span>
                                </div>
                            </div>
                        </button>
                    ))}
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
                    >
                        삭제하기
                    </button>
                </div>
            </div>


            {/* 새 디자이너 등록 모달 */}
            {isSearchModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-[400px] flex flex-col relative">
                        {/* 오른쪽 상단 X 버튼 */}
                        <button
                            className="absolute top-2 right-2"
                            onClick={() => {
                                setIsSearchModalOpen(false); // 모달 닫기
                                setFilteredDesigners([]); // 검색 결과 초기화
                                setSearchQuery(""); // 검색어 초기화
                            }}
                        >
                            <X size={20} className="text-gray-500 hover:text-red-500"/>
                        </button>

                        <h2 className="font-bold text-xl mb-4">디자이너 추가</h2>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="디자이너 ID 또는 이름 검색"
                            className="border p-2 rounded mb-4 w-full"
                        />
                        {filteredDesigners.length > 0 ? (
                            <div className="flex flex-col items-center mt-4 border p-4 rounded relative">
                                <div
                                    className="flex flex-col items-center"
                                    onClick={() => {
                                        setIsConfirmModalOpen(true); // 확인 모달 열기
                                    }}
                                >
                                    <img
                                        src={filteredDesigners[currentIndex].d_image}
                                        alt={`${filteredDesigners[currentIndex].name} 프로필`}
                                        className="rounded-full w-[100px] h-[100px] mb-4"
                                    />
                                    <p>{filteredDesigners[currentIndex].d_name}</p>
                                    <p>{filteredDesigners[currentIndex].d_id}</p>
                                </div>
                                {/* Chevron Left/Right 버튼 */}
                                <div className="absolute inset-y-0 left-2 flex items-center">
                                    <button onClick={handlePrevious}>
                                        <ChevronLeft size={24} className="text-gray-500 hover:text-gray-700"/>
                                    </button>
                                </div>
                                <div className="absolute inset-y-0 right-2 flex items-center">
                                    <button onClick={handleNext}>
                                        <ChevronRight size={24} className="text-gray-500 hover:text-gray-700"/>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500 mt-4">검색된 디자이너가 없습니다.</p>
                        )}
                    </div>
                </div>
            )}


            {/* 확인 모달 */}
            {isConfirmModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-[400px] flex flex-col items-center relative">
                        {/* 오른쪽 상단 X 버튼 */}
                        <button
                            className="absolute top-2 right-2"
                            onClick={() => setIsConfirmModalOpen(false)} // 확인 모달 닫기
                        >
                            <X size={20} className="text-gray-500 hover:text-red-500"/>
                        </button>
                        <h2 className="font-bold text-xl mb-4">이 디자이너를 등록하시겠습니까?</h2>
                        {filteredDesigners[currentIndex] && (
                            <div className="flex flex-col items-center border p-4 rounded">
                                <img
                                    src={filteredDesigners[currentIndex].d_image}
                                    alt={`${filteredDesigners[currentIndex].name} 프로필`}
                                    className="rounded-full w-[100px] h-[100px] mb-4"
                                />
                                <p>{filteredDesigners[currentIndex].d_name}</p>
                                <p>{filteredDesigners[currentIndex].d_id}</p>
                            </div>
                        )}
                        <div className="flex space-x-4 mt-4">
                            <button
                                className="border px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-700"
                                onClick={handleRegisterDesigner} // 디자이너 등록
                            >
                                등록
                            </button>
                            <button
                                className="border px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-700"
                                onClick={() => setIsConfirmModalOpen(false)} // 확인 모달 닫기
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
                            <p>이름: {selectedDesigner.d_name}</p>
                            <p>직함: {selectedDesigner.position}</p>
                        </div>
                        <div className="flex flex-row justify-between space-x-4 mt-4">
                            <div>
                                <p>정시 출/퇴근 시간 </p>
                                <p>{selectedDesigner.startTime} - {selectedDesigner.endTime}</p>
                            </div>
                            <div className="flex flex-row space-x-3">
                                <button
                                    className="mt-4 border px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
                                    매출 확인
                                </button>
                                <button
                                    className="mt-4 border px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
                                    근태 확인
                                </button>
                            </div>
                        </div>
                        {/* 버튼 섹션을 맨 아래로 고정 */}
                        <div className="flex justify-center space-x-4 absolute bottom-0 w-full p-4">
                            <button
                                className="border px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-700"
                                onClick={() => alert("수정 기능 미구현")}
                            >
                                수정
                            </button>
                            <button
                                className="border px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-700"
                                onClick={closeModal}
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
