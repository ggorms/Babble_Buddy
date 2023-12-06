import axios from "axios";

const BASE_URL = "http://localhost:8080";

const REGISTER = "REGISTER";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const register = (user) => ({
  type: REGISTER,
  payload: user,
});

const login = (token) => ({
  type: LOGIN,
  payload: token,
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

export const loginThunk = (credentials) => async (dispatch) => {
  try {
    const { email, password } = credentials;
    const { data } = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });

    const token = data;

    if (!sessionStorage.getItem("token")) {
      sessionStorage.setItem("token", token);
    }

    return dispatch(login(token));
  } catch (error) {
    console.error(error);
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
      }
    }

    return dispatch(register(token));
  } catch (error) {
    console.error(error);
  }
};

export const logoutThunk = () => async (dispatch) => {
  if (sessionStorage.getItem("token")) {
    sessionStorage.removeItem("token");
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
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return { ...state, user: action.payload };
    case LOGIN:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
