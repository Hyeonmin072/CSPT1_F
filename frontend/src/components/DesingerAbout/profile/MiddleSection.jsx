import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { formatDistanceToNow, differenceInDays } from "date-fns"; // 날짜 계산용 라이브러리
import { ko } from "date-fns/locale"; // 한국어 로컬 설정

import designerEX from "../../../assets/hairshop/designerEX.jpg";
import RW from "../../../assets/reviews/RW.jpg";

export default function MiddleSection({ reviewData = [] }) {
  const [reviews, setReviews] = useState([]); // 리뷰 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 더미 데이터
  const dummyReviews = [
    {
      id: 1,
      name: "문지훈",
      rating: 5,
      comment: "정말 최고의 디자이너예요!",
      date: "2025-04-01", // 리뷰 작성 날짜
    },
    {
      id: 2,
      name: "김민수",
      rating: 4,
      comment: "서비스도 훌륭하고 만족했습니다.",
      date: "2025-04-02", // 리뷰 작성 날짜
    },
  ];

  // 데이터 가져오기
  useEffect(() => {
    // props로 리뷰 데이터가 전달되었으면 그것을 사용
    if (reviewData && reviewData.length > 0) {
      // 전달받은 리뷰 데이터의 형태를 맞춤
      const formattedReviews = reviewData.map((review, index) => ({
        id: index + 1,
        name: review.userName || "익명",
        rating: review.reviewRating || 0,
        comment: review.reviewContent || "내용 없음",
        date: new Date().toISOString().split("T")[0], // 현재 날짜로 설정
        menuName: review.menuName || "",
        // 리뷰 이미지가 빈 문자열이면 null로 설정하여 기본 이미지를 표시하지 않도록 함
        reviewImage:
          review.reviewImage && review.reviewImage.trim() !== ""
            ? review.reviewImage
            : null,
      }));
      setReviews(formattedReviews);
      setLoading(false);
    } else {
      // 전달받은 리뷰 데이터가 없으면 더미 데이터를 사용
      try {
        const data = dummyReviews;
        setReviews(
          data.filter(
            (review) =>
              differenceInDays(new Date(), new Date(review.date)) <= 14 // 2주(14일) 이내 리뷰만 필터링
          )
        );
      } catch (error) {
        console.error("Error processing reviews:", error);
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    }
  }, [reviewData]);

  // 중앙 섹션 관련 슬라이더 설정
  const sliderSettings = {
    dots: true,
    infinite: reviews.length > 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
        onClick={onClick}
      >
        <button className="p-2 rounded">〉</button>
      </div>
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
        onClick={onClick}
      >
        <button className="p-2 rounded">〈</button>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center mt-10">로딩 중...</div>; // 로딩 상태 표시
  }

  if (reviews.length === 0) {
    return <div className="text-center mt-10">최근 리뷰가 없습니다.</div>; // 리뷰가 없는 경우 표시
  }

  return (
    <>
      <h2 className="text-xl font-bold flex flex-col justify-center mb-4">
        최근 리뷰
      </h2>
      <Slider {...sliderSettings} className="mt-4 h-full">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-gray-100 p-3 rounded-lg h-[330px] flex flex-col slick-slide"
          >
            {/* Header */}
            <div className="flex items-center border-b-2 pb-2 mb-4 gap-3">
              <img
                src={designerEX}
                alt="Designer Banner"
                className="w-20 h-20 object-cover rounded-full"
              />
              <div>
                <p className="text-lg font-semibold">{review.name}</p>
                <p className="text-yellow-500">
                  {"★".repeat(Math.floor(review.rating))}
                  {"☆".repeat(5 - Math.floor(review.rating))}
                </p>
                {review.menuName && (
                  <p className="text-gray-600 text-sm">
                    메뉴: {review.menuName}
                  </p>
                )}
                <p className="text-gray-500 text-sm">
                  {review.date
                    ? formatDistanceToNow(new Date(review.date), {
                        addSuffix: true,
                        locale: ko,
                      })
                    : "최근"}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-grow">
              {/* Image Section - 이미지가 없는 경우 텍스트 중심 레이아웃으로 변경 */}
              {review.reviewImage ? (
                // 이미지가 있는 경우 기존 레이아웃
                <>
                  <div className="w-1/2 h-full flex items-center justify-center">
                    <img
                      src={review.reviewImage}
                      alt="리뷰 이미지"
                      className="h-[200px] object-cover"
                    />
                  </div>
                  <div className="w-1/2 h-full flex items-center">
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </>
              ) : (
                // 이미지가 없는 경우 텍스트 중심 레이아웃
                <div className="w-full h-full flex items-center justify-center p-4">
                  <p className="text-gray-700 text-lg">{review.comment}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
}
