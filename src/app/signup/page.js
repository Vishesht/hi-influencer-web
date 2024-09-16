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
  Toolbar,
} from "@mui/material";
import { Visibility, VisibilityOff, Email } from "@mui/icons-material";
import { HeaderWrapper, IconWrapper } from "../login/page";
import { registerUser } from "@/api/registerUser";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const res = await registerUser(name, email, password);
      alert(res.message);
      localStorage.setItem("userData", JSON.stringify(res.user));
      router.push("/");
    } catch (error) {
      console.log("first21", error);
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
          paddingTop: 8,
        }}
      >
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h4" component="div" gutterBottom>
            Create Your Account
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Join us and connect with top influencers!
          </Typography>
        </Box>
        <Box
          component="form"
          noValidate
          onSubmit={handleSignUp}
          sx={{ width: "100%", mt: 1 }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
                  <Email />
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
            autoComplete="new-password"
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Visibility />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            Sign Up
          </Button>
          <Divider sx={{ my: 2 }}>Or</Divider>
          <Typography variant="body2" color="textSecondary" align="center">
            Already have an account?{" "}
            <Link
              href="/login"
              variant="body2"
              sx={{ fontWeight: "bold", color: "#1D4ED8" }}
            >
              Log In
            </Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
}
