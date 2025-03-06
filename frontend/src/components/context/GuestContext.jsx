// UserContext.jsx 생성
import { createContext, useState } from "react";

export const GuestContext = createContext();

export const GuestProvider = ({ children }) => {
  const [guestInfo, setGuestInfo] = useState({
    birthDate: "",
    email: "",
    password: "",
    passwordCheck: "",
    phoneNumber: "",
    userName: "",
  });

  return (
    <GuestContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </GuestContext.Provider>
  );
};
