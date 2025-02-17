// UserContext.jsx 생성
import { createContext, useState } from "react";

export const DesignerContext = createContext();

export const DesignerProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    birthDate: "",
    email: "",
    password: "",
    passwordCheck: "",
    phoneNumber: "",
    userName: "",
  });

  return (
    <DesignerContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </DesignerContext.Provider>
  );
};
