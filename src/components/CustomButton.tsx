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
        padding: 2,
        borderRadius: 2,
        marginTop: 10,
        maxWidth: 500,
        textAlign: "center",
        margin: "auto",
        backgroundColor: "#f9f9f9",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {isInfluencer && (
        <Button
          variant="contained"
          color="primary"
          onClick={isEnabled ? onClick : undefined}
          disabled={!isEnabled}
          sx={{
            fontSize: 12,
            minWidth: 150,
            mr: 2,
            opacity: isEnabled ? 1 : 0.5,
            cursor: isEnabled ? "pointer" : "not-allowed",
          }}
        >
          {children}
        </Button>
      )}
      <Box sx={{}}>
        {!isEnabled && (
          <Typography
            variant="body1"
            sx={{
              textAlign: "left",
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
              textAlign: "left",
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
