import { Box, Typography } from "@mui/material";
import React from "react";

export const showChatComponent = (selectedChat, chatData, userId) => {
  return (
    <Box
      flexGrow={1}
      display="flex"
      flexDirection="column"
      overflow="auto"
      paddingBottom={2}
      paddingX={2}
      sx={{ bgcolor: "#f9f9f9" }}
    >
      {selectedChat ? (
        chatData.find((chat) => chat.id === selectedChat.id)?.messages &&
        Object.keys(
          chatData.find((chat) => chat.id === selectedChat.id).messages
        ).length > 0 ? (
          Object.values(
            chatData.find((chat) => chat.id === selectedChat.id).messages
          )
            .sort((a, b) => a.timestamp - b.timestamp) // Sort messages by timestamp
            .map((msg, index, messages) => {
              const isCurrentUser = msg.sender === userId;
              const msgDate = new Date(msg.timestamp);
              const previousMsgDate =
                index > 0 ? new Date(messages[index - 1].timestamp) : null;

              // Helper function to get formatted date
              const getDateLabel = (date) => {
                const today = new Date();
                const diffTime = today - date; // Time difference in milliseconds
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert to days
                const isCurrentYear =
                  today.getFullYear() === date.getFullYear();

                if (diffDays < 1) {
                  return "Today";
                } else if (diffDays < 2) {
                  return "Yesterday";
                } else if (diffDays <= 7) {
                  return date.toLocaleString("en-US", { weekday: "short" }); // Show day of the week
                } else if (!isCurrentYear) {
                  return date.toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });
                } else {
                  return date.toLocaleDateString("en-US", {
                    weekday: "short", // Show day of the week
                    day: "2-digit",
                    month: "short",
                  });
                }
              };

              // Check if we need to display the date separator
              const showDateSeparator =
                !previousMsgDate ||
                msgDate.toDateString() !== previousMsgDate.toDateString();

              return (
                <React.Fragment key={index}>
                  {showDateSeparator && (
                    <Box display="flex" justifyContent="center" mb={2} mt={2}>
                      <Typography
                        variant="caption"
                        sx={{
                          backgroundColor: "#e0e0e0",
                          borderRadius: "12px",
                          padding: "4px 8px",
                          color: "#757575",
                        }}
                      >
                        {getDateLabel(msgDate)}
                      </Typography>
                    </Box>
                  )}

                  <Box
                    display="flex"
                    justifyContent={isCurrentUser ? "flex-end" : "flex-start"}
                    mb={1}
                    mt={2}
                  >
                    <Box
                      bgcolor={isCurrentUser ? "#dcf8c6" : "#f1f1f1"}
                      borderRadius="8px"
                      p={1}
                      ml={isCurrentUser ? 1 : 0}
                      mr={isCurrentUser ? 0 : 1}
                      maxWidth="70%"
                      style={{ wordWrap: "break-word" }}
                    >
                      <Typography variant="body2">{msg.text}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </Typography>
                    </Box>
                  </Box>
                </React.Fragment>
              );
            })
        ) : (
          <Typography
            sx={{ pt: "50%" }}
            variant="body2"
            color="textSecondary"
            align="center"
          >
            No messages yet.
          </Typography>
        )
      ) : (
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ mt: "40vh" }}
        >
          Select a chat to start messaging.
        </Typography>
      )}
    </Box>
  );
};
