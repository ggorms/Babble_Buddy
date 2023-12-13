import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth.js";
import userReducer from "./user.js";
import conversationReducer from "./conversation.js";
import messageReducer from "./message.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    conversation: conversationReducer,
    message: messageReducer,
  },
});

export default store;
