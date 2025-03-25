import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import h1 from "../../../assets/hairshop/h1.jpg";

import LeftSideBar from "./LeftSideBar.jsx";
import JobList from "./JobList.jsx";

export default function GetJob() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]); // 작업 데이터 상태
    const [filteredJobs, setFilteredJobs] = useState([]); // 필터된 작업 데이터
    const [sortOrder, setSortOrder] = useState("최신순");
    const [selectedLocal, setSelectedLocal] = useState("전체");
    const [salary, setSalary] = useState(100);
    const [selectedPostedTime, setSelectedPostedTime] = useState("전체");
    const [loading, setLoading] = useState(true); // 로딩 상태

    // 더미 데이터
    const dummyJobs = [
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

    // 백엔드 데이터 가져오기
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                // 실제 API 호출 시 아래 코드 활성화
                // const response = await fetch("/api/jobs");
                // if (!response.ok) throw new Error("Failed to fetch jobs data");
                // const data = await response.json();

                // 지금은 더미 데이터를 사용
                const data = dummyJobs;
                setJobs(data); // 작업 데이터 상태 업데이트
                setFilteredJobs(data); // 초기 필터링된 데이터 설정
            } catch (error) {
                console.error("Error fetching job data:", error);
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchJobs();
    }, []);

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
                "한달 전": 10080,
            };
            filtered = filtered.filter(
                (job) => job.postedTime <= timeThreshold[selectedPostedTime]
            );
        }

        // 4. 정렬 필터링
        filtered.sort((a, b) => {
            if (sortOrder === "최신순") return a.postedTime - b.postedTime; // 최신순
            if (sortOrder === "이름순") return a.title.localeCompare(b.title, "ko"); // 이름순
            return 0;
        });
        setFilteredJobs(filtered);
    };

    // 필터와 정렬 상태가 변경될 때마다 실행
    useEffect(() => {
        applyFiltersAndSorting();
    }, [selectedLocal, salary, selectedPostedTime, sortOrder, jobs]);

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

    if (loading) {
        return <div className="text-center mt-4">로딩 중...</div>; // 로딩 중 표시
    }

    return (
        <div className="p-10 mx-auto max-w-7xl">
            {/* 정렬 옵션 */}
            <div className="flex justify-end max-w-7xl px-10">
                <select
                    className="p-2 border rounded-lg w-[130px]"
                    value={sortOrder}
                    onChange={(e) => {
                        setSortOrder(e.target.value); // 정렬 옵션 변경
                    }}
                >
                    <option value="최신순">최신순</option>
                    <option value="이름순">이름순</option>
                </select>
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
                        navigate={navigate}
                    />
                </div>
            </div>
        </div>
    );
}
