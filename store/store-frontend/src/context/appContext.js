import React, { useContext, useReducer } from "react";
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
} from "./action";
import reducer from "./reducer";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(currentUser),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }
      const data = await response.json();
      const { user, token } = data;
      dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token } });
      addUserToLocalStorage({ user, token });
      clearAlert();
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR, payload: { msg: error.message } });
    }
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(currentUser),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      const data = await response.json();
      const { user, token } = data;
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, token } });
      addUserToLocalStorage({ user, token });
      clearAlert();
    } catch (error) {
      dispatch({ type: LOGIN_USER_ERROR, payload: { msg: error.message } });
    }
  };

  return (
    <AppContext.Provider value={{ ...state, displayAlert, registerUser, loginUser, removeUserFromLocalStorage }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
