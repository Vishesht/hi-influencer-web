"use client";

import React, { useState } from "react";
import { Box, Typography, Button, TextField, Snackbar } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 500, textAlign: "center", margin: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Promote Your Profile
      </Typography>
      <Typography variant="body1" gutterBottom>
        Add this link to your social media bio to boost visibility and drive
        more engagement:
      </Typography>
      <TextField
        value={`${WebUrl}/user/${userName}`}
        fullWidth
        InputProps={{
          readOnly: true,
        }}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        startIcon={<ContentCopyIcon />}
        onClick={handleCopy}
      >
        Copy Link
      </Button>
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
