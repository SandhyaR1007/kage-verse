import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../app/features/postsSlice";
import usersReducer from "../app/features/usersSlice";
import authReducer from "../app/features/authSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    auth: authReducer,
  },
});
