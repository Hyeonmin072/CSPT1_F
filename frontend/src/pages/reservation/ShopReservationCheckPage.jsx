import BusinessHeader from "../../components/common/BusinessHeader.jsx";
import ShopReservation from "../../components/businessabout/reservation/ShopReservation.jsx";
export default function ShopReservationCheckPage(){
    const [searchParams] = useSearchParams();
    const success = searchParams.get('success'); // true or false 읽어옴
  
    return (
      <div>
        <BusinessHeader />
        <div className="p-4">
          {success === "true" ? (
            <div className="text-green-600 font-bold text-xl mb-4">예약이 완료되었습니다 🎉</div>
          ) : (
            <div className="text-red-600 font-bold text-xl mb-4">결제에 실패했습니다 😢 다시 시도해주세요.</div>
          )}
          <ShopReservation />
        </div>
      </div>
    );
    // 추가로 메인 페이지 이동 버튼 필요
}