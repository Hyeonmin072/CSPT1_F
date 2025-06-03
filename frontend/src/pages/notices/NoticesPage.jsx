import BusinessHeader from "../../components/common/BusinessHeader";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import axiosInstance from "../../axios/AxiosInstance";

export default function NoticesPage() {
    const navigate = useNavigate();
    const [notice, setNotice] = useState({
        id: "",
        title: "",
        date: null,
        importance: false,
    });
    const [view, setView] = useState('normal'); 
    const [selectedNotice, setSelectedNotice] = useState({
        normalNotice: [],
        importantNotice: [],
    });

    useEffect(() => {
        const fetchNoticeData = async () => {
            try {
                // 전체 공지사항 조회
                const response = await axiosInstance.get("/shop/notices");
                const data = response.data;
    
                // 공지사항 분류
                const normalNotice = data
                    .filter((notice) => !notice.importance)
                    .map((notice) => ({
                        ...notice,
                        date: new Date(notice.createDate).toISOString().slice(0, 10),
                    }))
                    .sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
    
                const importantNotice = data
                    .filter((notice) => notice.importance)
                    .map((notice) => ({
                        ...notice,
                        date: new Date(notice.createDate).toISOString().slice(0, 10),
                    }))
                    .sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
    
                setSelectedNotice({ normalNotice, importantNotice });
            } catch (error) {
                console.error("Error fetching notice data:", error);
            }
        };
    
        fetchNoticeData();
    }, []);
    

    return (
        <div className="min-h-screen bg-white">
            <BusinessHeader />
            <div className="p-10 mt-20 flex flex-col justify-center w-full mx-auto max-w-6xl">
                <div className="flex flex-row justify-between bg-white w-full h-full">

                    <div className="border bg-white rounded-xl flex flex-row items-center relative mb-7 w-[600px]">
                        <div className="border rounded-xl overflow-hidden inline-flex relative w-full">
                            {/* Motion Div: 버튼들에 맞게 크기 조정 */}
                            <motion.div
                                className="absolute top-0 bottom-0 bg-green-500"
                                style={{width: "50%"}}
                                animate={{x: view === "normal" ? "0%" : "100%"}}
                                transition={{type: "spring", stiffness: 100, damping: 15}}
                            />
                            {/* 버튼들 */}
                            <button
                                className={`z-10 px-4 py-2 font-bold flex-1 ${view === 'normal' ? 'text-white' : 'bg-white text-black'}`}
                                onClick={() => setView('normal')}
                            >
                                일반 공지사항
                            </button>
                            <button
                                className={`z-10 px-4 py-2 font-bold flex-1 ${view === 'important' ? 'text-white' : 'bg-white text-black'}`}
                                onClick={() => setView('important')}
                            >
                                중요 공지사항
                            </button>
                        </div>
                    </div>


                    <div>
                        <Link
                            to={`/notices/register`}
                            className="border rounded-lg w-[130px] py-2 font-medium px-auto
                            flex justify-center items-center bg-green-500 text-white hover:bg-green-700 transition duration-300">
                        <button
                        >
                            등록
                        </button>
                        </Link>
                    </div>
                </div>

                <div>
                    <div className="flex flex-col gap-4">
                        {selectedNotice[view === 'normal' ? 'normalNotice' : 'importantNotice']?.length > 0 ? (
                            selectedNotice[view === 'normal' ? 'normalNotice' : 'importantNotice'].map((notice) => (
                                <div
                                    key={notice.id}
                                    onClick={() => {
                                        setNotice(notice); 
                                        navigate(`/notices/detail/${notice.id}`, { state: notice }); 
                                    }}
                                    className="flex items-center border justify-between p-4 bg-gray-50 rounded shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                                >
                                    <div className="flex flex-col">
                                        <p className="text-gray-800 font-medium">{notice.title}</p>
                                        <p className="text-xs text-gray-400">{notice.date || "날짜 존재 X"}</p>
                                    </div>
                                    <ChevronRight className="text-gray-500" />
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">
                                {view === 'normal' ? '일반 공지사항이 없습니다.' : '중요 공지사항이 없습니다.'}
                            </p>
                        )}
                    </div>
                </div>           
            </div>
        </ div>
    );
}
