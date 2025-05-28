import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import axiosInstance from "../../sign/axios/AxiosInstance.jsx";

import LeftSideBar from "./LeftSideBar.jsx";
import JobList from "./JobList.jsx";

export default function GetJob() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]); 
    const [filteredJobs, setFilteredJobs] = useState([]); 
    const [sortOrder, setSortOrder] = useState("최신순");
    const [selectedLocal, setSelectedLocal] = useState("전체");
    const [salary, setSalary] = useState(100);
    const [selectedPostedTime, setSelectedPostedTime] = useState("전체");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axiosInstance.get("/designer/job/posts");
                
                const data = Array.isArray(response.data) ? response.data : [];
                console.log("구인 목록 응답 데이터:", data);
                
                const formattedData = data.map((job) => ({
                    ...job,
                    postedTime: formatPostedTime(
                        Math.floor((new Date() - new Date(job.postedAt)) / 60000)
                    ),
                }));
                
                setJobs(formattedData);
                setFilteredJobs(formattedData);
            } catch (error) {
                console.error("Error fetching job data:", error);
                alert("구인 목록을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchJobs();
    }, []);

    // 필터링 및 정렬 로직 통합
    const applyFiltersAndSorting = () => {
        let filtered = [...jobs]; // 원본 배열 복사
    
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
                "한달 전": 43200, // 한 달은 약 43200분
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
        <div className="p-10 mx-auto max-w-7xl mt-20">
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
