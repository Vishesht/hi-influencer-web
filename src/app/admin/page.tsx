"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Snackbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
}));

const AdminLogin: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleLogin = () => {
    if (email === "admin@hiin.com" && password === "Admin@001") {
      // Proceed with admin access
      alert("Login successful!"); // You can redirect or handle the login here
      router.push("/admin/dashboard");
    } else {
      setSnackbarMessage("Invalid email or password!");
      setOpenSnackbar(true);
    }
  };

  return (
    <StyledContainer maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Admin Login
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
        sx={{ marginTop: 2 }}
      >
        Login
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </StyledContainer>
  );
};

export default AdminLogin;
