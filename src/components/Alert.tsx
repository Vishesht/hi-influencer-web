import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { hideAlert } from "@/lib/features/alert/alertSlice";

const AlertDialog = () => {
  const dispatch = useDispatch();
  const { open, message, confirmText, cancelText, onConfirm, onCancel } =
    useSelector((state) => state.alert);

  const handleClose = () => {
    dispatch(hideAlert());
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    handleClose();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6">Alert</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      <DialogActions>
        {onCancel && (
          <Button onClick={handleCancel} color="secondary">
            {cancelText}
          </Button>
        )}
        <Button onClick={handleConfirm} color="primary">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
