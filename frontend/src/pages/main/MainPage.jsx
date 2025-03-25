import MainBottomAd from "../../components/layout/MainBottomAd";
import ShopData from "../../components/common/ShopData";
import Header from "../../components/common/Header";
export default function MainPage() {
  return (
    <div>
      <Header />

      {/* 메인 컨텐츠 */}
      <ShopData />
      <div className="flex justify-center -mt-1">
        <div className="max-w-3xl w-full px-4">
          {/* AD 컴포넌트 */}
          <MainBottomAd height={150} className="bg-gray-50">
            <div>커스텀 광고 내용</div>
          </MainBottomAd>
        </div>
      </div>
    </div>
  );
}
