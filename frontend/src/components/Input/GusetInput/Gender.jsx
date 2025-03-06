import { UserCircle } from "lucide-react";
import { useContext } from "react";
import { GusetContext } from "../../context/GuestContext";

export default function Gender() {
  const { userInfo, setUserInfo } = useContext(GusetContext);

  const handleGenderChange = (gender) => {
    setUserInfo((prev) => ({
      ...prev,
      gender: gender,
    }));
  };

  return (
    <div className="flex items-center mb-3 border rounded-lg">
      <UserCircle size={30} color="black" className="mr-1 ml-4" />
      <div className="flex w-full p-2 gap-4">
        <button
          type="button"
          onClick={() => handleGenderChange("male")}
          className={`flex-1 py-2 px-4 rounded-lg font-bold transition-colors duration-200 ${
            userInfo.gender === "male"
              ? "bg-teal-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          남성
        </button>
        <button
          type="button"
          onClick={() => handleGenderChange("female")}
          className={`flex-1 py-2 px-4 rounded-lg font-bold transition-colors duration-200 ${
            userInfo.gender === "female"
              ? "bg-teal-500 text-white"
              : "bg--200 text-gray-700"
          }`}
        >
          여성
        </button>
      </div>
    </div>
  );
}
