import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payments: [],
};

export const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    getPayments: (state, action) => {
      state.payments = action.payload;
    },
  },
});

export const { getPayments } = paymentSlice.actions;
export const payments = (state) => state.payments.payments;

export default paymentSlice.reducer;
