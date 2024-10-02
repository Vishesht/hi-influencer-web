import React from "react";
import { Button, CircularProgress } from "@mui/material";

const LoadingButton = ({ loading, onClick, disabled, children, ...props }) => {
  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={loading || disabled}
      {...props}
      style={{ position: "relative" }}
    >
      {loading && (
        <CircularProgress
          size={24}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            marginLeft: -12,
            marginTop: -12,
          }}
          color="inherit"
        />
      )}
      {children}
    </Button>
  );
};

export default LoadingButton;
