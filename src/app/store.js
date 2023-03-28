import { configureStore } from "@reduxjs/toolkit";
import phnSidebarReducer from "../features/phnSidebarSlice";
import userDocReducer from "../features/userDocSlice"
import userReducer from "../features/userSlice";
import newUserReducer from "../features/newUserSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    newUser: newUserReducer,
    phnSidebar: phnSidebarReducer,
    userDoc:userDocReducer,
  },
});
