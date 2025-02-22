import { configureStore } from "@reduxjs/toolkit";
import posts from "./PostsSlice";
import Auth from "./AuthSlice";
const Store = configureStore({
  reducer: {
    posts,
    Auth,
  },
});
export default Store;
