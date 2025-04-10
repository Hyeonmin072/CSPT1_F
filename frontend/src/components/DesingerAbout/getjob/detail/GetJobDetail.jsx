import { useNavigate } from "react-router-dom";
import React , { useState, useEffect } from "react";
import { Check,MapPin, CalendarCheck } from "lucide-react";

import h1 from "../../../../assets/hairshop/h1.jpg";

export default function GetJobDetail() {
    const navigate = useNavigate();
    const [jobDetails, setJobDetails] = useState([]);
    const [leftstart, setLeftStart] = useState([]);
    const [rightmiddle, setRightMiddle] = useState([]);
    const [rightend, setRightEnd] = useState([]);
    const [recruitment, setRecruitment] = useState([]);

    // 더미 데이터
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 나중에 백엔드 연결할 때 사용할 코드
                // const response = await fetch("/api/job-detail");
                // const data = await response.json();

                // 현재는 더미 데이터 사용
                const data = {
                    shop: [
                        {
                            introduce: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate ullamcorper purus, sed ultricies purus porttitor vitae. Maecenas egestas, metus ac pellentesque mollis, risus libero eleifend lacus, a suscipit urna ligula eu erat. Cras tellus arcu, viverra at luctus ut, dapibus vel massa. Vivamus ac malesuada lorem. Vivamus sed elit nec dui consequat facilisis vel in nisl. Etiam non arcu sed lorem volutpat sagittis. Aenean tempor, orci sit amet maximus tempor, nisl ligula laoreet felis, nec iaculis justo risus quis sapien. In dictum justo efficitur malesuada cursus.",
                            method: "온오프라인"
                        }
                    ],
                    leftside: [
                        {
                            name: "김예원",
                            telephone: "010-1234-5678",
                            location: "서울 서초구 반포동 19-4 본관지하층 대형 10호",
                        }
                    ],
                    rightmiddle: [
                        {
                            model1: "헤어 디자이너(신입) : 0명 - 월 250이상",
                            model2: "헤어 디자이너(경력) : 0명 - 월 300이상",
                            model3: "샵매니저(신입) : 0명 - 월 270이상",
                        },
                    ],
                    rightend: [
                        {
                            time: "10:00 ~ 21:00",
                            period: "상시모집",
                            gender: "무관",
                            preferential: "장기근무 가능한 자",
                            week: "월,화,수,목(주 4일)",
                        },
                    ],
                    jobList: [
                        {
                            id: 1,
                            position: "헤어 디자이너",
                            personnel: "0명",
                            experience: "무관",
                            education: "무관",
                            salary: "기본급 + 인센티브",
                            postedTime: "2025-03-12T12:00:00Z",
                            location: "서울특별시 강남구",
                            description:
                                "헤어 디자이너를 모집합니다. 팀워크와 열정을 겸비한 분을 찾습니다!",
                        },
                        {
                            id: 2,
                            position: "샵 매니저",
                            personnel: "0명",
                            experience: "3년 이상",
                            education: "고졸 이상",
                            salary: "월 300만원",
                            postedTime: "2025-03-10T09:30:00Z",
                            location: "부산광역시 해운대구",
                            description: "샵 운영을 책임질 관리자를 모집합니다. 경력 우대.",
                        },
                        {
                            id: 3,
                            position: "스탭",
                            personnel: "0명",
                            experience: "신입 가능",
                            education: "무관",
                            salary: "시급 12,000원",
                            postedTime: "2025-03-11T14:00:00Z",
                            location: "대구광역시 중구",
                            description: "헤어샵 스탭을 모집합니다. 밝고 성실한 분 환영!",
                        },
                    ],
                };

                setLeftStart(data.leftside);
                setRecruitment(data.shop);
                setRightMiddle(data.rightmiddle);
                setRightEnd(data.rightend);
                setJobDetails(data.jobList);
            } catch (error) {
                console.error("데이터 불러오기 실패:", error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Header */}
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800">구인구직 상세정보</h1>
            </header>

            {/* 직업 정보 */}
            <section className="bg-white border shadow rounded-lg mb-10">
                <div className="flex">
                    {/* 왼쪽 */}
                    <div className="w-1/3 bg-[#EBE7E7] rounded">
                        <img
                            src={h1}
                            alt="Job"
                            className="rounded object-cover"
                        />
                        <div className="p-5 font-semibold">
                            {leftstart.map((leftside, index) => (
                            <ul key={index} className="text-sm text-gray-500">
                                <li>담당자: {leftside.name}</li>
                                <li className="pb-4">연락처: {leftside.telephone}</li>
                                <li>근무 지역: {leftside.location}</li>
                            </ul>
                            ))}
                        </div>
                        <div className="p-3 flex flex-col">
                            <button className="p-1 bg-[#73CEC7] rounded-full"
                                    onClick={() => navigate("/job/detail/cv")}>
                            즉시지원
                            </button>
                        </div>
                    </div>


                    {/* 오른쪽 */}
                    <div className="w-2/3 px-5 pt-4 ">
                        <h2 className="flex flex-col items-center text-xl font-semibold text-gray-800 mb-2">
                            프리모헤어 고속터미널점
                        </h2>
                        <h2 className="border-t-2"></h2>

                        <div className="flex flex-row p-10">
                            <h2 className="w-1/3 font-bold flex flex-col justify-center"> 모집 분야 </h2>

                            {/* 모집 정보 섹션 */}
                            <div className="flex flex-col text-sm">
                                {rightmiddle.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <p>{item.model1}</p>
                                        <p>{item.model2}</p>
                                        <p>{item.model3}</p>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        <h2 className="border-t-2"></h2>

                        {rightend.map((right, index) => (
                        <div className="p-10">
                            <div className="flex flex-row mb-2">
                                <h2 className="font-bold w-1/3">근무시간</h2>
                                <p className="w-1/3">{right.time}</p>
                            </div>
                            <div className="flex flex-row mb-2">
                                <h2 className="font-bold w-1/3">마감일</h2>
                                <p className="w-1/3">{right.period}</p>
                            </div>
                            <div className="flex flex-row mb-2">
                                <h2 className="font-bold w-1/3">성별</h2>
                                <p className="w-1/3">{right.gender}</p>
                            </div>
                            <div className="flex flex-row mb-2">
                                <h2 className="font-bold w-1/3">우대조건</h2>
                                <p className="w-1/3">{right.preferential}</p>
                            </div>
                            <div className="flex flex-row mb-2">
                                <h2 className="font-bold w-1/3">근무요일</h2>
                                <p className="w-1/3">{right.week}</p>
                            </div>
                        </div>
                            ))}
                    </div>
                </div>
            </section>

            {/* 상세 요강 */}
            <section className="pt-4 mb-10">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">상세 요강</h2>
                <div className="bg-white shadow border rounded-lg p-6 h-auto">
                    <div className="pb-5">
                        <div className="p-3 flex flex-row">
                            <Check/>
                            <p className="px-2">모집부분</p>
                        </div>
                        <table className="w-full table-auto text-left">
                            <thead>
                            <tr className="bg-gray-200 ">
                                <th className="px-4 py-2">직종</th>
                                <th className="px-4 py-2">모집인원</th>
                                <th className="px-4 py-2">경력</th>
                                <th className="px-4 py-2">학력</th>
                                <th className="px-4 py-2">급여</th>
                            </tr>
                            </thead>
                            <tbody>
                            {jobDetails.map((job, index) => (
                                <tr key={index} className="border-b-2">
                                    <td className="border-r-2 px-4 py-2">{job.position}</td>
                                    <td className="border-r-2 px-4 py-2">{job.personnel}</td>
                                    <td className="border-r-2 px-4 py-2">{job.experience}</td>
                                    <td className="border-r-2 px-4 py-2">{job.education}</td>
                                    <td className="px-4 py-2">{job.salary}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>


                    <>
                        {recruitment.map((shop, index) => (
                            <div key={index}>
                                <div className="pb-5">
                                    <div className="p-3 flex flex-row">
                                        <Check/>
                                        <p className="px-2">접수 방법</p>
                                    </div>
                                    <div className="px-3">{shop.method}</div>
                                </div>

                                <div className="pb-5">
                                    <div className="p-3 flex flex-row">
                                    <Check/>
                                        <p className="px-2">상세 내용</p>
                                    </div>
                                    <div className="px-3">{shop.introduce}</div>
                                </div>
                            </div>
                        ))}
                    </>
                </div>
            </section>

            {/* 근무 지역 */}
            <section className="bg-white mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">근무 지역</h2>
                <div className="w-full h-[400px] bg-white shadow border rounded-lg p-6">
                    <div className="pb-3 flex flex-row">
                        <MapPin/>
                        {leftstart.map((leftside, index) => (
                        <div key={index} className="px-2">
                            {leftside.location}
                        </div>
                        ))}
                    </div>
                    <iframe
                        src="https://www.google.com/maps" // 나중에 맵API 적용
                        width="100%"
                        height="90%"
                        title="Workplace Location"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </section>

            {/* 지원 방법 */}
            <section className="bg-white ">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">모집 방법</h2>
                <div className="flex flex-row shadow rounded-lg border h-[200px]">
                    <div className="w-1/3 bg-[#E7E7E7] rounded">
                        <div className="flex flex-col items-center justify-center h-full">
                            <CalendarCheck className="w-24 h-24 text-[#73CEC7]" strokeWidth={1}/>
                            <div className="p-2 font-semibold">모집 방법</div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center w-2/3 font-semibold">
                        {leftstart.map((leftside, index) => (
                        <ul key={index} className="text-sm text-gray-700 w-[500px]">
                            <li className="flex flex-row pb-2">
                                <p className="w-1/3">업체명 </p>
                                <p>프리모헤어 고속터미널점</p>
                            </li>
                            <li className="flex flex-row pb-2">
                                <p className="w-1/3">업체주소 </p>
                                <p>{leftside.location}</p>
                            </li>
                            <li className="flex flex-row pb-2">
                                <p className="w-1/3">연락처 </p>
                                <p>{leftside.telephone}</p>
                            </li>
                            <li className="flex flex-row pb-2">
                                <p className="w-1/3">담당자 </p>
                                <p>{leftside.name}</p>
                            </li>
                        </ul>
                            ))}
                    </div>

                </div>
            </section>
        </div>
    );
}
