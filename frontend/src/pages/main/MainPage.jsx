import MainLogo from "../../components/layout/MainLogo";
import IconGrid from "../../components/layout/IconGrid";
import MainRLSpace from "../../components/layout/MainRLSpace";
import MainBottomAd from "../../components/layout/MainBottomAd";
// import mainBg from "../../assets/main_bg.jpg";

export default function MainPage() {
  return (
    <div className="h-[700px]">
      <div className="grid grid-cols-12 gap-4">
        {/* 왼쪽 여백 */}
        <MainRLSpace position="left" />

        {/* 메인 컨텐츠 */}
        <div className="col-span-12 lg:col-span-8 px-4">
          <MainLogo />
          <IconGrid />
          <MainBottomAd height={150} className="bg-gray-50">
            <div>커스텀 광고 내용</div>
          </MainBottomAd>
        </div>

        {/* 오른쪽 여백 */}
        <MainRLSpace position="right" />
      </div>
    </div>
  );
}
