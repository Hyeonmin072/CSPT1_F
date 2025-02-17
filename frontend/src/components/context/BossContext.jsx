// UserContext.jsx 생성
import { createContext, useState } from "react";

export const BossContext = createContext();

export const BossProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    birthDate: "",
    businessNumber: "",
    email: "",
    password: "",
    passwordCheck: "",
    phoneNumber: "",
    userName: "",
  });

  return (
    <BossContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </BossContext.Provider>
  );
};
