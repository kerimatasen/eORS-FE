import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || {
    email: "",
    userInfo: "",
  },
  filter: { name: "filtre1", surName: "filtre2" },
  loading: false,
};

// Eylem türleri
const ACTIONS = {
  SET_LOGIN: "SET_LOGIN",
  SET_LOGOUT: "SET_LOGOUT",
  SET_USER_INFO: "SET_USER_INFO",
  SET_FILTER: "SET_FILTER",
  LOGOUT: "LOGOUT",
  SET_LOADING: "SET_LOADING",
};

// Reducer fonksiyonu
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER_INFO:
      return { ...state, userInfo: action.payload };
    case ACTIONS.SET_FILTER:
      return { ...state, filter: action.payload };
    case ACTIONS.LOGOUT:
      return { ...state, userInfo: null };
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

// Ana Context
const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const MainProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    const expiryTime = localStorage.getItem("expiryTime");

    // Eğer saklanan bilgi varsa, süresi dolmadıysa ve email bilgisi varsa kullanıcıyı ayarlayın
    if (
      storedUserInfo &&
      expiryTime &&
      new Date().getTime() < expiryTime &&
      storedUserInfo.email // email bilgisi kontrolü
    ) {
      dispatch({ type: ACTIONS.SET_USER_INFO, payload: storedUserInfo });
    } else {
      // Süresi dolmuşsa veya email bilgisi yoksa çıkış yap
      dispatch({ type: ACTIONS.LOGOUT });
      localStorage.removeItem("userInfo");
      localStorage.removeItem("expiryTime");
      navigate("/");
    }
  }, []);

  const setUserInfo = (userInfo) => {
    dispatch({ type: ACTIONS.SET_USER_INFO, payload: userInfo });
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("expiryTime", new Date().getTime() + 3600000); // 1 saat sonra sonlanma süresi
  };

  const setFilter = (values) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: values });
  };

  const setLoading = (values) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: values });
  };
  return (
    <AppContext.Provider
      value={{
        state,
        setUserInfo,
        setFilter,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
