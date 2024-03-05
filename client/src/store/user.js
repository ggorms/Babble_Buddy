import axios from "axios";

const BASE_URL = "https://babble-buddy.onrender.com";

const GET_ALL_USERS = "GET_ALL_USERS";
const GET_SINGLE_USER = "GET_SINGLE_USER";
const USER_FOLLWING_LIST = "USER_FOLLOWING_LIST";
const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";

const allUsers = (users) => ({
  type: GET_ALL_USERS,
  payload: users,
});

const singleUser = (user) => ({
  type: GET_SINGLE_USER,
  payload: user,
});

const userFollowingList = (users) => ({
  type: USER_FOLLWING_LIST,
  payload: users,
});

const followUser = (user) => ({
  type: FOLLOW_USER,
  payload: user,
});

const unfollowUser = (user) => ({
  type: UNFOLLOW_USER,
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

export const userFollowingListThunk = (id) => async (dispatch) => {
  try {
    const { data: users } = await axios.get(
      `${BASE_URL}/api/users/following/${id}`
    );
    return dispatch(userFollowingList(users));
  } catch (error) {
    console.error(error);
  }
};

export const followUserThunk = (relationship) => async (dispatch) => {
  const { userId, followingId } = relationship;
  try {
    const { data: user } = await axios.post(
      `${BASE_URL}/api/users/follow/${userId}/${followingId}`
    );
    return dispatch(followUser(user));
  } catch (error) {
    console.error(error);
  }
};

export const unfollowUserThunk = (relationship) => async (dispatch) => {
  const { userId, followingId } = relationship;
  try {
    const { data } = await axios.delete(
      `${BASE_URL}/api/users/unfollow/${userId}/${followingId}`
    );
    return dispatch(unfollowUser(data));
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  allUsers: [],
  singleUser: {},
  userFollowingList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, allUsers: action.payload };
    case GET_SINGLE_USER:
      return { ...state, singleUser: action.payload };
    case USER_FOLLWING_LIST:
      return { ...state, userFollowingList: action.payload };
    case FOLLOW_USER:
      return { ...state, userFollowingList: action.payload };
    case UNFOLLOW_USER:
      return { ...state, userFollowingList: action.payload };
    default:
      return state;
  }
}
