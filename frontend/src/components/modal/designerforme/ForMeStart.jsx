import React from "react";
import { X } from "lucide-react";

const ForMeStart = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 pointer-events-auto">
      <div className="bg-white rounded-lg w-96 relative pointer-events-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <h2 className="text-center text-xl font-medium mb-4">
            나만의 디자이너 찾기
          </h2>
          <p className="text-center text-gray-600 text-sm mb-6">
            해당 사진이 마음에 든다면 오른쪽으로,
            <br />
            마음에 들지 않는다면 왼쪽으로
            <br />
            넘겨주세요
          </p>
          <button
            onClick={onClose}
            className="w-full py-2 text-teal-500 hover:text-teal-600 text-sm font-medium"
          >
            이해했어요
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForMeStart;
