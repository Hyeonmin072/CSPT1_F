import { Mail } from "lucide-react";
import { useContext } from "react";
import { GuestContext } from "../../context/GuestContext";

export default function Email() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  const handleChange = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      email: e.target.value, // birthDate -> businessNumber로 수정
    }));
  };

  return (
    <div className="flex items-center mb-3 border rounded-lg">
      <Mail size={30} color="black" className="mr-1 ml-4" />
      <input
        type="text"
        placeholder="이메일"
        className="w-full pt-3 pb-3 pl-1 border-none rounded-lg focus:outline-none placeholder-gray-700 font-bold"
        value={userInfo.email}
        onChange={handleChange}
      />
    </div>
  );
}
