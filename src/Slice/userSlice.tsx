import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  username: "",
  email: "",
  mobile: "",
  timeframe: "",
  income: 0,
  expenses: 0,
  balance: 0,
  expenseData: [],
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
    setIncome: (state, action) => {
      const { income } = action.payload;
      state.income = income;
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

export const { setUser, setIncome, setExpenseData, setCredits, setTimeframe } =
  UserSlice.actions;

export default UserSlice.reducer;
