// import { combineReducers, applyMiddleware, createStore } from "redux";
// import { createLogger } from "redux-logger";
// import { thunk } from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import authReducer from "./auth.js";

// const reducer = combineReducers({
//   auth: authReducer,
// });

// const middleWare = composeWithDevTools(
//   applyMiddleware(thunk, createLogger({ collapsed: true }))
// );

// const store = createStore(reducer, middleWare);

// export default store;

import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
