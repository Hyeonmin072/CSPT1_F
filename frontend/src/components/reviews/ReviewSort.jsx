import { Star } from "lucide-react";

export default function ReviewSort({ sortOrder, setSortOrder, displayedReviews }){
    return(
        <>
            {/* 리뷰 정렬 선택 */}
            <div className="flex justify-end mb-4 w-[800px]">
                <select
                    className="px-4 py-2 text-gray-300 font-semibold rounded"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="최신순">최근 리뷰순</option>
                    <option value="평점순">가장 높은 평점순</option>
                </select>
            </div>

            {/* 리뷰 글 */}
            {displayedReviews.map((review) => (
                <div key={review.id} className="mb-4 border rounded-lg w-[800px]">
                    <div className="flex justify-between items-start">
                        <div className="flex-grow p-5">
                            <div className="flex items-center">
                                <div className="text-xl font-bold">{review.title}</div>
                                <div className="text-sm text-gray-400 ml-2">&gt; {review.designer}</div>
                            </div>
                            <div className="flex flex-row items-center gap-1 mt-2 mb-2">
                                {Array.from({length: Math.floor(review.rating)}).map((_, idx) => (
                                    <Star key={idx} color="#FFF33F" className="w-5 h-5"/>
                                ))}
                            </div>
                            <p className="pt-5">{review.content}</p>
                            <p className="text-sm text-gray-500 mt-10">{review.author} | {review.date} | {review.visits}</p>

                            {/* 리뷰 대댓글(가게) */}
                            {review.storeReply && (
                                <div className="mt-4 bg-gray-200 p-4 rounded">
                                    <p className="font-bold">{review.storeReply.storeName}</p>
                                    <p className="pt-10 pb-10">{review.storeReply.content}</p>
                                    <p className="text-xs text-gray-500 mt-1">{review.storeReply.date}</p>
                                </div>
                            )}
                        </div>
                        <div className="flex-shrink-0 mx-10 mt-4">
                            {review.image ? (
                                <img src={review.image} className="w-30 h-40 ml-4 mx-auto"/>
                            ) : (
                                <div className="w-[149px] h-24 ml-4 mx-auto"></div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}