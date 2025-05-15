import BusinessHeader from "../../components/common/BusinessHeader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../axios/AxiosInstance";
import Swal from "sweetalert2";
import { ChevronLeft } from "lucide-react";

export default function DetailNotice() {
    const { noticeId } = useParams();
    const [notice, setNotice] = useState({
        id: "",
        title: "",
        content: "",
        importance: false,
        date: null,
    });

    const navigate = useNavigate();

    const handleDelete = async () => {    
        try {
            const confirm = await Swal.fire({
                title: "정말로 삭제하시겠습니까?",
                text: "이 작업은 되돌릴 수 없습니다.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "삭제",
                cancelButtonText: "취소",
            });
    
            if (!confirm.isConfirmed) return;
    
            const response = await axiosInstance.delete(`/shop/notice/${noticeId}`); // 삭제 요청
            if (response.status === 200) {
                await Swal.fire({
                    title: "삭제 완료",
                    text: "공지사항이 성공적으로 삭제되었습니다.",
                    icon: "success",
                    confirmButtonColor: "#4CAF50",
                });
                navigate("/notices");
            }
        } catch (error) {
            console.error("Error deleting notice:", error);
            Swal.fire({
                title: "삭제 실패",
                text: "공지사항 삭제 중 오류가 발생했습니다.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
        }
    };

    useEffect(() => {
        if (!noticeId) {
            console.error("Invalid noticeId:", noticeId);
            Swal.fire({
                title: "오류",
                text: "공지사항 ID가 유효하지 않습니다.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
            return;
        }
        
        const fetchNoticeData = async () => {
            try {
                const response = await axiosInstance.get(`/shop/notice/${noticeId}`);
                console.log("Response data:", response.data);
                const data = response.data;

                setNotice({
                    ...data,
                    id: data.id || "",
                    title: data.title || "제목이 존재하지 않습니다",
                    content: data.content || "내용이 존재하지 않습니다",
                    importance: !!data.importance,
                    date: new Date(data.createDate).toISOString().slice(0, 10) || "날짜가 존재하지 않습니다",
                });
            } catch (error) {
                console.error("Error fetching notice data:", error);
                Swal.fire({
                    title: "데이터 로드 실패",
                    text: "공지사항 데이터를 불러오는 중 오류가 발생했습니다.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
            }
        };

        fetchNoticeData();
    }, [noticeId]);

    if (!notice) {
        return <div className="text-center mt-4">로딩 중...</div>; 
    }

    return (
        <div className="min-h-screen bg-white">
            <BusinessHeader />
            <div className="p-10 mt-20 flex flex-col w-full h-full mx-auto max-w-6xl">
                <div className="flex flex-row justify-between bg-white w-full p-2">
                    <div className="flex flex-row items-center justify-center px-4 space-x-2">
                        <button onClick={() => navigate("/notices")}><ChevronLeft/></button>
                        <p className="font-bold text-xl">{notice.title}</p>
                    </div>
    
                    <div className="flex flex-row items-center justify-center gap-2">
                        <Link
                            to={`/notices/edit/${noticeId}`}
                            className="border rounded-lg w-[130px] py-2 font-medium px-auto
                            flex justify-center items-center bg-green-500 text-white hover:bg-green-700 transition duration-300"
                        >
                            <button>편집</button>
                        </Link>
                        <div>
                            <button
                                onClick={handleDelete}
                                className="border rounded-lg w-[130px] py-2 font-medium px-auto
                                flex justify-center items-center bg-red-500 text-white hover:bg-red-700 transition duration-300"
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                </div>
                <h3 className="border-b-2 border-gray-300 pb-5"></h3>
                <div className="flex flex-col justify-between px-4 mt-5 p-3">
                    <div className="flex flex-row justify-between">
                        <div className="text-gray-400"> 
                            {notice.importance ? "중요 공지사항" : "일반 공지사항"}
                        </div>
                        <p className="text-gray-400">{notice.date}</p>
                    </div>
                    <div className="mt-5 ">
                        <div
                            className="flex flex-col items-center px-4 h-auto"
                            dangerouslySetInnerHTML={{ __html: notice.content }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}