import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  userInfo: { name: "Kerim", surName: "Ataşen" },
  filter: { name: "filtre1", surName: "filtre2" },
};

// Eylem türleri
const ACTIONS = {
  SET_USER_INFO: "SET_USER_INFO",
  SET_FILTER: "SET_FILTER",
};

// Reducer fonksiyonu
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER_INFO:
      return { ...state, userInfo: action.payload };
    case ACTIONS.SET_FILTER:
      return { ...state, filter: action.payload };

    default:
      return state;
  }
};

// Ana Context
const AppContext = createContext();

// Kullanıcı ve Filtre için özel kanca
export const useAppContext = () => useContext(AppContext);

export const MainProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Kullanıcı bilgisi güncelleme fonksiyonu
  const setUserInfo = (userInfo) => {
    dispatch({ type: ACTIONS.SET_USER_INFO, payload: userInfo });
  };

  // Filtre güncelleme fonksiyonu
  const setFilter = (filter) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: filter });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setUserInfo,
        setFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
