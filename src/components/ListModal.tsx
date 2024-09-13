import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const ListModal = ({
  title,
  platformModalOpen,
  setPlatformModalOpen,
  socialMediaPlatforms,
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
        borderRadius: 3, // Slightly larger radius for a softer look
        p: 4,
        boxShadow: 24,
        width: 400, // Increased width for better content fitting
        maxHeight: "80vh", // Limits height for better view on smaller screens
        overflowY: "auto", // Enables scrolling if content exceeds height
      }}
    >
      <Typography
        sx={{
          color: "#333", // Darker color for better readability
          mb: 2, // Margin bottom to separate from the list
          fontWeight: 600, // Makes the title stand out
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
              borderRadius: "8px", // Rounded corners for each list item
              mb: 1, // Margin bottom for spacing between items
              "&:hover": {
                bgcolor: "#f5f5f5", // Light background color on hover
                cursor: "pointer",
              },
            }}
            button // Makes the list item clickable
            onClick={() => {
              // Handle click event, e.g., set selected platform
              setPlatformModalOpen(false);
            }}
          >
            <ListItemText
              sx={{ color: "#333" }} // Consistent text color
              primary={platform}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  </Modal>
);

export default ListModal;
