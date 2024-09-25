"use client";
// pages/ChatScreen.js
import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import Header from "@/components/header";

const ChatScreen = () => {
  const chatData = [
    {
      id: 1,
      name: "John Doe",
      img: "https://via.placeholder.com/40",
      messages: [
        { text: "Hey! How are you?", sender: "John" },
        { text: "I am good, thanks! And you?", sender: "me" },
        { text: "Doing well, just working on some projects.", sender: "John" },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      img: "https://via.placeholder.com/40",
      messages: [
        { text: "Are we still on for the meeting tomorrow?", sender: "me" },
        { text: "Yes, looking forward to it!", sender: "Jane" },
        { text: "Great! What time should we meet?", sender: "me" },
      ],
    },
    {
      id: 3,
      name: "Alice Johnson",
      img: "https://via.placeholder.com/40",
      messages: [
        { text: "Did you finish the report?", sender: "Alice" },
        { text: "Almost done, just need a few more details.", sender: "me" },
        { text: "Let me know if you need any help!", sender: "Alice" },
      ],
    },
  ];

  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    setSelectedChat((prev) => ({
      ...prev,
      messages: [...prev.messages, { text: newMessage, sender: "me" }],
    }));
    setNewMessage(""); // Clear input after sending
  };

  // Filter chat data based on search term
  const filteredChats = chatData.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <Box sx={{ pt: 8 }} display="flex" flexGrow={1}>
        <Box
          width="300px"
          borderRight="1px solid #e0e0e0"
          overflow="auto"
          display="flex"
          flexDirection="column"
          height="90vh"
        >
          <InputBase
            placeholder="Search chats…"
            style={{
              padding: "10px",
              margin: "10px",
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
            }}
            startAdornment={<SearchIcon />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <List style={{ overflowY: "auto", flexGrow: 1 }}>
            {filteredChats.map((chat) => (
              <ListItem
                button
                key={chat.id}
                selected={selectedChat && selectedChat.id === chat.id}
                onClick={() => handleChatSelect(chat)}
                style={{
                  backgroundColor:
                    selectedChat && selectedChat.id === chat.id
                      ? "#f0f0f0"
                      : "transparent", // Highlight selected chat
                }}
              >
                <ListItemAvatar>
                  <Avatar src={chat.img} />
                </ListItemAvatar>
                <ListItemText primary={chat.name} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Chat Area */}
        <Box flexGrow={1} display="flex" flexDirection="column">
          <Box
            display="flex"
            alignItems="center"
            padding={1}
            bgcolor="#f5f5f5"
            boxShadow={1}
          >
            {selectedChat && (
              <>
                <Avatar
                  src={selectedChat.img}
                  style={{ marginRight: "10px" }}
                />
                <Typography variant="h6">{selectedChat.name}</Typography>
              </>
            )}
          </Box>
          {/* Chat Messages */}
          <Box
            flexGrow={1}
            display="flex"
            flexDirection="column"
            overflow="auto"
            paddingBottom={2}
            paddingX={2}
            sx={{ bgcolor: "#f9f9f9" }} // Background color for chat area
          >
            {selectedChat ? (
              selectedChat.messages.length > 0 ? (
                selectedChat.messages.map((msg, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent={
                      msg.sender === "me" ? "flex-end" : "flex-start"
                    }
                    mb={1}
                    mt={2}
                  >
                    {/* {msg.sender !== "me" && <Avatar src={selectedChat.img} />} */}
                    <Box
                      bgcolor={msg.sender === "me" ? "#dcf8c6" : "#f1f1f1"}
                      borderRadius="8px"
                      p={1}
                      ml={msg.sender === "me" ? 1 : 0}
                      mr={msg.sender === "me" ? 0 : 1}
                      maxWidth="70%"
                      style={{ wordWrap: "break-word" }}
                    >
                      <Typography variant="body2">{msg.text}</Typography>
                    </Box>
                    {/* {msg.sender === "me" && (
                      <Avatar src="https://via.placeholder.com/40" />
                    )} */}
                  </Box>
                ))
              ) : (
                <Typography
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

          {/* Fixed Message Input */}
          <Box
            display="flex"
            alignItems="center"
            mt={2}
            position="sticky"
            bottom={0}
            bgcolor="#fff"
            padding={1}
            boxShadow={1}
          >
            <InputBase
              placeholder="Type a message..."
              style={{
                padding: "10px",
                border: "1px solid #e0e0e0",
                borderRadius: "4px",
                flexGrow: 1,
              }}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <IconButton color="primary" onClick={handleSendMessage}>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChatScreen;
