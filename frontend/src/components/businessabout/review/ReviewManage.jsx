import { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function ReviewManage() {
    const [activeTab, setActiveTab] = useState("unwritten");
    
    // 더미 데이터들 
    const [unwrittenReviews, setUnwrittenReviews] = useState([
        { id: 1, customer: "홍길동", review: "", content: "", date: "2025-05-20" },
        { id: 2, customer: "김철수", review: "", content: "", date: "2025-05-19" },
    ]);
    const [writtenReviews, setWrittenReviews] = useState([
        { id: 3, customer: "이영희", content: "좋은 서비스 감사합니다!", date: "2025-05-18" },
    ]);


    const handleReviewSubmit = (id, content) => {
        const review = unwrittenReviews.find((review) => review.id === id);
        if (review) {
            Swal.fire({
                title: "리뷰 작성을 완료하시겠습니까?",
                text: "작성된 리뷰는 수정할 수 없습니다.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "확인",
                cancelButtonText: "취소",
            }).then((result) => {
                if (result.isConfirmed) {
                    // 작성 완료 리뷰로 이동
                    setWrittenReviews([...writtenReviews, { ...review, content }]);
                    // 미작성 리뷰에서 제거
                    setUnwrittenReviews(unwrittenReviews.filter((review) => review.id !== id));
    
                    // SweetAlert2 성공 메시지
                    Swal.fire({
                        title: "리뷰 작성 완료!",
                        text: "리뷰가 성공적으로 작성되었습니다.",
                        icon: "success",
                        confirmButtonText: "확인",
                    });
                }
            });
        }
    };

    return (
        <div className="max-w-6xl container mx-auto p-8 mt-20">
            <div className="font-bold text-xl mb-5">리뷰 관리</div>

            {/* 탭 메뉴 */}
            <div className="border bg-white rounded-xl flex flex-row items-center relative mb-7">
                <div className="border rounded-xl overflow-hidden inline-flex relative w-full">
                    {/* Motion Div: 활성화된 탭 강조 */}
                    <motion.div
                        className="absolute top-0 bottom-0 bg-green-500"
                        style={{ width: "50%" }} 
                        animate={{ x: activeTab === "unwritten" ? "0%" : "100%" }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    />
                    {/* 버튼들 */}
                    <button
                        className={`z-10 px-4 py-2 font-bold flex-1 ${
                            activeTab === "unwritten" ? "text-white" : "bg-white text-black"
                        }`}
                        onClick={() => setActiveTab("unwritten")}
                    >
                        미작성 리뷰
                    </button>
                    <button
                        className={`z-10 px-4 py-2 font-bold flex-1 ${
                            activeTab === "written" ? "text-white" : "bg-white text-black"
                        }`}
                        onClick={() => setActiveTab("written")}
                    >
                        작성 완료 리뷰
                    </button>
                </div>
            </div>

            {/* 리뷰 리스트 */}
            <div className="flex flex-col h-[700px] w-full border p-4 overflow-y-auto rounded">
                {activeTab === "unwritten" && (
                    <div>
                        {unwrittenReviews.length > 0 ? (
                            unwrittenReviews.map((review) => (
                                <div key={review.id} className="border-b pb-4 mb-4">
                                    <div className="font-bold">고객: {review.customer}</div>
                                    <div className="text-sm text-gray-500">날짜: {review.date}</div>
                                    <textarea
                                        className="w-full border p-2 mt-2 min-h-[150px] resize-none overflow-hidden"
                                        placeholder="리뷰를 작성하세요..."
                                        onInput={(e) => {
                                            e.target.style.height = "auto";
                                            e.target.style.height = `${e.target.scrollHeight}px`; // 내용에 따라 높이 조정
                                        }}
                                        onChange={(e) => (review.content = e.target.value)}
                                    ></textarea>
                                    <div className="flex mt-2">
                                        <button
                                            onClick={() => handleReviewSubmit(review.id, review.content)}
                                            className="px-4 py-2 bg-green-500 text-white rounded ml-auto"
                                        >
                                            리뷰 작성 완료
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500">미작성 리뷰가 없습니다.</div>
                        )}
                    </div>
                )}

                {activeTab === "written" && (
                    <div>
                        {writtenReviews.length > 0 ? (
                            writtenReviews.map((review) => (
                                <div key={review.id} className="border-b pb-4 mb-4">
                                    <div className="font-bold">고객: {review.customer}</div>
                                    <div className="text-sm text-gray-500">날짜: {review.date}</div>
                                    <div className="mt-2">{review.content}</div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500">작성 완료된 리뷰가 없습니다.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}