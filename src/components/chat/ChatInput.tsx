import React, { useState } from "react";
import { IconButton, InputBase, Box, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatInput = ({ handleSendMessage, newMessage, setNewMessage }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
      animateSendIcon();
    }
  };

  // Trigger send icon animation
  const animateSendIcon = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      mt={2}
      position="sticky"
      bottom={0}
      bgcolor="#fff"
      padding={1}
      borderRadius={3}
      sx={{ zIndex: 1000 }}
    >
      <InputBase
        placeholder="Type a message..."
        style={{
          padding: "10px 16px",
          border: "1px solid #e0e0e0",
          borderRadius: "20px",
          flexGrow: 1,
          backgroundColor: "#f5f5f5",
        }}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        inputProps={{ style: { color: "#000" } }}
      />
      <IconButton
        color="primary"
        onClick={() => {
          handleSendMessage();
          animateSendIcon();
        }}
        sx={{
          marginLeft: 1,
          backgroundColor: "#4CAF50",
          color: "#fff",
          borderRadius: "50%",
          transition: "background-color 0.3s",
          "&:hover": {
            backgroundColor: "#45a049", // Darker shade on hover
          },
          animation: isAnimating ? "sendIconClick 0.3s ease-in-out" : "none",
        }}
      >
        <SendIcon />
      </IconButton>

      {/* Inline styles for the animation */}
      <style jsx>{`
        @keyframes sendIconClick {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2); /* Slight enlargement */
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </Box>
  );
};

export default ChatInput;
