"use client";
import React, { useState, useEffect, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {
  Container,
  Box,
  Divider,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../app/firebase";
import { ProfileCheckRegex } from "@/common/utils";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { add } from "@/lib/features/login/loginSlice";

const Header = () => {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const path = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<any>(null);
  const data = useAppSelector((state) => state.login.userData);

  const useProfilePathCheck = () => {
    const profilePathRegex = ProfileCheckRegex;
    return profilePathRegex.test(path);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleListItemClick = (path: string) => {
    router.push(path);
    setAnchorEl(null); // Close popover after navigation
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setAnchorEl(null);
      dispatch(add(null));
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const postBtn = () => {
    return (
      <Button
        onClick={() => router.push("/create-ad")}
        variant="contained"
        color="secondary"
        sx={{
          backgroundColor: "#F653E1",
          marginLeft: "20px",
          padding: "4px 10px",
          borderRadius: "50px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          fontWeight: "bold",
          fontSize: "16px",
          textTransform: "none",
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            backgroundColor: "#e44bcf",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
          },
          "&:active": {
            backgroundColor: "#d43bbf",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        Post Ads
      </Button>
    );
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const isuserProfile: boolean = useProfilePathCheck();

  return (
    <AppBar
      sx={{
        mt: 0,
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
      position="fixed"
      color="transparent"
      elevation={0}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo */}
          <Typography
            onClick={() => (!isuserProfile ? router.push("/") : null)}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginTop: 1 }}
          >
            <img
              src="/assets/images/logo.png"
              alt="Collabstr Logo"
              style={{ height: "30px", alignSelf: "center" }}
            />
          </Typography>

          {/* Mobile Menu Icon */}
          {!isuserProfile && isMobile && (
            <IconButton
              edge="end"
              color="inherit"
              sx={{ ml: 1 }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Desktop Nav Links */}
          {!isMobile && !isuserProfile && (
            <>
              <Button onClick={() => router.push("/")} color="inherit">
                Home
              </Button>
              <Button onClick={() => router.push("/ads")} color="inherit">
                Ads
              </Button>
              <Button onClick={() => router.push("/orders")} color="inherit">
                Orders
              </Button>
              <Button onClick={() => router.push("/payments")} color="inherit">
                Payment
              </Button>
              <Button onClick={() => router.push("/download")} color="inherit">
                Download
              </Button>
              {/* Post a Campaign Button */}
              {postBtn()}
            </>
          )}

          {/* Avatar for Mobile */}
          {(user || data) && !isMobile && !isuserProfile && (
            <Tooltip title="Click to view options" arrow>
              <IconButton
                edge="end"
                color="inherit"
                sx={{ marginLeft: "10px" }}
                onClick={handleClick}
              >
                <Avatar
                  src={data?.photoURL || user?.photoURL}
                  sx={{ bgcolor: "#FFF3E0", color: "#000" }}
                >
                  {!user?.photoURL && user?.displayName?.[0]}
                </Avatar>
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </Container>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ display: { xs: "block", md: "none" } }} // Show drawer only on mobile
      >
        <Box
          sx={{ width: 250, p: 2 }}
          role="presentation"
          onClick={() => setDrawerOpen(false)}
          onKeyDown={() => setDrawerOpen(false)}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar
              src={data?.photoURL || user?.photoURL}
              sx={{ width: 50, height: 50 }}
            >
              {data?.photoURL || user?.displayName?.[0]}
            </Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant="body1">
                {data?.name || user?.displayName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {data?.email || user?.email}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <List>
            <ListItem
              component="div"
              sx={{ backgroundColor: "#fff" }}
              onClick={() => handleListItemClick("/user")}
            >
              <ListItemText primary="Profile" sx={{ color: "black" }} />
            </ListItem>
            <ListItem
              component="div"
              sx={{ backgroundColor: "#fff" }}
              onClick={() => handleListItemClick("/ads")}
            >
              <ListItemText primary="Ads" sx={{ color: "black" }} />
            </ListItem>
            <ListItem
              component="div"
              onClick={() => handleListItemClick("/orders")}
            >
              <ListItemText primary="Your Orders" sx={{ color: "black" }} />
            </ListItem>
            <ListItem
              component="div"
              onClick={() => handleListItemClick("/payments")}
            >
              <ListItemText primary="Payments" sx={{ color: "black" }} />
            </ListItem>
            <ListItem component="div" onClick={handleSignOut}>
              <ListItemText primary="Logout" sx={{ color: "black" }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Popover for Desktop */}
      <Popover
        id={id}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ p: 2 }}
      >
        <Box
          sx={{
            padding: 2,
            width: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            {user?.displayName}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {user?.email}
          </Typography>
          <Button
            onClick={() => handleListItemClick("/user")}
            fullWidth
            sx={{ mb: 1 }}
          >
            Profile
          </Button>
          <Button
            onClick={() => handleListItemClick("/orders")}
            fullWidth
            sx={{ mb: 1 }}
          >
            Your Orders
          </Button>
          <Button
            onClick={() => handleListItemClick("/payments")}
            fullWidth
            sx={{ mb: 1 }}
          >
            Payments
          </Button>
          <Button
            onClick={handleSignOut}
            fullWidth
            variant="contained"
            color="secondary"
          >
            Logout
          </Button>
        </Box>
      </Popover>
    </AppBar>
  );
};

export default Header;
