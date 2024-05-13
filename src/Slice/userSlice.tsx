import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  username: "",
  email: "",
  mobile: "",
  timeframe: "",
  expenses: 0,
  balance: 0,
  expenseData: [],
  isDone: false,
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
    setTimeframe: (state, action) => {
      const { timeframe } = action.payload;
      state.timeframe = timeframe;
    },
    setIsDone: (state) => {
      state.isDone = true;
    },
    setExpenseData: (state, action) => {
      const { expenseData } = action.payload;
      state.expenseData = expenseData;
    },
    setCredits: (state, action) => {
      const { savings, expenses } = action.payload;
      // state.income = savings + expenses;
      state.expenses = expenses;
      state.balance = savings;
    },
  },
});

export const { setUser, setIsDone, setExpenseData, setCredits, setTimeframe } =
  UserSlice.actions;

export default UserSlice.reducer;
