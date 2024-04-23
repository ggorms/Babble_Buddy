import axios from "axios";
import { BASE_URL } from "./BASE_URL";

const TOKEN = "token";

const USER = "USER";
const ERROR = "ERROR";

const setUser = (userInfo) => ({
  type: USER,
  payload: userInfo,
});

const errorHandler = (err) => ({
  type: ERROR,
  payload: err,
});

export const registerThunk = (credentials) => async (dispatch) => {
  try {
    const { email, password, fName, lName } = credentials;
    const { data: user } = await axios.post(`${BASE_URL}/auth/register`, {
      email,
      password,
      fName,
      lName,
    });

    window.localStorage.setItem(TOKEN, user.token);
    return dispatch(me());
  } catch (error) {
    return dispatch(errorHandler(error.response.data.message));
  }
};

export const loginThunk = (credentials) => async (dispatch) => {
  try {
    const { email, password } = credentials;
    const { data: user } = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });

    window.localStorage.setItem(TOKEN, user.token);
    return dispatch(me());
  } catch (error) {
    return dispatch(errorHandler(error.response.data.message));
  }
};

export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const { data: user } = await axios.get(`${BASE_URL}/auth/me`, {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setUser(user));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  return {
    type: USER,
    payload: {},
  };
};

const initialState = {
  user: {},
  authError: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER:
      return { ...state, user: action.payload };
    case ERROR:
      return { ...state, authError: action.payload };
    default:
      return state;
  }
}
