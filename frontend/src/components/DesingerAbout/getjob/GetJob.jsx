import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../../assets/logo/logo.png";
import h1 from "../../../assets/hairshop/h1.jpg";

import HairSearch from "../../hairshop/HairSearch.jsx";
import LeftSideBar from "./LeftSideBar.jsx";
import JobList from "./JobList.jsx";
import SortOrder from "./SortOrder.jsx";

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
        postedTime: 120,
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
    {
        id: 4,
        postedTime: 5,
        title: "girl and boy",
        company: "LMN Corp",
        type: "풀타임",
        salary: 350,
        location: "대구",
        image: h1,
    },
];

export default function GetJob() {
    const navigate = useNavigate();
    const [selectedLocal, setSelectedLocal] = useState("전체");
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
            filtered = jobs.filter((job) => job.postedTime < 10080);
        }

        setFilteredJobs(filtered); // 필터링된 결과 업데이트
    };

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

    useEffect(() => {
        // 현재 시간 (로컬 컴퓨터의 시간)
        const currentTime = new Date().getTime();

        // 지역 필터링
        const filtered = jobs.filter(
            (job) => selectedLocal === "전체" || job.location === selectedLocal
        );
        console.log("필터링된 데이터:", filtered);
        setFilteredJobs(filtered);

        // 게시글 등록 시간 필터링
        handlePostedTimeFilter();
        formatPostedTime();

        // 구인 목록 정렬(맨 밑에 있어야 로딩후, 최신순 정렬이 제대로 작동)
        handleSortAndFilter();
    }, [selectedLocal, selectedPostedTime, sortOrder]);

    return (
        <div className="p-10">

            {/* 정렬 옵션 */}
            <div className="flex justify-end max-w-7xl px-10">
                <SortOrder
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                />
            </div>

            {/* 메인 컨테이너 (왼쪽 사이드바 + 구인 목록) */}
            <div className="flex max-w-7xl mx-auto bg-white rounded-lg mt-6">
                {/* 왼쪽 사이드바 */}
                <div className="w-1/5 p-6 border bg-gray-50 rounded-2xl max-h-[680px]">
                    <LeftSideBar
                        selectedLocal={selectedLocal}
                        setSelectedLocal={setSelectedLocal}
                        selectedPostedTime={selectedPostedTime}
                        setSelectedPostedTime={setSelectedPostedTime}
                        salary={salary}
                        setSalary={setSalary}
                        handleFilter={() => console.log("필터 적용")}
                    />

                </div>

                {/* 구인 목록 */}
                <div className="w-3/4 p-4">
                    <JobList
                        filteredJobs={filteredJobs}
                        formatPostedTime={formatPostedTime}
                        navigate={navigate} />

                </div>
            </div>
        </div>
    );
}
