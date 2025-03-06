import React from "react";

// 화살표 함수로 올바르게 정의
export const Overlay = ({ isOpen, onClose, children }) => {
  // 함수 내부에서 return을 사용
  return isOpen ? (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-30 !m-0"
        onClick={onClose}
        aria-hidden="true"
      />
      {children && (
        <div className="fixed inset-0 flex items-center justify-center z-40 !m-0">
          {children}
        </div>
      )}
    </>
  ) : null;
};

export default Overlay;
