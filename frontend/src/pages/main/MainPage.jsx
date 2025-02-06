import MainBottomAd from "../../components/layout/MainBottomAd";
import ShopPage from "../../components/common/Shop";
export default function MainPage() {
  return (
    <div>
      {/* 메인 컨텐츠 */}
      <ShopPage />
      <div className="flex justify-center -mt-1">
        <div className="max-w-3xl w-full px-4">
          <MainBottomAd height={150} className="bg-gray-50">
            <div>커스텀 광고 내용</div>
          </MainBottomAd>
        </div>
      </div>
    </div>
  );
}
