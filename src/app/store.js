import { configureStore } from "@reduxjs/toolkit";
import phnSidebarReducer from "../features/phnSidebarSlice";
import userDocReducer from "../features/userDocSlice";
import userReducer from "../features/userSlice";
import newUserReducer from "../features/newUserSlice";
import chatSliceReducer from "../features/chatSlice";
import reDeploySliceReducer from "../features/reDeploySlice";
import paymentSlice from "../features/paymentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    newUser: newUserReducer,
    phnSidebar: phnSidebarReducer,
    userDoc: userDocReducer,
    chat: chatSliceReducer,
    deploy: reDeploySliceReducer,
    payments: paymentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
