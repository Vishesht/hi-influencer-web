import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentStatus: false,
  },
  reducers: {
    paymentStatus: (state, action: PayloadAction<any>) => {
      state.paymentStatus = action.payload;
    },
  },
});

export const { paymentStatus } = paymentSlice.actions;

export default paymentSlice.reducer;
