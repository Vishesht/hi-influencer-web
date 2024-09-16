import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginState {
  userData: any;
}

const initialState: LoginState = {
  userData: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
  },
});

export const { add } = loginSlice.actions;

export default loginSlice.reducer;
