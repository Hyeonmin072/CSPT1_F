import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../../assets/logo/logo.png";
import h1 from "../../../assets/hairshop/h1.jpg";

import HairSearch from "../../hairshop/HairSearch.jsx";

const jobs = [
    {
        id: 1,
        postedTime: 10,
        title: "헤어샬롱",
        company: "ABC 디자이너 구해요~",
        type: "풀타임",
        salary: 300,
        location: "서울",
        image: h1,
    },
    {
        id: 2,
        postedTime: 60,
        title: "파트너쉽 엔터",
        company: "XYZ Design",
        type: "파트타임",
        salary: 250,
        location: "부산",
        image: h1,
    },
    {
        id: 3,
        postedTime: 10080,
        title: "UTF",
        company: "LMN Corp",
        type: "풀타임",
        salary: 350,
        location: "대구",
        image: h1,
    },
];

export default function GetJob() {
    const navigate = useNavigate();
    const [salary, setSalary] = useState(100); // 초기 슬라이더 값
    const [filteredJobs, setFilteredJobs] = useState(jobs); // 필터링된 구인 목록
    const [sortOrder, setSortOrder] = useState("최신순"); // 정렬 옵션 상태
    const [selectedPostedTime, setSelectedPostedTime] = useState("전체");

    // 급여 기준으로 필터링 함수
    const handleFilter = () => {
        const filtered = jobs.filter((job) => job.salary >= salary);
        setFilteredJobs(filtered);
    };

    // 구인 목록 정렬 함수
    const handleSortAndFilter = () => {
        // 확인용 console
        console.log(`정렬 기준: ${sortOrder}`);

        // 정렬 로직
        const sortedJobs = [...jobs].sort((a, b) => {
            if (sortOrder === "최신순") return a.postedTime - b.postedTime; // 최신순: postedTime 오름차순
            if (sortOrder === "이름순") return a.title.localeCompare(b.title, "ko"); // 이름순: 가나다순
            return 0;
        });

        // 확인용 console
        console.log("정렬된 목록:", sortedJobs);

        // 상태 업데이트
        setFilteredJobs(sortedJobs);
    };

    // 게시글 등록 시간 필터링 함수
    // 게시글 등록 시간 필터링 함수
    const handlePostedTimeFilter = () => {
        let filtered;
        if (selectedPostedTime === "전체") {
            filtered = jobs; // 전체
        } else if (selectedPostedTime === "1시간 전") {
            filtered = jobs.filter((job) => job.postedTime <= 60); 
        } else if (selectedPostedTime === "24시간 전") {
            filtered = jobs.filter((job) => job.postedTime <= 1440);
        } else if (selectedPostedTime === "일주일 전") {
            filtered = jobs.filter((job) => job.postedTime <= 10080);
        } else if (selectedPostedTime === "한달 전") {
            filtered = jobs.filter((job) => job.postedTime > 10080);
        }

        setFilteredJobs(filtered); // 필터링된 결과 업데이트
    };


    // 게시글 등록 시간 변경 시 필터링 로직 실행
    useEffect(() => {
        handlePostedTimeFilter();
    }, [selectedPostedTime]); // selectedPostedTime이 변경될 때 실행

    // 정렬 상태 변경 시 useEffect로 정렬 로직 실행
    useEffect(() => {
        handleSortAndFilter();
    }, [sortOrder]); // sortOrder가 변경될 때 실행

    // 날짜 단위 계산 함수
    const formatPostedTime = (time) => {
        if (time >= 60) {
            const days = Math.floor(time / 60 / 24); // 일 계산
            if (days >= 1) {
                return `${days}일 전`;
            } else {
                return `${Math.floor(time / 60)}시간 전`; // 시간 계산
            }
        }
        return `${time}분 전`;
    };

    return (
        <div className="p-10">
            {/* 상단 검색 창 */}
            <div className="flex justify-center w-full pt-4">
                <HairSearch />
            </div>

            {/* 정렬 옵션 */}
            <div className="flex justify-end max-w-7xl mt-4">
                <select
                    className="p-2 border rounded-lg w-[130px]"
                    value={sortOrder}
                    onChange={(e) => {
                        setSortOrder(e.target.value);
                        sortJobs(); // 정렬 함수 호출
                    }}
                >
                    <option value="최신순">최신순</option>
                    <option value="이름순">이름순</option>
                </select>
            </div>

            {/* 메인 컨테이너 (왼쪽 사이드바 + 구인 목록) */}
            <div className="flex max-w-7xl mx-auto bg-white rounded-lg mt-6">
                {/* 왼쪽 사이드바 */}
                <div className="w-1/5 p-6 border bg-gray-50 rounded-2xl max-h-[680px]">
                    <div className="mb-4">
                        <label className="block mb-2 font-bold">가게 이름</label>
                        <input
                            type="text"
                            placeholder="가게 이름 검색"
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-bold">지역</label>
                        <select className="w-full p-2 border rounded-lg">
                            <option>서울</option>
                            <option>부산</option>
                            <option>대구</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-bold">작업 시간대</label>
                        <select className="w-full p-2 border rounded-lg">
                            <option>주간</option>
                            <option>야간</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <h2 className="font-bold">게시글 등록 시간</h2>
                        <div className="mt-2 space-y-2">
                            {["전체", "1시간 전", "24시간 전", "일주일 전", "한달 전"].map((label) => (
                                <label key={label} className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="postedTime"
                                        className="rounded"
                                        value={label}
                                        checked={selectedPostedTime === label} // 현재 선택된 상태 유지
                                        onChange={(e) => setSelectedPostedTime(e.target.value)} // 상태 업데이트
                                    />
                                    <span>{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row mb-2 justify-between">
                            <h2 className="font-bold">급여</h2>
                            {/* 현재 슬라이더 값 표시 */}
                            <p className="text-center text-gray-700 px-2">: {salary} 만원</p>
                        </div>
                        <input
                            type="range"
                            min="100"
                            max="1000"
                            step="10"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            className="w-full"
                        />
                        <div className="flex flex-row text-sm mt-4 justify-between">
                            <span className="flex flex-col justify-center">월 100-1000만원</span>
                            <div className="flex justify-end">
                                <button
                                    className="px-5 py-2 bg-blue-500 text-white rounded-lg"
                                    onClick={handleFilter} // 필터링 함수 호출
                                >
                                    적용
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 구인 목록 */}
                <div className="w-3/4 p-4">
                    <div className="flex flex-col gap-4">
                        {filteredJobs.map((job, index) => (
                            <div
                                key={job.id}
                                className="rounded-lg shadow-md mb-2 flex flex-col justify-between"
                                style={{transitionDelay: `${index * 150}ms`}}
                            >
                                {/* 상단 정보 섹션 */}
                                <div>
                                    {/* Image */}
                                    <div
                                        className="h-[200px] w-full rounded-lg mb-4 overflow-hidden"
                                        onClick={() => navigate("/detail")}
                                    >
                                        <img
                                            src={job.image || logo}
                                            alt="Shop preview"
                                            className="w-full h-[200px] object-cover rounded-lg"
                                        />
                                    </div>
                                    <div className="px-4">
                                        <p className="text-xs text-gray-500 pb-2">
                                            {formatPostedTime(job.postedTime)}
                                        </p>
                                        <h3 className="text-lg font-bold">{job.title}</h3>
                                        <p className="text-sm text-gray-500 mb-2">{job.company}</p>
                                        <p className="text-sm text-gray-500 mb-2">
                                            {job.type} - {job.salary}만원
                                        </p>
                                        <p className="text-sm text-gray-500">{job.location}</p>
                                    </div>
                                </div>

                                {/* 하단 버튼 섹션 */}
                                <div className="flex justify-end mt-4 m-3">
                                    <button
                                        className="px-6 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                                        onClick={() => navigate("/detail")}
                                    >
                                        상세 보기
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
