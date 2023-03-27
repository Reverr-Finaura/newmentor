import { configureStore } from "@reduxjs/toolkit";
import phnSidebarReducer from "../features/phnSidebarSlice";

export const store = configureStore({
  reducer: {
    phnSidebar: phnSidebarReducer,
  },
});
