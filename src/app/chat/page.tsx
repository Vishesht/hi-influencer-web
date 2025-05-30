"use client";
import React, { useEffect, useRef, useState } from "react";
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
import {
  getChatDataFromFirebase,
  saveMessageToFirebase,
  updateMessageReadStatus,
} from "../firebase";
import axios from "axios";
import { BaseUrl, adminUserId, aiChatbotLogo } from "@/common/utils";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { showChatComponent } from "@/components/chat/showChatComponent";
import ChatInput from "@/components/chat/ChatInput";
import { sendNotification } from "@/api/commonApi";
import AlertDialog from "@/components/Alert";
import { showAlert } from "@/lib/features/alert/alertSlice";
import { useRouter } from "next/navigation";
import { getChatbotReply } from "../../chatbot/chatbot";

const ChatScreen = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [chatData, setChatData] = useState([]);
  const [userData, setUserData] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const data = useAppSelector((state) => state.login.userData);
  const hasFetchedChatData = useRef(false);
  const isMounted = useRef(false);
  const [isChatbot, setIsChatbot] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const messagesEndRef = useRef(null);

  const getChatData = async (userId) => {
    try {
      const response = await axios.get(`${BaseUrl}/service/chat/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.log("Error - chat", error);
      if (error.response.data.message === "No chats found for this user") {
        // data?.id && CreateChat();
        dispatch(
          showAlert({
            message:
              "To start chatting, please first place an order with the influencer. Once the order is confirmed, you will be able to access the chat feature.",
            confirmText: "Ok",
            onConfirm: () => router.back(),
          })
        );
      }
    }
  };

  // const CreateChat = () => {
  //   if (adminUserId !== data?.id) {
  //     saveChat(data.id, adminUserId);
  //   }
  // };

  useEffect(() => {
    scrollToBottom();
  }, [chatData, newMessage]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (data?.id && !hasFetchedChatData.current) {
      getChatData(data.id);
      hasFetchedChatData.current = true;
    }
  }, [data?.id, selectedChat]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
      setSelectedChat(null);
    };
  }, []);

  useEffect(() => {
    if (selectedChat?.id && data?.id) {
      getChatDataFromFirebase((item) => {
        const chatStarted = item?.hasOwnProperty(selectedChat?.id);
        if (item && chatStarted) {
          const chats = Object.keys(item).map((key) => ({
            id: key,
            name: key,
            messages: item[key].messages || {},
          }));

          const filteredChat = chats.find(
            (chat) => chat.id === selectedChat.id
          );

          if (filteredChat) {
            setChatData([filteredChat]);

            // Update read status for the current user
            Object.keys(filteredChat.messages).forEach((messageId) => {
              const message = filteredChat.messages[messageId];
              if (message.sender !== data.id && !message.read) {
                if (isMounted.current) {
                  updateMessageReadStatus(selectedChat.id, messageId, true);
                }
              }
            });
          } else {
            setChatData([]);
          }
        }
      });
    }
  }, [selectedChat, data]);

  const handleSendMessage = (senderId, msg) => {
    if (msg.trim() === "" || !selectedChat) return;

    const message = {
      text: msg,
      sender: senderId,
      read: false,
      timestamp: Date.now(),
    };

    // Send user's message
    selectedChat?.id && saveMessageToFirebase(selectedChat?.id, message);

    // If it's the chatbot
    if (selectedChat?.id === `ai-chatbot-${senderId}`) {
      const chatbotResponse = getChatbotReply(msg); // ⬅️ Generate response
      const chatbotMessage = {
        text: chatbotResponse,
        sender: `chatbot-id-${senderId}`,
        read: false,
        timestamp: Date.now(),
      };
      setTimeout(() => {
        saveMessageToFirebase(`ai-chatbot-${senderId}`, chatbotMessage);
      }, 1000);
    }

    // Send notification if needed
    selectedChat?.id &&
      sendNotification(
        selectedChat?.influencerDetails?.email,
        `${selectedChat?.myDetails?.name} sent a message`,
        msg
      );

    setNewMessage("");
  };

  const handleChatSelect = async (chat) => {
    setSelectedChat(chat);
  };
  const filteredChats = userData?.filter((chat) => {
    const searchLower = searchTerm.toLowerCase();
    const influencerName = chat?.influencerDetails?.name?.toLowerCase();
    const myName = chat?.myDetails?.name?.toLowerCase();

    return (
      influencerName?.includes(searchLower) || myName?.includes(searchLower)
    );
  });

  // const saveChat = async (userId1, userId2) => {
  //   try {
  //     await axios.post(`${BaseUrl}/service/create-chat`, {
  //       userId1,
  //       userId2,
  //     });
  //     data?.id && getChatData(data?.id);
  //   } catch (error) {
  //     console.error("Error saving chat:", error);
  //   }
  // };

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
                <ListItem
                  button
                  key={111}
                  selected={true}
                  onClick={() => {
                    setSelectedChat({
                      id: `ai-chatbot-${data?.id}`,
                      influencerDetails: {
                        name: "AI Chatbot",
                        photoURL: aiChatbotLogo,
                      },
                      myDetails: {
                        name: data?.name || "User",
                      },
                    });
                  }}
                  style={{
                    backgroundColor:
                      selectedChat &&
                      selectedChat.id === `ai-chatbot-${data?.id}`
                        ? "#f0f0f0"
                        : "transparent",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={aiChatbotLogo} />
                  </ListItemAvatar>
                  <ListItemText primary={"AI Chatbot"} />
                </ListItem>
                {filteredChats?.length > 0 ? (
                  filteredChats.map((chat) => (
                    <ListItem
                      button
                      key={chat.id}
                      selected={selectedChat && selectedChat.id === chat.id}
                      onClick={() => {
                        handleChatSelect(chat);
                        setDrawerOpen(false);
                      }}
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
            height="100vh"
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
              <ListItem
                button
                key={111}
                selected={true}
                onClick={() => {
                  setSelectedChat({
                    id: `ai-chatbot-${data?.id}`,
                    influencerDetails: {
                      name: "AI Chatbot",
                      photoURL: aiChatbotLogo,
                    },
                    myDetails: {
                      name: data?.name || "User",
                    },
                  });
                }}
                style={{
                  backgroundColor:
                    selectedChat && selectedChat.id === `ai-chatbot-${data?.id}`
                      ? "#f0f0f0"
                      : "transparent",
                }}
              >
                <ListItemAvatar>
                  <Avatar src={aiChatbotLogo} />
                </ListItemAvatar>
                <ListItemText primary={"AI Chatbot"} />
              </ListItem>
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
                  src={selectedChat?.influencerDetails?.photoURL}
                  style={{ marginRight: "10px" }}
                />
                <Typography variant="h6">
                  {selectedChat?.influencerDetails?.name}
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
            <div ref={messagesEndRef} />
          </Box>

          {/* Fixed Message Input */}
          <ChatInput
            handleSendMessage={() => handleSendMessage(data?.id, newMessage)}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
          />
          <AlertDialog />
        </Box>
      </Box>
    </>
  );
};

export default ChatScreen;
