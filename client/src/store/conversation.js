import axios from "axios";

const BASE_URL = "https://babble-buddy-server.onrender.com";

const NEW_CONVERSATION = "NEW_CONVERSATION";
const USER_CONVERSATIONS = "USER_CONVERSATIONS";
const USER_AND_FRIEND_CONVERSATION = "USER_AND_FRIEND_CONVERSATION";

const newConversation = (conversation) => ({
  type: NEW_CONVERSATION,
  payload: conversation,
});

const userConversations = (conversations) => ({
  type: USER_CONVERSATIONS,
  payload: conversations,
});

const userAndFriendConversation = (conversation) => ({
  type: USER_AND_FRIEND_CONVERSATION,
  payload: conversation,
});

export const newConversationThunk = (members) => async (dispatch) => {
  try {
    const { senderId, receiverId } = members;
    const { data: conversation } = await axios.post(
      `${BASE_URL}/api/conversation/new`,
      {
        senderId,
        receiverId,
      }
    );
    return dispatch(newConversation(conversation));
  } catch (error) {
    console.error(error);
  }
};

export const userConversationsThunk = (id) => async (dispatch) => {
  try {
    const { data: conversations } = await axios.get(
      `${BASE_URL}/api/conversation/${id}`
    );
    return dispatch(userConversations(conversations));
  } catch (error) {
    console.error(error);
  }
};

export const userAndFriendConversationThunk = (members) => async (dispatch) => {
  const { userId, friendId } = members;
  try {
    const { data: conversation } = await axios.get(
      `${BASE_URL}/api/conversation/find/${userId}/${friendId}`
    );
    return dispatch(userAndFriendConversation(conversation));
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  newConversation: {},
  userConversations: [],
  userAndFriendConversation: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NEW_CONVERSATION:
      return { ...state, newConversation: action.payload };
    case USER_CONVERSATIONS:
      return { ...state, userConversations: action.payload };
    case USER_AND_FRIEND_CONVERSATION:
      return { ...state, userAndFriendConversation: action.payload };
    default:
      return state;
  }
}
