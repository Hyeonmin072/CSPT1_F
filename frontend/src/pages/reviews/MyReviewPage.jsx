import { useState, useEffect } from "react";
import Header from "../../components/common/Header.jsx";
import { Star, X, Trash2 } from "lucide-react";
import axiosInstance from "../../axios/AxiosInstance.js";
import Swal from "sweetalert2";

export default function MyReviewPage() {
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [sortOrder, setSortOrder] = useState("최신순");
  const [selectedTab, setSelectedTab] = useState("전체");

  // 리뷰 데이터 가져오기
  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/user/review");
        console.log("내 리뷰 데이터:", response.data);
        setMyReviews(response.data);
        setError(null);
      } catch (err) {
        console.error("내 리뷰 로딩 에러:", err);
        if (err.response?.status === 401) {
          setError("로그인이 만료되었습니다. 다시 로그인해주세요.");
        } else if (err.response?.status === 404) {
          setError("작성한 리뷰가 없습니다.");
        } else {
          setError("리뷰 데이터를 불러오는데 실패했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMyReviews();
  }, []);

  // 리뷰 삭제 함수
  const handleDeleteReview = async (reviewId) => {
    const result = await Swal.fire({
      title: "리뷰 삭제",
      text: "정말로 이 리뷰를 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/user/reviews/${reviewId}`);
        setMyReviews(myReviews.filter((review) => review.id !== reviewId));
        Swal.fire({
          title: "삭제 완료",
          text: "리뷰가 성공적으로 삭제되었습니다.",
          icon: "success",
          confirmButtonText: "확인",
        });
      } catch (err) {
        console.error("리뷰 삭제 에러:", err);
        Swal.fire({
          title: "삭제 실패",
          text: "리뷰 삭제에 실패했습니다.",
          icon: "error",
          confirmButtonText: "확인",
        });
      }
    }
  };

  // 모달 관련 함수
  const openModal = (review) => setSelectedReview(review);
  const closeModal = () => setSelectedReview(null);

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "어제";
    if (diffDays < 7) return `${diffDays}일 전`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}개월 전`;
    return `${Math.floor(diffDays / 365)}년 전`;
  };

  // 필터링 및 정렬된 리뷰
  const filteredAndSortedReviews = myReviews
    .filter(
      (review) => selectedTab === "전체" || review.category === selectedTab
    )
    .sort((a, b) => {
      if (sortOrder === "최신순") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortOrder === "평점순") {
        return b.reviewRating - a.reviewRating;
      }
      return 0;
    });

  if (loading) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-10 m-10 pt-20 mt-10">
          <div className="text-center">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-10 m-10 pt-20 mt-10">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div className="container mx-auto px-10 m-10 pt-20 mt-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">내가 작성한 리뷰</h1>
          <p className="text-gray-600">
            총 {myReviews.length}개의 리뷰를 작성하셨습니다.
          </p>
        </div>

        {/* 정렬 및 필터 */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            {["전체", "커트", "펌", "염색", "클리닉"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 rounded-lg ${
                  selectedTab === tab
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="최신순">최신순</option>
            <option value="평점순">평점순</option>
          </select>
        </div>

        {/* 리뷰 목록 */}
        <div className="space-y-4">
          {filteredAndSortedReviews.length > 0 ? (
            filteredAndSortedReviews.map((review) => (
              <div
                key={review.id}
                className="border rounded-lg p-6 bg-white shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <h3 className="text-lg font-semibold">
                          {review.shopName}
                        </h3>
                        <span className="text-gray-500">|</span>
                        <span className="text-gray-600">
                          {review.designerName}
                        </span>
                        <span className="text-gray-500">|</span>
                        <span className="text-gray-600">{review.menuName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDeleteReview(review.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center space-x-1"
                        >
                          <Trash2 size={16} />
                          <span>삭제</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center mb-3">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-5 h-5 ${
                            idx < review.reviewRating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-gray-600">
                        {review.reviewRating.toFixed(1)}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-3 line-clamp-2">
                      {review.reviewContent}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{formatDate(review.createdAt)}</span>
                      {review.reply && (
                        <button
                          onClick={() => openModal(review)}
                          className="text-blue-600 hover:underline"
                        >
                          답글 보기
                        </button>
                      )}
                    </div>
                  </div>

                  {review.reviewImg && review.reviewImg !== "" && (
                    <div className="ml-4 flex-shrink-0">
                      <img
                        src={review.reviewImg}
                        alt="리뷰 이미지"
                        className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                        onClick={() => openModal(review)}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">작성한 리뷰가 없습니다.</p>
            </div>
          )}
        </div>

        {/* 리뷰 상세 모달 */}
        {selectedReview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">리뷰 상세</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-semibold">
                    {selectedReview.shopName}
                  </h3>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-600">
                    {selectedReview.designerName}
                  </span>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-600">
                    {selectedReview.menuName}
                  </span>
                </div>

                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-5 h-5 ${
                        idx < selectedReview.reviewRating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">
                    {selectedReview.reviewRating.toFixed(1)}
                  </span>
                </div>

                <p className="text-gray-700 whitespace-pre-wrap">
                  {selectedReview.reviewContent}
                </p>

                {selectedReview.reviewImg &&
                  selectedReview.reviewImg !== "" && (
                    <img
                      src={selectedReview.reviewImg}
                      alt="리뷰 이미지"
                      className="w-full max-w-md mx-auto rounded-lg"
                    />
                  )}

                {selectedReview.reply && (
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">매장 답글</h4>
                    <p className="text-gray-700">
                      {selectedReview.reply.content}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      {formatDate(selectedReview.reply.createdAt)}
                    </p>
                  </div>
                )}

                <div className="text-sm text-gray-500">
                  작성일: {formatDate(selectedReview.createdAt)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
