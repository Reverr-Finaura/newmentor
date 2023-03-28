import { configureStore } from "@reduxjs/toolkit";
import phnSidebarReducer from "../features/phnSidebarSlice";
import userDocReducer from "../features/userDocSlice"

export const store = configureStore({
  reducer: {
    phnSidebar: phnSidebarReducer,
    userDoc:userDocReducer,
  },
});
