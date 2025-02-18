import { useState, useEffect } from "react";
import { Star, ChevronLeft, X, House } from "lucide-react";
import { Link } from "react-router-dom";

import d1 from "../../../assets/designer/d1.png";
import designerEX from "../../../assets/hairshop/designerEX.jpg";
import reviewEX from "../../../assets/hairshop/reviewEX.jpg";

export default function PhotoReviews() {
    const [selectedReview, setSelectedReview] = useState(null);
    const [showFullContent, setShowFullContent] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);

    const closeModal = () => setSelectedReview(null);
    const openModal = (review) => setSelectedReview(review);

    const fetchMorePhotos = () => {
        const newPhotos = [
            { id: 1, src: d1, title: 'Photo 4', content: 'Content for Photo 4', rating: 4, author: 'Author 4', date: '2025-02-18', visits: 100 },
            { id: 2, src: reviewEX, title: 'Photo 5', content: 'Content for Photo 5', rating: 5, author: 'Author 5', date: '2025-02-18', visits: 200 },
            { id: 3, src: designerEX, title: 'Photo 6', content: 'Content for Photo 6', rating: 3, author: 'Author 6', date: '2025-02-18', visits: 300 },
            { id: 4, src: designerEX, title: 'Photo 6', content: 'Content for Photo 6', rating: 3, author: 'Author 6', date: '2025-02-18', visits: 300 },
            { id: 5, src: designerEX, title: 'Photo 6', content: 'Content for Photo 6', rating: 3, author: 'Author 6', date: '2025-02-18', visits: 300 },
        ];
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    };

    useEffect(() => {
        // 초기 사진 로드
        fetchMorePhotos();

        // 무한 스크롤 핸들러
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
            setLoading(true);
            fetchMorePhotos();
            setLoading(false);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    return (
        <div className="container mx-auto px-10 w-[900px]">
            <div className="flex items-center justify-between mb-4">
                <button
                    className="rounded-full hover:bg-gray-200"
                    onClick={() => window.history.back()}
                >
                    <ChevronLeft className="w-6 h-6"/>
                </button>
                <div className="flex-grow text-center">
                    <h1 className="text-l font-bold">포토리뷰 257</h1>
                </div>
                <Link to="/"
                    className="rounded-full hover:bg-gray-200">
                    <House className="w-6 h-6"/>
                </Link>
            </div>

            <div className="grid grid-cols-3">
                {photos.map((photo) => (
                    <div key={photo.id} className="relative" onClick={() => openModal(photo)}>
                        <img src={photo.src} alt={photo.alt} className="w-full h-auto"/>
                    </div>
                ))}
            </div>

            {/* 모달 */}
            {selectedReview && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div
                        className="bg-white p-5 rounded-lg w-[900px] max-w-full max-h-[100vh] overflow-y-auto relative">
                        <button onClick={closeModal} className="absolute top-3 right-3 text-xl font-bold">
                            <X/>
                        </button>
                        <div className="flex">
                            {/* 사진 영역 */}
                            <img src={selectedReview.image || reviewEX} alt={selectedReview.title}
                                 className="w-[300px] h-[300px] object-cover flex-shrink-0"/>
                            {/* 텍스트 영역 */}
                            <div className="ml-5 flex-grow">
                                <div className="text-xl font-bold">{selectedReview.title}</div>
                                <div className="text-sm text-gray-400 mb-4">&gt; {selectedReview.designer}</div>
                                <div className="flex flex-row items-center gap-1 mt-2 mb-2">
                                    {Array.from({length: Math.floor(selectedReview.rating)}).map((_, idx) => (
                                        <Star key={idx} color="#FFF33F" className="w-5 h-5"/>
                                    ))}
                                </div>

                                {/* 본문 내용 (더보기 기능) */}
                                <p className="whitespace-pre-line">
                                    {showFullContent ? selectedReview.content : `${selectedReview.content.slice(0, 200)}... `}
                                    {!showFullContent && selectedReview.content.length > 200 && (
                                        <button onClick={() => setShowFullContent(true)}
                                                className="text-blue-500">더보기</button>
                                    )}
                                </p>

                                <p className="text-sm text-gray-500 mt-4 pb-10">{selectedReview.author} | {selectedReview.date} | {selectedReview.visits}</p>

                                {/* 리뷰 대댓글(가게) */}
                                {selectedReview.storeReply && (
                                    <div className="mt-4 bg-gray-200 p-4 rounded">
                                        <p className="font-bold">{selectedReview.storeReply.storeName}</p>
                                        <p>{selectedReview.storeReply.content}</p>
                                        <p className="text-xs text-gray-500 mt-1">{selectedReview.storeReply.date}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
