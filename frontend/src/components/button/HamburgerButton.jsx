import { Menu, X } from "lucide-react";

//eslint-disable-next-line
const HamburgerButton = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
      aria-label="메뉴 열기"
    >
      {isOpen ? (
        <X className="w-6 h-6 text-gray-600" />
      ) : (
        <Menu className="w-6 h-6 text-gray-600" />
      )}
    </button>
  );
};

export default HamburgerButton;
