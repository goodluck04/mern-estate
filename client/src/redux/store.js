import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js"


export const store = configureStore({
  reducer: {
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({  
      serializableCheck: false,
      // it will avoid serialized for variables in browser
    }),
});
