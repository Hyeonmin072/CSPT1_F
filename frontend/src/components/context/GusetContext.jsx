// UserContext.jsx 생성
import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    birthDate: "",
    email: "",
    password: "",
    passwordCheck: "",
    phoneNumber: "",
    userName: "",
  });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
