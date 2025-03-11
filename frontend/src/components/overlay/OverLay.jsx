import React from "react";

export const Overlay = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose} // 직접 onClose 호출
    >
      {React.cloneElement(children, {
        onClick: (e) => e.stopPropagation(), // 모든 자식 요소에 stopPropagation 추가
      })}
    </div>
  );
};

export default Overlay;
