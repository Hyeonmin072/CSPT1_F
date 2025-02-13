import { Calendar } from "lucide-react";

export default function Birth() {
  return (
    <div className="flex items-center mb-3 border rounded-lg">
      <Calendar size={30} color="black" className="mr-1 ml-4" />
      <input
        type="number"
        placeholder="생년월일"
        className="w-full pt-3 pb-3 pl-1 border-none rounded-lg focus:outline-none placeholder-gray-700 font-bold"
      />
    </div>
  );
}
