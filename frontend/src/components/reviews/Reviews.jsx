import { useState, useEffect } from 'react';
import reviewEX from "../../assets/hairshop/reviewEX.jpg";
import { Star, X } from "lucide-react";

import ReviewsPhoto from "./ReviewsPhoto.jsx";
import ReviewSort from "./ReviewSort.jsx";
import ReviewTabs from "./ReviewsTabs.jsx";

// 임시 데이터
const reviews = [
    {
        id: 1, content: "머리를 이쁘게 잘라주셔서 감사합니다. 주변사람들이 못알아보네요", rating: 5.0,
        image: reviewEX, title: '남성디자인 컷', designer: '소원 수석디자이너', category: '커트',
        author: '김*현', date: '17일 전', visits: '3번째 방문',
        storeReply: {
            content: "안녕하세요 자주 방문해주셔서 감사합니다.",
            date: '15일 전',
            storeName: '포레포레헤어 고속터미널점',
        },
    },
    {
        id: 2, content: "머리 스타일이 정말 마음에 들어요! 고맙습니다.", rating: 4.5,
        image: reviewEX, title: '여성디자인 컷', designer: '희수 디자이너', category: '커트',
        author: '김*현', date: '7일 전', visits: '3번째 방문',
        storeReply: {
            content: "ㅎㅇㅎㅇ",
            date: '5일 전',
            storeName: '포레포레헤어 고속터미널점',
        },
    },
    {
        id: 3, content: "아아악", rating: 3.0,
        image: reviewEX, title: '모발 클리닉', designer: '희수 디자이너', category: '클리닉',
        author: '김*현', date: '10일 전', visits: '3번째 방문',
        storeReply: {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque venenatis ex vitae metus accumsan, eget porta magna gravida. Praesent volutpat lacus vel dui faucibus, eget ornare velit tincidunt. Aliquam elementum nisl eu commodo lobortis. Integer venenatis accumsan nunc, venenatis aliquet est ultrices vel. Phasellus sit amet mi diam. Praesent ante orci, porta a orci sed, placerat vehicula augue. Phasellus id felis eget ipsum viverra lacinia." ,
            date: '8일 전',
            storeName: '포레포레헤어 고속터미널점',
        },
    },
    {
        id: 4, content: "ㄳ", rating: 2.5, image: reviewEX,
        title: '디지털 펌', designer: '희수 디자이너', category: '펌', author: '김*현',
        date: '5일 전', visits: '3번째 방문',
        storeReply: {
            content: "안녕하세요 자주 방문해주셔서 감사합니다.",
            date: '4일 전',
            storeName: '포레포레헤어 고속터미널점',
        },
    },
    {
        id: 5, content: "ㄳ", rating: 2.5, image: reviewEX,
        title: '디지털 펌', designer: '희수 디자이너', category: '펌', author: '김*현',
        date: '5일 전', visits: '3번째 방문',
        storeReply: {
            content: "안녕하세요 자주 방문해주셔서 감사합니다.",
            date: '4일 전',
            storeName: '포레포레헤어 고속터미널점',
        },
    },
    {
        id: 6, content: "ㄳ", rating: 2.5, image: reviewEX,
        title: '디지털 펌', designer: '희수 디자이너', category: '펌', author: '김*현',
        date: '5일 전', visits: '3번째 방문',
        storeReply: {
            content: "안녕하세요 자주 방문해주셔서 감사합니다.",
            date: '4일 전',
            storeName: '포레포레헤어 고속터미널점',
        },
    },
    {
        id: 7, content: "ㄳ", rating: 2.5, image: reviewEX,
        title: '디지털 펌', designer: '희수 디자이너', category: '펌', author: '김*현',
        date: '5일 전', visits: '3번째 방문',
        storeReply: {
            content: "안녕하세요 자주 방문해주셔서 감사합니다.",
            date: '4일 전',
            storeName: '포레포레헤어 고속터미널점',
        },
    },
    {
        id: 8, content: "ㄳ", rating: 2.5, image: reviewEX,
        title: '디지털 펌', designer: '희수 디자이너', category: '펌', author: '김*현',
        date: '5일 전', visits: '3번째 방문',
        storeReply: {
            content: "안녕하세요 자주 방문해주셔서 감사합니다.",
            date: '4일 전',
            storeName: '포레포레헤어 고속터미널점',
        },
    },
];

export default function Reviews() {
    const [selectedReview, setSelectedReview] = useState(null);
    const [selectedTab, setSelectedTab] = useState('전체');
    const [sortOrder, setSortOrder] = useState('최신순');
    const [displayedReviews, setDisplayedReviews] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleTabClick = (tab) => setSelectedTab(tab);

    // 모달
    const openModal = (review) => setSelectedReview(review);
    const closeModal = () => setSelectedReview(null);

    // 사진 리뷰 개수
    const photoReviewsCount = reviews.filter(review => review.image !== null).length;

    useEffect(() => {
        // 확인용 console
        console.log(`선택된 탭: ${selectedTab}, 정렬 기준: ${sortOrder}`);

        // 리뷰 필터링: 선택된 탭에 따라 필터링
        const filteredReviews = reviews.filter(review =>
            selectedTab === '전체' || review.category === selectedTab
        );

        // 정렬: 최신순 / 평점순에 따른 정렬
        const sortedReviews = filteredReviews.sort((a, b) => {
            if (sortOrder === '최신순') return b.id - a.id; // 최신순: id 기준 내림차순
            if (sortOrder === '평점순') return b.rating - a.rating; // 평점순: rating 기준 내림차순
            return 0;
        });

        // 확인용 console
        console.log("필터링된 리뷰:", filteredReviews);
        console.log("정렬된 리뷰:", sortedReviews);

        // 상태 업데이트: 정렬된 리뷰를 상태에 반영
        setDisplayedReviews(sortedReviews);
    }, [reviews, selectedTab, sortOrder]); // reviews, selectedTab, sortOrder에 의존성 추가


    return (
        <>
            <ReviewTabs selectedTab={selectedTab} handleClick={handleTabClick} />

            <div className="text-lg font-semibold mx-auto px-20 py-5 w-[970px]">
                리뷰사진 {photoReviewsCount}
            </div>

            <div className="container mx-auto flex flex-col items-center w-[800px]">
                {/* 사진 리뷰 */}
                <ReviewsPhoto openModal={openModal} reviews={displayedReviews}  />

                {/* 모달 */}
                {selectedReview && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                        <div
                            className="bg-white p-5 rounded-lg w-[900px] max-w-full max-h-[100vh] overflow-y-auto relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-3 right-3 text-xl font-bold"
                            >
                                <X/>
                            </button>
                            <div className="flex">
                                {/* 사진 영역 */}
                                <img
                                    src={selectedReview.image || reviewEX}
                                    alt={selectedReview.title}
                                    className="w-[300px] h-[300px] object-cover flex-shrink-0"
                                />
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
                                        {selectedReview ? selectedReview.content : `${selectedReview.content.slice(0, 200)}... `}
                                        {!selectedReview && selectedReview.content.length > 200 && (
                                            <button onClick={() => setselectedReview(true)}
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

                <hr className="my-5 w-[900px]"/>

                <ReviewSort sortOrder={sortOrder} setSortOrder={setSortOrder} displayedReviews={displayedReviews}/>

            </div>
        </>
    );
}

