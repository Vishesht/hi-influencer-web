"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img
              src="/assets/images/logo.png"
              alt="Collabstr Logo"
              style={{ height: "30px" }}
            />
          </Typography>

          {/* Nav Links */}
          <Button color="inherit">Home</Button>
          <Button onClick={() => router.push("/about")} color="inherit">
            Orders
          </Button>
          <Button color="inherit">Search</Button>
          <Button color="inherit">Campaigns</Button>
          <Button color="inherit">Track</Button>

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

          {/* Avatar with Menu Icon */}
          <IconButton edge="end" color="inherit" sx={{ marginLeft: "10px" }}>
            <Avatar sx={{ bgcolor: "#FFF3E0", color: "#000" }}>V</Avatar>
          </IconButton>

          {/* Drawer Icon */}
          <IconButton edge="end" color="inherit">
            <MenuIcon />
          </IconButton>
        </Toolbar>

        {/* Secondary section */}
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
            Find and hire top Instagram, TikTok, YouTube, and UGC influencers to
            create unique content for your brand
          </Typography>

          {/* Input fields */}
          <Container sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <input
              placeholder="Choose a platform"
              style={{
                padding: "10px",
                borderRadius: "50px",
                marginRight: "10px",
                width: "250px",
                border: "1px solid #ccc",
              }}
            />
            <input
              placeholder="Enter keywords, niches or categories"
              style={{
                padding: "10px",
                borderRadius: "50px",
                marginRight: "10px",
                width: "250px",
                border: "1px solid #ccc",
              }}
            />
            <IconButton color="primary">
              <MenuIcon />
            </IconButton>
          </Container>
        </Container>
      </Container>
    </AppBar>
  );
};

export default Header;
