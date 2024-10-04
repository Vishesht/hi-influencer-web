"use client";
import React from "react";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface ReusableSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: "success" | "error" | "info" | "warning"; // Define the severity options
  autoHideDuration?: number; // Optional: duration in milliseconds
}

const ReusableSnackbar: React.FC<ReusableSnackbarProps> = ({
  open,
  onClose,
  message,
  severity = "success",
  autoHideDuration = 3000,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
      <MuiAlert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default ReusableSnackbar;
