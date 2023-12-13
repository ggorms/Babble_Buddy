import axios from "axios";

const BASE_URL = "http://localhost:8080";

const NEW_CONVERSATION = "NEW_CONVERSATION";
const USER_CONVERSATIONS = "USER_CONVERSATIONS";

const newConversation = (conversation) => ({
  type: NEW_CONVERSATION,
  payload: conversation,
});

const userConversations = (conversations) => ({
  type: USER_CONVERSATIONS,
  payload: conversations,
});

export const newConversationThunk = (members) => async (dispatch) => {
  try {
    const { senderId, receiverId } = members;
    const { data } = await axios.post(`${BASE_URL}/api/conversation/new`, {
      senderId,
      receiverId,
    });
    return dispatch(newConversation(data));
  } catch (error) {
    console.error(error);
  }
};

export const userConversationsThunk = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/conversation/${id}`);
    return dispatch(userConversations(data));
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  newConversation: {},
  userConversations: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NEW_CONVERSATION:
      return { ...state, newConversation: action.payload };
    case USER_CONVERSATIONS:
      return { ...state, userConversations: action.payload };
    default:
      return state;
  }
}
