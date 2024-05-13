import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  incomeModal: false,
  statementModal: false,
  createModal: false,
  timeframeModal: false,
};

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenIncomeModal: (state) => {
      state.incomeModal = true;
    },
    setCloseIncomeModal: (state) => {
      state.incomeModal = false;
    },
    setOpenStatementModal: (state) => {
      state.statementModal = true;
    },
    setCloseStatementModal: (state) => {
      state.statementModal = false;
    },
    setOpenCreateModal: (state) => {
      state.createModal = true;
    },
    setCloseCreateModal: (state) => {
      state.createModal = false;
    },
    setOpenTimeframeModal: (state) => {
      state.timeframeModal = true;
    },
    setCloseTimeframeModal: (state) => {
      state.timeframeModal = false;
    },
  },
});

export const {
  setOpenIncomeModal,
  setCloseIncomeModal,
  setOpenStatementModal,
  setCloseStatementModal,
  setOpenCreateModal,
  setCloseCreateModal,
  setOpenTimeframeModal,
  setCloseTimeframeModal,
} = ModalSlice.actions;

export default ModalSlice.reducer;
