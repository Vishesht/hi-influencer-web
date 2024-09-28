"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Grid,
  Paper,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { BaseUrl } from "@/common/utils";
import Image from "next/image";
import { sendNotification } from "@/api/commonApi";

const indianStates = [
  "Andhra Pradesh",
  "Bihar",
  "Delhi",
  "Goa",
  "Gujarat",
  "Jammu and Kashmir",
  "Maharashtra",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Uttar Pradesh",
  "Karnataka",
];

const socialMediaPlatforms = [
  "Instagram",
  "Youtube",
  "Facebook",
  "Twitter",
  "LinkedIn",
  "Telegram",
];

const categories = ["Influencer", "Blogger", "Content Creator", "Photographer"];

const verificationText = "Your account has been successfully verified..";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    state: "",
    socialMedia: "",
    gender: "",
    category: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/api/admin/userlist`);
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = users;

      if (filters.state) {
        filtered = filtered.filter((user) => user.state === filters.state);
      }
      if (filters.socialMedia) {
        filtered = filtered.filter((user) =>
          user.platform.some((p) => p.platform === filters.socialMedia)
        );
      }
      if (filters.gender) {
        filtered = filtered.filter((user) => user.gender === filters.gender);
      }
      if (filters.category) {
        filtered = filtered.filter(
          (user) => user.category === filters.category
        );
      }

      setFilteredUsers(filtered);
    };

    applyFilters();
  }, [filters, users]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const verifyUser = async (user) => {
    try {
      const res = await axios.put(
        `${BaseUrl}/api/users/${user?.id}/influencer?verified=true`
      );
      const title = "Account Verified";
      const desc =
        "Your account has been successfully verified. You are now listed and eligible to start receiving deals.";
      if (res.status == 200) {
        sendNotification(user.email, title, desc);
        setSnackbarOpen(true);
        setSnackbarMessage(verificationText);
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Container maxWidth="lg" sx={{ mb: 2 }}>
      <Typography variant="h4" gutterBottom>
        Admin Users
      </Typography>

      <Box mb={3}>
        <Typography variant="h6">Filters</Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>State</InputLabel>
              <Select
                name="state"
                onChange={handleFilterChange}
                value={filters.state}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {indianStates.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Social Media</InputLabel>
              <Select
                name="socialMedia"
                onChange={handleFilterChange}
                value={filters.socialMedia}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {socialMediaPlatforms.map((platform) => (
                  <MenuItem key={platform} value={platform}>
                    {platform}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                onChange={handleFilterChange}
                value={filters.gender}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                onChange={handleFilterChange}
                value={filters.category}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Typography variant="h6">User List</Typography>
      <Grid container spacing={3}>
        {filteredUsers.map((user) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Paper
                elevation={3}
                sx={{ padding: 2, backgroundColor: "white", boxShadow: 3 }}
              >
                <Card>
                  <CardContent>
                    <Image
                      src={user.photoURL}
                      alt="User Image"
                      width={200}
                      height={200}
                      objectFit="cover"
                    />
                    <Typography variant="h6">{user.name}</Typography>
                    <Typography variant="subtitle1">
                      Username: {user.username}
                    </Typography>
                    <Typography variant="subtitle1">
                      Email: {user.email}
                    </Typography>
                    <Typography variant="subtitle1">
                      State: {user.state}
                    </Typography>
                    <Typography variant="subtitle1">
                      Gender: {user.gender}
                    </Typography>
                    <Typography variant="subtitle1">
                      Category: {user.category}
                    </Typography>
                    {user?.isInfluencer && !user?.verified && (
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={() => verifyUser(user)}
                      >
                        Verify
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminUsers;
