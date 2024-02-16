import { combineReducers, configureStore } from "@reduxjs/toolkit";

import postReducer from "../reducers/post";

const chiefReducer = combineReducers({
  post: postReducer,
});

const store = configureStore({
  reducer: chiefReducer,
});

export default store;
