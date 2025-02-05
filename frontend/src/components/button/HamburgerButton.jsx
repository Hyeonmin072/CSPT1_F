import { Menu, X } from "lucide-react";
import { useState } from "react";

const HamburgerButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
      aria-label="메뉴 버튼"
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
