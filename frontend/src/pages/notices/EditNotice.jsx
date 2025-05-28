import BusinessHeader from "../../components/common/BusinessHeader";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/AxiosInstance";
import Swal from "sweetalert2";

export default function EditNotice() {
    const { noticeId } = useParams();

    const editorRef = useRef(null);
    const navigate = useNavigate();

    const [notice, setNotice] = useState({
        title: "",
        content: "",
        importance: false,
    });

    useEffect(() => {
        const fetchNoticeData = async () => {
            try {
                const response = await axiosInstance.get(`/shop/notice/${noticeId}`);
                const data = response.data;
                console.log("Fetched Data:", data); // 디버깅 로그
                setNotice({
                    ...data,
                    title: data.title,
                    content: data.content,
                    importance: data.importance,
                });
            } catch (error) {
                console.error("Error fetching notice data:", error);
            }
        };
    
        fetchNoticeData();
    }, [noticeId]);

    const convertTextToHTML = (text) => {
        return text
            .split("\n")
            .map((line) => `<div>${line || "<br>"}</div>`)
            .join(""); 
    };

    const handleUpdate = async () => {
        try {
            const updatedNotice = {
                title: notice.title,
                content: convertTextToHTML(notice.content),
                importance: notice.importance,
            };
            console.log("importance 확인 : ", updatedNotice.importance);

            const response = await axiosInstance.patch(`/shop/notice/${noticeId}`, updatedNotice);
            if (response.status === 200) {
                Swal.fire("성공", "공지사항이 수정되었습니다.", "success");
            }
            navigate("/notices/detail/" + noticeId);
        } catch (error) {
            console.error("Error updating notice:", error);
            Swal.fire("오류", "공지사항 수정 중 문제가 발생했습니다.", "error");
        }
    };
    
    const stripHTML = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.innerHTML.replace(/<\/div>/g, "<br>").replace(/<br\s*\/?>/g, "\n").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " "); // <br>은 \n으로, 나머지 태그는 제거
    };

    return (
        <div className="min-h-screen bg-white">
            <BusinessHeader />
            <div className="p-10 mt-20 flex flex-col justify-center w-full mx-auto max-w-6xl">
                <div className="flex flex-row justify-between space-x-4 mb-8">
                    <div className="flex flex-row space-x-4">
                        <button onClick={() => navigate(-1)}><ChevronLeft /></button>
                        <h1 className="text-2xl font-bold">공지사항 수정</h1>
                    </div>
                </div>
    
                <div className="flex flex-row space-x-4 justify-between">
                    <input
                        type="text"
                        value={notice.title}
                        onChange={(e) => setNotice({ ...notice, title: e.target.value })}
                        placeholder="제목을 입력하세요"
                        className="p-2 border rounded w-full border-gray-300"
                    />
                    <select
                        value={notice.importance ? "important" : "normal"}
                        onChange={(e) => {
                            const updatedImportance = e.target.value === "important";
                            setNotice((prevNotice) => ({
                                ...prevNotice,
                                importance: updatedImportance,
                            }));
                        }}
                        className="p-2 border rounded w-1/4 border-gray-300"
                    >
                        <option value="normal">일반 공지사항</option>
                        <option value="important">중요 공지사항</option>
                    </select>
                </div>

                {/* 공지사항 수정 내용 textarea */}
                <div className="mt-4">
                    <textarea
                        ref={editorRef}
                        value={stripHTML(notice.content)} 
                        //value={notice.content}
                        onChange={(e) => setNotice({ ...notice, content: e.target.value })}
                        placeholder="내용을 입력하세요"
                        className="w-full h-auto min-h-[400px] p-2 border rounded resize-none border-gray-300"
                    />
                </div>
    
                <div className="flex flex-row justify-end space-x-4 mt-4">
                    <button
                        onClick={() => {
                            Swal.fire({
                                title: "공지사항 수정",
                                text: "공지사항을 수정하시겠습니까?",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "수정하기",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    handleUpdate();
                                }
                            });
                        }}
                        className="p-2 bg-green-500 text-white px-6 rounded hover:bg-green-700"
                    >
                        저장하기
                    </button>
    
                    <button
                        onClick={() => navigate(`/notices/detail/${noticeId}`)}
                        className="p-2 bg-gray-300 text-black px-6 rounded hover:bg-gray-400 ml-2"
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}