"use client";
import React, { useEffect, useState } from "react";
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
  SwipeableDrawer,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import SendIcon from "@mui/icons-material/Send";
import Header from "@/components/header";
import { getChatDataFromFirebase, saveMessageToFirebase } from "../firebase";
import axios from "axios";
import { BaseUrl } from "@/common/utils";
import { useAppSelector } from "@/lib/hooks";
import { showChatComponent } from "@/components/chat/showChatComponent";
import ChatInput from "@/components/chat/ChatInput";

const ChatScreen = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [chatData, setChatData] = useState([]);
  const [userData, setUserData] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const data = useAppSelector((state) => state.login.userData);

  const isMobile = useMediaQuery("(max-width:600px)");

  const getChatData = async (userId) => {
    try {
      const response = await axios.get(`${BaseUrl}/service/chat/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };

  useEffect(() => {
    getChatData(data?.id);
  }, [data?.id]);

  useEffect(() => {
    if (selectedChat) {
      getChatDataFromFirebase((item) => {
        if (item) {
          const chats = Object.keys(item).map((key) => ({
            id: key,
            name: key,
            messages: item[key].messages || {},
          }));

          // Filter chats to get only the selected chat data
          const filteredChat = chats.find(
            (chat) => chat.id === selectedChat.id
          );
          if (filteredChat) {
            setChatData([filteredChat]); // Set the chat data to only the selected chat
          } else {
            setChatData([]); // No chat found, reset chat data
          }
        }
      });
    }
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !selectedChat) return;
    const message = {
      text: newMessage,
      sender: data?.id,
      timestamp: Date.now(),
    };
    selectedChat?.id && saveMessageToFirebase(selectedChat?.id, message);
    setNewMessage("");
  };

  const handleChatSelect = async (chat) => {
    setSelectedChat(chat);
  };

  const filteredChats = userData?.filter((chat) => {
    const searchLower = searchTerm.toLowerCase();
    const influencerName = chat.influencerDetails.name.toLowerCase();
    const myName = chat.myDetails.name.toLowerCase();

    return influencerName.includes(searchLower) || myName.includes(searchLower);
  });

  return (
    <>
      <Header />
      <Box sx={{ pt: isMobile ? 7 : 8 }} display="flex" flexGrow={1}>
        {/* User List - Fixed Height */}
        {isMobile ? (
          <SwipeableDrawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            onOpen={() => setDrawerOpen(true)}
          >
            <Box
              width="240px"
              borderRight="1px solid #e0e0e0"
              display="flex"
              flexDirection="column"
              height="90vh"
            >
              {/* Search Input */}
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
              {/* Chat List - Make it scrollable independently */}
              <List style={{ overflowY: "auto", flexGrow: 1 }}>
                {filteredChats?.length > 0 ? (
                  filteredChats.map((chat) => (
                    <ListItem
                      button
                      key={chat.id}
                      selected={selectedChat && selectedChat.id === chat.id}
                      onClick={() => handleChatSelect(chat)}
                      style={{
                        backgroundColor:
                          selectedChat && selectedChat.id === chat.id
                            ? "#f0f0f0"
                            : "transparent",
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar src={chat?.influencerDetails?.photoURL} />
                      </ListItemAvatar>
                      <ListItemText primary={chat?.influencerDetails?.name} />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No users found." />
                  </ListItem>
                )}
              </List>
            </Box>
          </SwipeableDrawer>
        ) : (
          <Box
            width="240px"
            borderRight="1px solid #e0e0e0"
            display="flex"
            flexDirection="column"
            height="90vh"
            overflow="hidden"
          >
            {/* Search Input */}
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
            {/* Chat List - Make it scrollable independently */}
            <List style={{ overflowY: "auto", flexGrow: 1 }}>
              {filteredChats?.length > 0 ? (
                filteredChats.map((chat) => (
                  <ListItem
                    button
                    key={chat.id}
                    selected={selectedChat && selectedChat.id === chat.id}
                    onClick={() => handleChatSelect(chat)}
                    style={{
                      backgroundColor:
                        selectedChat && selectedChat.id === chat.id
                          ? "#f0f0f0"
                          : "transparent",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar src={chat?.influencerDetails?.photoURL} />
                    </ListItemAvatar>
                    <ListItemText primary={chat?.influencerDetails?.name} />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No users found." />
                </ListItem>
              )}
            </List>
          </Box>
        )}
        {/* Chat Area - Keep it scrollable independently */}
        <Box flexGrow={1} display="flex" flexDirection="column" height="92vh">
          {/* Chat Header */}
          <Box
            display="flex"
            alignItems="center"
            padding={1}
            bgcolor="#f5f5f5"
            boxShadow={1}
          >
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
            {selectedChat && (
              <>
                <Avatar
                  src={selectedChat.influencerDetails.photoURL}
                  style={{ marginRight: "10px" }}
                />
                <Typography variant="h6">
                  {selectedChat.influencerDetails.name}
                </Typography>
              </>
            )}
          </Box>

          {/* Chat Messages - Scrollable */}
          <Box
            flexGrow={1}
            display="flex"
            flexDirection="column"
            overflow="auto" // Enable scrolling for chat messages
            paddingX={2}
            sx={{ bgcolor: "#f9f9f9" }}
          >
            {showChatComponent(selectedChat, chatData, data?.id)}
          </Box>

          {/* Fixed Message Input */}
          <ChatInput
            handleSendMessage={handleSendMessage}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
          />
        </Box>
      </Box>
    </>
  );
};

export default ChatScreen;
