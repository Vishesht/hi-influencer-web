"use client";
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Container, Box, Divider } from "@mui/material";
import { useRouter } from "next/navigation";

const socialMediaPlatforms = ["Instagram", "TikTok", "YouTube", "UGC"];
const categories = ["Fashion", "Tech", "Lifestyle", "Travel"];

const Header = ({ search = true }) => {
  const router = useRouter();

  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleListItemClick = (path) => {
    router.push(path);
    setDrawerOpen(false); // Ensure drawer closes after navigation
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo */}
          <Typography
            onClick={() => router.push("/")}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <img
              src="/assets/images/logo.png"
              alt="Collabstr Logo"
              style={{ height: "30px" }}
            />
          </Typography>

          {/* Nav Links */}
          <Button color="inherit">Home</Button>
          <Button onClick={() => router.push("/orders")} color="inherit">
            Orders
          </Button>
          <Button color="inherit">ADs</Button>
          <Button color="inherit">Download</Button>

          {/* Post a Campaign Button */}
          <Button
            variant="contained"
            color="secondary"
            sx={{
              backgroundColor: "#F653E1",
              marginLeft: "20px",
              "&:hover": { backgroundColor: "#e44bcf" },
            }}
          >
            Post a Campaign
          </Button>

          {/* Avatar with Drawer */}
          <IconButton
            edge="end"
            color="inherit"
            sx={{ marginLeft: "10px" }}
            onClick={() => setDrawerOpen(true)}
          >
            <Avatar sx={{ bgcolor: "#FFF3E0", color: "#000" }}>V</Avatar>
          </IconButton>

          {/* Drawer Icon */}
          {/* <IconButton edge="end" color="inherit">
            <MenuIcon />
          </IconButton> */}
        </Toolbar>

        {/* Secondary section */}
        {search && (
          <Container sx={{ textAlign: "center", mt: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(90deg, #FF76C6, #B64DFF)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Influencer Marketing Made Easy
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Find and hire top Instagram, TikTok, YouTube, and UGC influencers
              to create unique content for your brand
            </Typography>

            {/* Input fields */}
            <Container
              sx={{ mt: 4, display: "flex", justifyContent: "center" }}
            >
              <input
                placeholder="Choose a platform"
                style={{
                  padding: "10px",
                  borderRadius: "50px",
                  marginRight: "10px",
                  width: "300px",
                  border: "1px solid #ccc",
                  backgroundColor: "#fff",
                }}
                onClick={() => setPlatformModalOpen(true)}
              />
              <input
                placeholder="Enter keywords, niches or categories"
                style={{
                  padding: "10px",
                  borderRadius: "50px",
                  marginRight: "10px",
                  width: "300px",
                  border: "1px solid #ccc",
                  backgroundColor: "#fff",
                }}
                onClick={() => setCategoryModalOpen(true)}
              />
            </Container>
          </Container>
        )}
      </Container>

      {/* Platform Modal */}
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
            borderRadius: 2,
            p: 4,
            boxShadow: 24,
            width: 300,
          }}
        >
          <Typography
            sx={{ color: "black" }}
            id="platform-modal"
            variant="h6"
            component="h2"
          >
            Select a Platform
          </Typography>
          <List>
            {socialMediaPlatforms.map((platform) => (
              <ListItem key={platform}>
                <ListItemText sx={{ color: "black" }} primary={platform} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>

      {/* Category Modal */}
      <Modal
        open={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        aria-labelledby="category-modal"
        aria-describedby="select-categories"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 4,
            boxShadow: 24,
            width: 300,
          }}
        >
          <Typography
            sx={{ color: "black" }}
            id="category-modal"
            variant="h6"
            component="h2"
          >
            Select a Category
          </Typography>
          <List>
            {categories.map((category) => (
              <ListItem key={category} onClick={() => null}>
                <ListItemText sx={{ color: "black" }} primary={category} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>

      {/* Drawer for Profile */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{ width: 250, p: 2 }}
          role="presentation"
          onClick={() => setDrawerOpen(false)}
          onKeyDown={() => setDrawerOpen(false)}
        >
          {/* User Info */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar sx={{ bgcolor: "#FFF3E0", color: "#000", mr: 2 }}>V</Avatar>
            <Box>
              <Typography variant="h6">John Doe</Typography>
              <Typography color="textSecondary">Fashion Influencer</Typography>
            </Box>
          </Box>
          <Divider />

          {/* Menu Items */}
          <List>
            <ListItem onClick={() => handleListItemClick("/profile")}>
              <ListItemText
                primary="Profile"
                sx={{ color: "black" }} // Set text color to black
              />
            </ListItem>
            <ListItem onClick={() => handleListItemClick("/orders")}>
              <ListItemText
                primary="Your Orders"
                sx={{ color: "black" }} // Set text color to black
              />
            </ListItem>
            <ListItem onClick={() => handleListItemClick("/payments")}>
              <ListItemText
                primary="Payments"
                sx={{ color: "black" }} // Set text color to black
              />
            </ListItem>
            <ListItem onClick={() => handleListItemClick("/logout")}>
              <ListItemText
                primary="Logout"
                sx={{ color: "black" }} // Set text color to black
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
