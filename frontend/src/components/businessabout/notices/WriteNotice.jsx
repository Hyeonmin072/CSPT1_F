import { Bold, Italic, Underline, Strikethrough, Link, Image, Video, ChevronLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../sign/axios/AxiosInstance";
import Swal from "sweetalert2";

export default function WriteNotice() {
    const navigate = useNavigate();
    const [notice, setNotice] = useState({
        id: "",
        title: "",
        content: "",
        importance: false,
        date: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "importance") {
            setNotice({ ...notice, importance: value === "true" });
        } else {
            setNotice({ ...notice, [name]: value });
        }
    };

    {/* 공지사항 내용 스타일 */}
    const [activeStyles, setActiveStyles] = useState({
        bold: false,
        italic: false,
        underline: false,
        strikeThrough: false
    });

    const editorRef = useRef(null);

    {/* 스타일 적용 고장남 */}
    // const toggleStyle = (style) => {
    //     if (!editorRef.current) return;
    
    //     const selection = window.getSelection();
    //     if (!selection.rangeCount) return; // 선택된 텍스트가 없으면 종료
    
    //     const range = selection.getRangeAt(0);
    
    //     // 선택된 텍스트에 스타일 적용
    //     const wrapperTag = {
    //         bold: "b",
    //         italic: "i",
    //         underline: "u",
    //         strikeThrough: "s",
    //     }[style];
    
    //     if (wrapperTag) {
    //         const wrapper = document.createElement(wrapperTag);
    //         wrapper.appendChild(range.extractContents()); // 선택된 텍스트를 래핑
    //         range.deleteContents();
    //         range.insertNode(wrapper);
    
    //         // 커서 위치를 래핑된 텍스트 뒤로 이동
    //         selection.removeAllRanges();
    //         const newRange = document.createRange();
    //         newRange.setStartAfter(wrapper);
    //         selection.addRange(newRange);
    //     }
    // };

    {/* 공지사항 등록 */}
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!notice.title.trim() || !notice.content.trim()) {
            Swal.fire({
                icon: "warning",
                title: "입력 오류",
                text: "제목과 내용을 모두 입력해주세요.",
                confirmButtonColor: "#D33",
            });
            return;
        }
        
        try {
            const response = await axiosInstance.post("/shop/notice", {
                title: notice.title,
                content: notice.content,
                importance: notice.importance,
            });
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "등록 완료!",
                    text: "공지사항이 성공적으로 등록되었습니다.",
                    confirmButtonColor: "#4CAF50",
                });
                navigate("/notices");
            }
        } catch (error) {
            console.error("Error submitting notice:", error);
            Swal.fire({
                icon: "error",
                title: "등록 실패",
                text: "서버 오류가 발생했습니다. 다시 시도해주세요.",
                confirmButtonColor: "#D33",
            });
        }
    };

    {/* 글자 크기 조절 */}
    const [fontSize, setFontSize] = useState("16px");

    const changeFontSize = (e) => {
        const selectedSize = e.target.value;
        setFontSize(selectedSize);

        if (editorRef.current) {
            editorRef.current.style.fontSize = selectedSize;
        }
    };

    return (
        <div className="p-5 flex flex-col justify-center items-center w-full mx-auto max-w-6xl">

            <div className="flex flex-col pt-10 mt-10 bg-white w-full h-full">
                {/* Header */}
                <div className="flex flex-row mb-8 space-x-10">
                    <div className="flex flex-row items-center justify-center">
                        <button onClick={() => navigate(-1)}><ChevronLeft/></button>
                    </div>
                    {/* 공지사항 유형 */}
                    <div className="flex flex-col space-y-2">
                        <p className="font-bold text-xl">카테고리</p>
                        <select
                            className="p-2 border rounded-lg w-[200px]"
                            value={notice.importance ? "true" : "false"}
                            onChange={handleChange}
                            name="importance"
                        >
                            <option value="false">일반 공지사항</option>
                            <option value="true">중요 공지사항</option>
                        </select>
                    </div>

                    {/* 공지사항 제목 */}
                    <div className="flex flex-col w-full space-y-2">
                        <p className="font-bold text-xl">제목</p>
                        <input
                            type="text"
                            name="title" 
                            placeholder="공지사항 제목을 입력하세요."
                            value={notice.title}
                            onChange={handleChange}
                            className="p-3 w-[600px] border-b border-gray-400 focus:outline-none focus:border-black"
                        />

                    </div>

                    {/* 등록 버튼 */}
                    <form onSubmit={handleSubmit}>
                        <button
                            type="submit"
                            disabled={!notice.title.trim() || !notice.content.trim()} // 제목과 내용이 비어있으면 비활성화
                            className={`border rounded-lg w-[150px] h-[50px] font-medium px-auto flex justify-center items-center transition duration-300 mt-4 ${
                                !notice.title.trim() || !notice.content.trim()
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-green-500 text-white hover:bg-green-700"
                            }`}
                        >
                            등록하기
                        </button>
                    </form>
                </div>
            </div>
                
            <div className="w-full border border-gray-300 rounded">
                {/* 공지사항 내용 */}
                <div
                    className="w-full h-[500px] p-4 focus:outline-none focus:border-black mt-2"
                    contentEditable={true}
                    onInput={(e) => {
                        const content = e.currentTarget.textContent.replace(/\n/g, "<br>");
                        setNotice({ ...notice, content });
                    }}
                    ref={editorRef}
                    suppressContentEditableWarning={true}
                />
            </div>
            
        </div>
    );
}
