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
import { BaseUrl } from "@/common/utils";
import { loginUser } from "@/api/loginUser";
import { useAppDispatch } from "@/lib/hooks";
import { add } from "@/lib/features/login/loginSlice";

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

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async (event: any) => {
    event.preventDefault();

    try {
      const res = await loginUser(email, password);
      alert(res.message);
      dispatch(add(res.user));
      router.push("/");
    } catch (error) {
      console.log("first", error);
    }
  };

  const handleGmailLogin = async () => {
    try {
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
            dispatch(add(response.data.user));
          })
          .catch((err) =>
            console.log("Something wrong. Please try again.", err)
          );
      }
    } catch (error) {
      console.error(
        "Error logging in with Gmail or sending data to API:",
        error
      );
    }
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
          sx={{ width: "100%", mt: 1 }}
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
            onChange={(e) => setEmail(e.target.value)}
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
              mb: 2,
              backgroundColor: "#1D4ED8",
              "&:hover": { backgroundColor: "#1A3A8E" },
            }}
          >
            Log In
          </Button>
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
      </Container>
    </>
  );
}
