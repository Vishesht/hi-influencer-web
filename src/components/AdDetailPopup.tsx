import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AdDetailPopup = ({ open, onClose, ad }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "70%", md: "50%" },
          maxWidth: "600px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          {ad?.title}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {ad?.desc}
        </Typography>
        <Typography variant="body2">Category: {ad?.category}</Typography>
        <Typography variant="body2">State: {ad?.state}</Typography>
        <Typography variant="body2">Posted By: {ad?.name}</Typography>
        <Typography variant="body2">
          Posted At: {new Date(ad?.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body2">Budget: {ad?.budget}</Typography>
        {/* Add more details as needed */}
      </Box>
    </Modal>
  );
};

export default AdDetailPopup;
