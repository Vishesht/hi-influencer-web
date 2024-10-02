import React from "react";
import { CircularProgress, Backdrop, Typography } from "@mui/material";

const Loading = ({ loading }) => {
  return (
    <Backdrop
      open={loading}
      style={{ zIndex: 1000 }}
      sx={{ color: "#fff", backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h6" style={{ marginTop: "16px" }}>
          Loading...
        </Typography>
      </div>
    </Backdrop>
  );
};

export default Loading;
