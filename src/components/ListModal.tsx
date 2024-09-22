import React from "react";
import {
  Modal,
  Box,
  Typography,
  List,
  ListItemText,
  ListItem,
} from "@mui/material";

const ListModal = ({
  title,
  platformModalOpen,
  setPlatformModalOpen,
  socialMediaPlatforms,
  onSelect, // Add the onSelect prop
}) => (
  <Modal
    open={platformModalOpen}
    onClose={() => setPlatformModalOpen(false)}
    aria-labelledby="platform-modal"
    aria-describedby="select-social-media-platform"
  >
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        borderRadius: 3,
        p: 4,
        boxShadow: 24,
        width: 400,
        maxHeight: "80vh",
        overflowY: "auto",
      }}
    >
      <Typography
        sx={{
          color: "#333",
          mb: 2,
          fontWeight: 600,
        }}
        id="platform-modal"
        variant="h6"
        component="h2"
      >
        {title}
      </Typography>
      <List>
        {socialMediaPlatforms.map((platform) => (
          <ListItem
            key={platform}
            sx={{
              borderRadius: "8px",
              mb: 1,
              "&:hover": {
                bgcolor: "#f5f5f5",
                cursor: "pointer",
              },
            }}
            component="div"
            onClick={() => {
              onSelect(platform); // Call onSelect with the selected platform
              setPlatformModalOpen(false); // Close the modal
            }}
          >
            <ListItemText sx={{ color: "#333" }} primary={platform} />
          </ListItem>
        ))}
      </List>
    </Box>
  </Modal>
);

export default ListModal;
