import { useState } from "react";
import { MenuButton } from "./MenuButton";
import { Overlay } from "./Overlay";
import { Sidebar } from "./SideBar";

//버튼 클릭 시 사이드바를 나타내는 역할을 하는 컴포넌트

export const SlideMenu = () => {
  //useState로 Open상태 수정
  const [isOpen, setIsOpen] = useState(false);

  // 메뉴의 온오프를 결정하는 함수 2종
  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <MenuButton onClick={openMenu} />
      <Overlay isOpen={isOpen} onClose={closeMenu} />
      <Sidebar isOpen={isOpen} onClose={closeMenu} />
    </>
  );
};

export default SlideMenu;
