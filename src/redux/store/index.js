import { combineReducers, configureStore } from "@reduxjs/toolkit";

import postReducer from "../reducers/post";
import loginReducer from "../reducers/login";

const chiefReducer = combineReducers({
  post: postReducer,
  login: loginReducer,
});

const store = configureStore({
  reducer: chiefReducer,
});

export default store;
