import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./src/Slice/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export type IRootState = ReturnType<typeof store.getState>;

export default store;
