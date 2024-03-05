import axios from "axios";

const BASE_URL = "https://babble-buddy.onrender.com";

const REGISTER = "REGISTER";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const ERROR = "ERROR";

const register = (user) => ({
  type: REGISTER,
  payload: user,
});

const login = (user) => ({
  type: LOGIN,
  payload: user,
});

const logout = (user) => ({
  type: LOGOUT,
  payload: user,
});

const getToken = () => {
  const token = sessionStorage.getItem("token");
  if (token) {
    return token;
  }
  return null;
};

const errorHandle = (err) => ({
  type: ERROR,
  payload: err,
});

export const loginThunk = (credentials) => async (dispatch) => {
  try {
    const { email, password } = credentials;
    const { data } = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });

    const token = data.token;

    if (!sessionStorage.getItem("token")) {
      sessionStorage.setItem("token", JSON.stringify(token));
      sessionStorage.setItem(
        "userInfo",
        JSON.stringify({
          userId: data.id,
          fName: data.fName,
          lName: data.lName,
          email: data.email,
        })
      );
    }

    return dispatch(
      login({
        token,
        userInfo: {
          userId: data.id,
          fName: data.fName,
          lName: data.lName,
          email: data.email,
        },
      })
    );
  } catch (error) {
    dispatch(errorHandle(error.response.data.message));
  }
};

export const registerThunk = (credentials) => async (dispatch) => {
  try {
    const { fName, lName, email, password } = credentials;
    const { data } = await axios.post(`${BASE_URL}/auth/register`, {
      fName,
      lName,
      email,
      password,
    });

    const { token } = data;

    if (!sessionStorage.getItem("token")) {
      {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem(
          "userInfo",
          JSON.stringify({
            userId: data.id,
            fName: data.fName,
            lName: data.lName,
            email: data.email,
          })
        );
      }
    }

    return dispatch(
      register({
        token,
        userInfo: {
          userId: data.id,
          fName: data.fName,
          lName: data.lName,
          email: data.email,
        },
      })
    );
  } catch (error) {
    dispatch(errorHandle(error.response.data.message));
  }
};

export const logoutThunk = () => async (dispatch) => {
  if (sessionStorage.getItem("token")) {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userInfo");
  }
  return dispatch(
    logout({
      token: "",
    })
  );
};

const initialState = {
  user: {
    token: getToken(),
    userInfo: JSON.parse(window.sessionStorage.getItem("userInfo")) || {},
  },
  authError: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return { ...state, user: action.payload };
    case LOGIN:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: action.payload };
    case ERROR:
      return { ...state, authError: action.payload };
    default:
      return state;
  }
}
