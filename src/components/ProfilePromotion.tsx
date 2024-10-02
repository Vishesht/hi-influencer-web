"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Snackbar,
  Stack,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { WebUrl } from "@/common/utils";

interface ProfilePromotionProps {
  userName: string;
}

const ProfilePromotion: React.FC<ProfilePromotionProps> = ({ userName }) => {
  const [open, setOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${WebUrl}/user/${userName}`);
    setOpen(true);
  };

  const handleOpenLink = () => {
    window.open(`${WebUrl}/user/${userName}`, "_blank");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: 500,
        textAlign: "center",
        margin: "auto",
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        mb: 4,
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        Promote Your Profile
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Add this link to your social media bio to increase visibility and
        engagement:
      </Typography>
      <TextField
        value={`${WebUrl}/user/${userName}`}
        fullWidth
        InputProps={{
          readOnly: true,
        }}
        sx={{ mb: 3, backgroundColor: "#fff", borderRadius: 1 }}
      />
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="contained"
          startIcon={<ContentCopyIcon />}
          onClick={handleCopy}
        >
          Copy Link
        </Button>
        <Button
          variant="outlined"
          startIcon={<OpenInNewIcon />}
          onClick={handleOpenLink}
        >
          Open Link
        </Button>
      </Stack>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Link copied to clipboard"
      />
    </Box>
  );
};

export default ProfilePromotion;
