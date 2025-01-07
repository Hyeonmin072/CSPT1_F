import MainLogo from "../../components/layout/MainLogo";
import IconGrid from "../../components/layout/IconGrid";
import mainBg from "../../assets/main_bg.jpg";

export default function MainPage() {
  return (
    <div
      className="h-[700px]" // flex-1로 헤더/푸터 사이 공간 차지
      style={{
        backgroundImage: `url(${mainBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <MainLogo />
        <IconGrid />
      </div>
    </div>
  );
}
