import axios from "axios";

const BASE_URL = "https://babble-buddy-server.onrender.com";

const NEW_MESSAGE = "NEW_MESSAGE";
const CONVERSATION_MESSAGES = "CONVERSATION_MESSAGES";

const newMessage = (message) => ({
  type: NEW_MESSAGE,
  payload: message,
});

const conversationMessages = (messages) => ({
  type: CONVERSATION_MESSAGES,
  payload: messages,
});

export const newMessageThunk = (message) => async (dispatch) => {
  try {
    const { text, conversationId, senderId } = message;
    const { data } = await axios.post(`${BASE_URL}/api/message/new`, {
      text,
      conversationId,
      senderId,
    });
    return dispatch(newMessage(data));
  } catch (error) {
    console.error(error);
  }
};

export const conversationMessagesThunk = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/message/${id}`);
    return dispatch(conversationMessages(data));
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  newMessage: {},
  conversationMessages: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NEW_MESSAGE:
      return { ...state, newMessage: action.payload };
    case CONVERSATION_MESSAGES:
      return { ...state, conversationMessages: action.payload };
    default:
      return state;
  }
}
