import { User } from "lucide-react";
import { useContext } from "react";
import { BossContext } from "../../context/BossContext";
//나중에 BossContext로 변경경

export default function BusinessNumber() {
  const { userInfo, setUserInfo } = useContext(BossContext);

  const handleChange = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      businessNumber: e.target.value,
    }));
  };

  return (
    <div className="flex items-center mb-3 border rounded-lg">
      <User size={30} color="black" className="mr-1 ml-4" />
      <input
        type="number"
        placeholder="사업자등록번호"
        className="w-full pt-3 pb-3 pl-1 border-none rounded-lg focus:outline-none placeholder-gray-700 font-bold"
        value={userInfo.businessNumber || ""} // value 추가
        onChange={handleChange} // onChange 추가
      />
    </div>
  );
}
