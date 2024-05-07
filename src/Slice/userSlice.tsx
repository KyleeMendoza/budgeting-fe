import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  username: "",
  email: "",
  mobile: "",
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { name, username, email, mobile } = action.payload;
      state.name = name;
      state.email = email;
      state.mobile = mobile;
      state.username = username;
    },
  },
});

export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;
