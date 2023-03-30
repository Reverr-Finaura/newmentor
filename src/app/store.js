import { configureStore } from "@reduxjs/toolkit";
import phnSidebarReducer from "../features/phnSidebarSlice";
import userDocReducer from "../features/userDocSlice"
import userReducer from "../features/userSlice";
import newUserReducer from "../features/newUserSlice";
import chatSliceReducer from "../features/chatSlice"
import reDeploySliceReducer from "../features/reDeploySlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    newUser: newUserReducer,
    phnSidebar: phnSidebarReducer,
    userDoc:userDocReducer,
    chat:chatSliceReducer,
    deploy:reDeploySliceReducer
  },
});
