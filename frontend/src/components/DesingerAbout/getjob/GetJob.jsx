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
    const [salary, setSalary] = useState(100);
    const [filteredJobs, setFilteredJobs] = useState(jobs);
    const [sortOrder, setSortOrder] = useState("최신순");
    const [selectedPostedTime, setSelectedPostedTime] = useState("전체");

    // 필터링 및 정렬 로직 통합
    const applyFiltersAndSorting = () => {
        let filtered = jobs;

        // 1. 지역 필터링
        if (selectedLocal !== "전체") {
            filtered = filtered.filter((job) => job.location === selectedLocal);
        }

        // 2. 급여 필터링
        filtered = filtered.filter((job) => job.salary >= salary);

        // 3. 게시글 등록 시간 필터링
        if (selectedPostedTime !== "전체") {
            const timeThreshold = {
                "1시간 전": 60,
                "24시간 전": 1440,
                "일주일 전": 10080,
                "한달 전": 10080
            };
            filtered = filtered.filter(
                (job) => job.postedTime <= timeThreshold[selectedPostedTime]
            );
        }

        // 4. 정렬 로직
        filtered.sort((a, b) => {
            if (sortOrder === "최신순") return a.postedTime - b.postedTime;
            if (sortOrder === "이름순") return a.title.localeCompare(b.title, "ko");
            return 0;
        });

        setFilteredJobs(filtered);
    };

    // 필터와 정렬 상태가 변경될 때마다 실행
    useEffect(() => {
        applyFiltersAndSorting();
    }, [selectedLocal, salary, selectedPostedTime, sortOrder]);

    // 날짜 단위 포맷 함수
    const formatPostedTime = (time) => {
        if (time >= 1440) {
            const days = Math.floor(time / 60 / 24);
            return `${days}일 전`;
        } else if (time >= 60) {
            return `${Math.floor(time / 60)}시간 전`;
        }
        return `${time}분 전`;
    };

    return (
        <div className="p-10">
            {/* 정렬 옵션 */}
            <div className="flex justify-end max-w-7xl px-10">
                <SortOrder sortOrder={sortOrder} setSortOrder={setSortOrder} />
            </div>

            {/* 메인 컨테이너 (왼쪽 사이드바 + 구인 목록) */}
            <div className="flex max-w-7xl mx-auto bg-white rounded-lg mt-6">
                {/* 왼쪽 사이드바 */}
                <div className="w-1/5 p-6 border bg-gray-50 rounded-2xl max-h-[640px]">
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
