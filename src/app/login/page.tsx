"use client";
import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Divider,
  styled,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Visibility, VisibilityOff, Mail } from "@mui/icons-material";
import { auth, provider, signInWithPopup } from "../firebase";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BaseUrl, imgPlaceholderImg } from "@/common/utils";
import { loginUser } from "@/api/loginUser";
import { useAppDispatch } from "@/lib/hooks";
import { add } from "@/lib/features/login/loginSlice";
import ReusableDialog from "@/components/LoginTypePopup";
import SocialMediaLinks from "@/components/SocialMediaLinks";
import ForgotPasswordPopup from "@/components/ForgotPasswordPopup";
import Loading from "@/components/LoadingSpinner";

const HeaderWrapper = styled(AppBar)({
  top: 0,
  left: 0,
  right: 0,
  position: "absolute",
  backgroundColor: "transparent", // or any color you want
  boxShadow: "none", // Remove shadow if desired
});

// Styled component for the icon button
const IconWrapper = styled(IconButton)({
  position: "absolute",
  top: 16,
  left: 16,
});

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setemailError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSocialMediaDialog, setOpenSocialMediaDialog] = useState(false);
  const [response, setResponse] = useState<any>();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleEmailChange = (e) => {
    const value = e.target.value.toLowerCase();
    setEmail(value);

    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      setemailError(true);
    } else {
      setemailError(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async (event: any) => {
    event.preventDefault();
    setLoader(true);
    try {
      const res = await loginUser(email, password);
      dispatch(add(res.user));
      router.push("/");
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log("first", error);
    }
  };

  const handleGmailLogin = async () => {
    try {
      setLoader(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user.email) {
        const userData = {
          name: user.displayName || "Unknown User",
          email: user.email,
          gmailLogin: true,
        };

        await axios
          .post(`${BaseUrl}/api/login`, userData, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            setLoader(false);

            if (response?.data?.user?.firstLogin) {
              setResponse(response?.data);
              setOpenDialog(true);
            } else {
              dispatch(add(response.data.user));
              router.push("/");
            }
          })
          .catch((err) => {
            setLoader(false);
            console.log("Something wrong. Please try again.", err);
          });
      }
    } catch (error) {
      setLoader(false);
      console.error(
        "Error logging in with Gmail or sending data to API:",
        error
      );
    }
  };

  const handleRoleSelection = (role) => {
    if (role === "brand") {
      handleSubmit();
    } else {
      dispatch(add(response?.user));
      setOpenSocialMediaDialog(true);
    }
    setOpenDialog(false);
  };

  const handleSubmit = async () => {
    const updatedData = {
      id: response.user.id,
      name: response.user.name,
      email: response.user.email,
      isClient: true,
      photoURL: imgPlaceholderImg,
    };
    setLoader(true);
    try {
      await axios.post(`${BaseUrl}/api/users`, updatedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoader(false);
      dispatch(add(response.user));
      router.push("/");
    } catch (error) {
      setLoader(false);
      console.error("Error updating profile:", error);
    }
  };

  const handleForgotPasswordClick = () => {
    setIsPopupOpen(true);
  };

  return (
    <>
      <HeaderWrapper>
        <Toolbar>
          <IconWrapper>
            <img
              src="/assets/images/logo.png"
              alt="Icon"
              style={{ height: "30px" }}
            />
          </IconWrapper>
        </Toolbar>
      </HeaderWrapper>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 24,
        }}
      >
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h4" component="div" gutterBottom>
            Welcome to Hi-Infuencer
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Connect with top Instagram, YouTube, and Facebook influencers to
            create engaging content and promote your brand effectively.
          </Typography>
        </Box>
        <Box
          component="form"
          noValidate
          onSubmit={handleLogin}
          sx={{ width: "100%", pt: 1, pb: 4 }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Visibility />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 1,
              backgroundColor: "#1D4ED8",
              "&:hover": { backgroundColor: "#1A3A8E" },
            }}
          >
            Log In
          </Button>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="text"
              onClick={handleForgotPasswordClick}
              sx={{ fontSize: 12 }}
            >
              Forgot Password?
            </Button>
          </Box>
          <Divider sx={{ my: 2 }}>Or log in with</Divider>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Mail />}
            onClick={handleGmailLogin}
            sx={{ mb: 2 }}
          >
            Log in with Gmail
          </Button>
          <Typography variant="body2" color="textSecondary" align="center">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              variant="body2"
              sx={{ fontWeight: "bold", color: "#1D4ED8" }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
        {/* Role Selection Dialog */}
        <ReusableDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          title="Select Your Role"
          content="Please choose your role:"
          actions={
            <>
              <Button onClick={() => handleRoleSelection("creator")}>
                Join as Creator/Influencer
              </Button>
              <Button onClick={() => handleRoleSelection("brand")}>
                Join as Brand/Client
              </Button>
            </>
          }
        />
        <Loading loading={loader} />

        {/* Social Media Input Dialog */}
        <ReusableDialog
          open={openSocialMediaDialog}
          onClose={() => setOpenSocialMediaDialog(false)}
          title="Enter Your Social Media Details"
          content={<SocialMediaLinks />}
        />
        <ForgotPasswordPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />
      </Container>
    </>
  );
}
