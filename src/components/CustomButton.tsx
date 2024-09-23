import React from "react";
import { Button, Box, Typography } from "@mui/material";

const CustomButton = ({
  isEnabled,
  isInfluencer,
  onClick,
  children,
  description,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        boxShadow: 2,
        padding: 2,
        borderRadius: 2,
        marginTop: 2,
      }}
    >
      {isInfluencer && (
        <Button
          variant="contained"
          color="primary"
          onClick={isEnabled ? onClick : undefined}
          disabled={!isEnabled}
          sx={{
            mr: 2,
            opacity: isEnabled ? 1 : 0.5,
            cursor: isEnabled ? "pointer" : "not-allowed",
          }}
        >
          {children}
        </Button>
      )}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {!isEnabled && (
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            Pending Steps:
          </Typography>
        )}
        {description && (
          <Typography
            variant="body2"
            sx={{
              ml: 2,
              marginTop: 0.5,
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            {description}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CustomButton;
