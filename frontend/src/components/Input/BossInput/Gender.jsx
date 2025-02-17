import { UserCircle } from "lucide-react";
import { useContext } from "react";
import { BossContext } from "../../context/BossContext";

export default function Gender() {
  const { userInfo, setUserInfo } = useContext(BossContext);

  const handleGenderChange = (gender) => {
    setUserInfo((prev) => ({
      ...prev,
      gender: gender,
    }));
  };

  return (
    <div className="flex items-center mb-3 border rounded-lg">
      <UserCircle size={30} color="black" className="mr-1 ml-4" />
      <div className="flex w-full pt-3 pb-3 pl-1">
        <label className="flex items-center mr-6 cursor-pointer">
          <input
            type="radio"
            name="gender"
            value="male"
            checked={userInfo.gender === "male"}
            onChange={() => handleGenderChange("male")}
            className="mr-2"
          />
          <span className="font-bold text-gray-700">남성</span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="gender"
            value="female"
            checked={userInfo.gender === "female"}
            onChange={() => handleGenderChange("female")}
            className="mr-2"
          />
          <span className="font-bold text-gray-700">여성</span>
        </label>
      </div>
    </div>
  );
}
