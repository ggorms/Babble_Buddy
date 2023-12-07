import axios from "axios";

const BASE_URL = "http://localhost:8080";

const GET_ALL_USERS = "GET_ALL_USERS";
const GET_SINGLE_USER = "GET_SINGLE_USER";

const allUsers = (users) => ({
  type: GET_ALL_USERS,
  payload: users,
});

const singleUser = (user) => ({
  type: GET_SINGLE_USER,
  payload: user,
});

export const allUsersThunk = () => async (dispatch) => {
  try {
    const { data: users } = await axios.get(`${BASE_URL}/api/users`);
    return dispatch(allUsers(users));
  } catch (error) {
    console.error(error);
  }
};

export const singleUserThunk = (id) => async (dispatch) => {
  try {
    const { data: user } = await axios.get(`${BASE_URL}/api/users/${id}`);
    return dispatch(singleUser(user));
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  allUsers: [],
  singleUser: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, allUsers: action.payload };
    case GET_SINGLE_USER:
      return { ...state, singleUser: action.payload };
    default:
      return state;
  }
}
