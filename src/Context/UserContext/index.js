import React, { createContext, useContext, useState } from "react";

// Kullanıcı Context'ini oluştur
const UserContext = createContext();

// Kullanıcı Context'ini kullanmak için özel bir kanca
export const useUser = () => useContext(UserContext);

// Kullanıcı Sağlayıcısı
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
