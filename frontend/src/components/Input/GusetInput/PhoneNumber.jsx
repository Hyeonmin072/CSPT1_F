import { Smartphone } from "lucide-react";
import { useContext } from "react";
import { GuestContext } from "../../context/GuestContext";

export default function PhoneNumber() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  const handleChange = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      phoneNumber: e.target.value,
    }));
  };

  return (
    <div className="flex items-center mb-3 border rounded-lg">
      <Smartphone size={30} color="black" className="mr-1 ml-4" />
      <input
        type="number"
        placeholder="연락처"
        className="w-full pt-3 pb-3 pl-1 border-none rounded-lg focus:outline-none placeholder-gray-700 font-bold"
        value={userInfo.phoneNumber || ""}
        onChange={handleChange}
      />
    </div>
  );
}
