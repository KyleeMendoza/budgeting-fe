import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./src/Slice/userSlice";
import modalReducer from "./src/Slice/modalSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
  },
});
export type IRootState = ReturnType<typeof store.getState>;

export default store;
