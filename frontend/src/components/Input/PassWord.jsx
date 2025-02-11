import {LuLockKeyhole} from "react-icons/lu";

export default function PassWord() {
    return (
        <div className="flex items-center mb-3 border rounded-lg">
            <LuLockKeyhole size={30} color="black" className="mr-1 ml-4"/>
            <input type="text"
                   placeholder="비밀번호"
                   className="w-full pt-3 pb-3 pl-1 border-none rounded-lg focus:outline-none placeholder-gray-700 font-bold"/>
        </div>
    );
};