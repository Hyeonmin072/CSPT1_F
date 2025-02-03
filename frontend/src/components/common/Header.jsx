import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";

export default function Header() {
  return (
    // 상단바
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="leading-[0.85]">
            <h1 className="text-[26px] font-[900] font-sans">HAIRISM</h1>
            <span className="text-[13px] text-black font-[700] flex justify-center">
              My Hair Partner
            </span>
          </div>
          <nav className="flex space-x-8 gap-[60px] font-bold">
            {/* # 부분을 눌럿을 때 넘어가는 페이지로 조정 */}
            <a href="#" className="text-gray-700">
              홈
            </a>
            <a href="#" className="text-gray-700">
              헤어샵
            </a>
            <a href="#" className="text-gray-700">
              디자이너
            </a>
            <a href="#" className="text-gray-700">
              채팅
            </a>
          </nav>
          <div className="flex space-x-4">
            {/* 회원 가입 버튼 */}
            <RegisterButton />
            {/* 로그인 버튼 */}
            <LoginButton />
          </div>
        </div>
      </div>
    </header>
  );
}
