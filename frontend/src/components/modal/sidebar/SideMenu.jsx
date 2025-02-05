import { useState } from "react";
import { MenuButton } from "./MenuButton";
import { Overlay } from "./Overlay";
import { Sidebar } from "./SideBar";

export const SlideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

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
