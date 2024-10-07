import React from "react";
import {
  Button,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const CustomButton = ({
  isEnabled,
  isInfluencer,
  onClick,
  children,
  description,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen is mobile

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row", // Responsive layout
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
      <Box sx={{ textAlign: "left" }}>
        {!isEnabled && (
          <Typography
            variant="body1"
            sx={{
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
              mt: 0.5,
              color: "text.secondary",
            }}
          >
            {description}
          </Typography>
        )}
      </Box>
      {isInfluencer && (
        <Button
          variant="contained"
          color="primary"
          onClick={isEnabled ? onClick : undefined}
          disabled={!isEnabled}
          sx={{
            fontSize: 14, // Slightly larger for better visibility
            minWidth: 150,
            mt: isMobile ? 1 : 0, // Add margin bottom for mobile
            mr: isMobile ? 0 : 2, // Add margin right for desktop
            opacity: isEnabled ? 1 : 0.5,
            cursor: isEnabled ? "pointer" : "not-allowed",
            "&:hover": {
              backgroundColor: isEnabled
                ? theme.palette.primary.dark
                : undefined,
            },
          }}
        >
          {children}
        </Button>
      )}
    </Box>
  );
};

export default CustomButton;
