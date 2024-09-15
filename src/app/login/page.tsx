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
} from "@mui/material";
import { Visibility, VisibilityOff, Mail } from "@mui/icons-material";
import { auth, provider, signInWithPopup } from "../firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    // Handle email/password login here
    // For simplicity, this is just a placeholder
    console.log("Logging in with email:", email, "and password:", password);
  };

  const handleGmailLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      console.log("User logged in with Gmail");
      router.push("/");
    } catch (error) {
      console.error("Error logging in with Gmail:", error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 8,
      }}
    >
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h4" component="div" gutterBottom>
          Welcome Back!
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Login to access your influencer dashboard.
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
  );
}
