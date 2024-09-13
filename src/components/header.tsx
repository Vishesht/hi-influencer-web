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
import ListModal from "./ListModal";

const socialMediaPlatforms = ["Instagram", "Facebook", "YouTube", "Others"];
const categories = ["Fashion", "Tech", "Lifestyle", "Travel", "Others"];

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
    <AppBar sx={{ mt: 5 }} position="static" color="transparent" elevation={0}>
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
              backgroundColor: "#F653E1", // Primary background color
              marginLeft: "20px",
              padding: "4px 10px", // Adjust padding for better size
              borderRadius: "50px", // Rounded corners
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Soft shadow effect
              fontWeight: "bold", // Bold text
              fontSize: "16px", // Font size adjustment
              textTransform: "none", // Prevent uppercase transformation
              transition: "background-color 0.3s ease, box-shadow 0.3s ease", // Smooth transitions
              "&:hover": {
                backgroundColor: "#e44bcf", // Hover background color
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)", // Darker shadow on hover
              },
              "&:active": {
                backgroundColor: "#d43bbf", // Darker background on click
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Lighter shadow on click
              },
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
                fontFamily: "Helvetica",
              }}
            >
              Connect brands with influencers.
            </Typography>
            <Typography color="grey" variant="body1" sx={{ mt: 2 }}>
              Connect with top Instagram, YouTube, and Facebook influencers to
              create engaging content and promote your brand effectively.
            </Typography>

            {/* Input fields */}
            <Container
              sx={{ mt: 4, display: "flex", justifyContent: "center" }}
            >
              <input
                placeholder="Choose a platform"
                style={{
                  padding: "12px 20px", // Adjusted padding for a better appearance
                  borderRadius: "50px", // Keeps the rounded corners
                  marginRight: "10px",
                  width: "340px",
                  border: "1px solid #ddd", // Slightly lighter border color for a softer look
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Adds shadow to the input
                  transition: "box-shadow 0.3s ease, border-color 0.3s ease", // Smooth transition effects
                  fontSize: "16px", // Adjust font size for readability
                  outline: "none", // Removes the default outline
                }}
                onClick={() => setPlatformModalOpen(true)}
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)")
                } // Darker shadow on focus
                onBlur={(e) =>
                  (e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)")
                } // Resets shadow when focus is lost
              />

              <input
                placeholder="Enter keywords, niches or categories"
                style={{
                  padding: "12px 20px", // Adjusted padding for a better appearance
                  borderRadius: "50px", // Keeps the rounded corners
                  marginRight: "10px",
                  width: "340px",
                  border: "1px solid #ddd", // Slightly lighter border color for a softer look
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Adds shadow to the input
                  transition: "box-shadow 0.3s ease, border-color 0.3s ease", // Smooth transition effects
                  fontSize: "16px", // Adjust font size for readability
                  outline: "none", // Removes the default outline
                }}
                onClick={() => setCategoryModalOpen(true)}
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)")
                } // Darker shadow on focus
                onBlur={(e) =>
                  (e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)")
                }
              />
            </Container>
          </Container>
        )}
      </Container>
      <ListModal
        title={"Select Platform"}
        platformModalOpen={platformModalOpen}
        setPlatformModalOpen={() => setPlatformModalOpen(false)}
        socialMediaPlatforms={socialMediaPlatforms}
      />

      {/* Category Modal */}
      <ListModal
        title={"Select Category"}
        platformModalOpen={categoryModalOpen}
        setPlatformModalOpen={() => setCategoryModalOpen(false)}
        socialMediaPlatforms={categories}
      />

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
