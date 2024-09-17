import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    open: false,
    message: "",
    confirmText: "OK",
    cancelText: "Cancel",
    onConfirm: null,
    onCancel: null,
  },
  reducers: {
    showAlert(state, action) {
      const { message, confirmText, cancelText, onConfirm, onCancel } =
        action.payload;
      state.open = true;
      state.message = message;
      state.confirmText = confirmText || "OK";
      state.cancelText = cancelText || "Cancel";
      state.onConfirm = onConfirm || null;
      state.onCancel = onCancel || null;
    },
    hideAlert(state) {
      state.open = false;
      state.message = "";
      state.onConfirm = null;
      state.onCancel = null;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;
