// ReusableDialog.js
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";

const ReusableDialog = ({ open, onClose, title, content, actions }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{content}</Typography>
        <div style={{ marginTop: 16 }}>{actions}</div>
      </DialogContent>
    </Dialog>
  );
};

export default ReusableDialog;
