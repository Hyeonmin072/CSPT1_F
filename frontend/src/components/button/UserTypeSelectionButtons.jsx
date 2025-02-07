import React from "react";

{/* 역할 선택 버튼 */}
export default function UserTypeSelectionButtons () {
    return (
    <div className="flex space-x-2 mt-8">
        <button
            className="bg-teal-900 text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-black shadow-md shadow-gray-700">사장이에요
        </button>
        <button
            className="bg-teal-900 text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-black shadow-md shadow-gray-700">손님이에요
        </button>
        <button
            className="bg-teal-900 text-white text-sm font-bold px-6 py-2.5  rounded-xl hover:bg-black shadow-md shadow-gray-700">디자이너에요
        </button>
    </div>
    );
}