import logo from "../../assets/logo/logo.png";

export default function MainLogo() {
  return (
    <div className="flex justify-center">
      <div className="w-[250px] h-[250px] bg-pink-300 rounded-lg shadow-lg mt-10 flex justify-center">
        <img
          src={logo}
          alt="logo"
          className="w-full h-full object-contain p-4" // padding을 주어 여백 확보
        />
      </div>
    </div>
  );
}
