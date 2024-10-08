import React, { createContext, useContext, useState } from "react";

// Filtre Context'ini oluştur
const FilterContext = createContext();

// Filtre Context'ini kullanmak için özel bir kanca
export const useFilter = () => useContext(FilterContext);

// Filtre Sağlayıcısı
export const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState("");

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};
