import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginState {
  userData: any;
  isAdmin: boolean;
}

const initialState: LoginState = {
  userData: null,
  isAdmin: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
    isAdminLogin: (state, action: PayloadAction<any>) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { add, isAdminLogin } = loginSlice.actions;

export default loginSlice.reducer;
