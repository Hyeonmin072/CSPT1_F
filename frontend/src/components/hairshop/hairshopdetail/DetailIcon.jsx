import { MapPin, PhoneCall, Link, Star } from "lucide-react";

export default function DetailIcon({ shopData }) {
  // 별점 계산 및 렌더링 함수
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star
            key={i}
            className="w-4 h-4 fill-yellow-400/50 text-yellow-400"
          />
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  // 주소 줄바꿈 처리
  const formatAddress = (address) => {
    if (!address) return "";
    const parts = address.split(" ");
    const firstLine = parts.slice(0, 2).join(" "); // 시/도 + 구/군
    const secondLine = parts.slice(2).join(" "); // 나머지 상세주소
    return (
      <>
        <span>{firstLine}</span>
        <br />
        <span>{secondLine}</span>
      </>
    );
  };

  return (
    <div className="p-5 flex gap-20 mb-5 items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="flex gap-0.5">{renderStars(shopData.shopRating)}</div>
        <p className="mt-2 font-semibold">{shopData.shopRating.toFixed(1)}</p>
        <p className="text-sm text-gray-500">평점</p>
      </div>
      <div className="flex flex-col items-center">
        <MapPin className="w-6 h-6" />
        <p className="mt-2 font-semibold text-center text-sm min-h-[40px] w-[140px]">
          {formatAddress(shopData.shopAddress)}
        </p>
        <p className="text-sm text-gray-500">위치</p>
      </div>
      <div className="flex flex-col items-center">
        <PhoneCall className="w-6 h-6" />
        <p className="mt-2 font-semibold">{shopData.shopTel}</p>
        <p className="text-sm text-gray-500">전화</p>
      </div>
      <div className="flex flex-col items-center">
        <Link className="w-6 h-6" />
        <p className="mt-2 font-semibold">{shopData.shopReviewCount}</p>
        <p className="text-sm text-gray-500">리뷰</p>
      </div>
    </div>
  );
}
