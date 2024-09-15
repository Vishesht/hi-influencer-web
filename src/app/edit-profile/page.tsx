"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  Divider,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";
import { BaseUrl } from "@/common/utils";

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: "900px",
}));

const ProfileImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "36%",
  borderRadius: "50%",
  objectFit: "cover",
  marginBottom: theme.spacing(2),
  border: `4px solid ${theme.palette.primary.main}`,
}));

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  maxWidth: "500px",
  margin: "auto",
}));

const ModalHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const ModalCloseButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.grey[500],
}));

const categories = ["Influencer", "Blogger", "Content Creator", "Photographer"];
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
const genderList = ["Male", "Female", "Others"];

const EditProfile: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | ArrayBuffer | null>(null);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [fbLink, setFbLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [platform, setPlatform] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve the user ID from local storage
        const userData = localStorage.getItem("userData");
        const data = JSON.parse(userData);

        if (!data._id) {
          console.error("User ID not found in local storage.");
          return;
        }

        // Fetch user data from the API
        const response = await axios.get(`${BaseUrl}/api/users/${data._id}`);
        console.log("first-response", response);
        setUserData(response.data);
        setImageUri(response.data.photoURL);
        setSelectedGender(response.data.gender);
        setSelectedState(response.data.state);
        // setDob(new Date(response.data.dob));
        setPhoneNumber(response.data.phoneNumber);
        setPlatform(response.data.platform);
        // setSelectedCategory(response.data.category);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUri(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDob(new Date(event.target.value));
    setShowDatePicker(false);
  };

  const handleSave = async () => {
    try {
      const userData = localStorage.getItem("userData");
      const data = JSON.parse(userData);
      if (!data._id) {
        console.error("User ID not found in local storage.");
        return;
      }

      const updatedData = {
        _id: data._id,
        email: data.email,
        isInfluencer: false,
        phoneNumber: phoneNumber,
        gender: selectedGender,
        // dob: dob?.toISOString().split("T")[0],
        bio: bio,
        state: selectedState,
        address: address,
        platform: [
          {
            platform: "Instagram",
            followers: "",
            platformLink: platform[0].platformLink,
          },
          {
            platform: "Facebook",
            followers: "",
            platformLink: platform[1].platformLink,
          },
          {
            platform: "Youtube",
            followers: "",
            platformLink: platform[2].platformLink,
          },
          {
            platform: "Twitter",
            followers: "",
            platformLink: platform[3].platformLink,
          },
        ],
        category: selectedCategory,
      };
      const input = JSON.stringify(updatedData);
      await axios.put(`${BaseUrl}/api/users`, input, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!userData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <StyledContainer>
      <Typography variant="h4" sx={{ mb: 4 }} gutterBottom>
        Edit Profile
      </Typography>

      <Grid container spacing={4}>
        {/* Profile Image Section */}
        <Grid item xs={12} md={4} textAlign="center">
          <label htmlFor="profile-image-upload">
            <input
              id="profile-image-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <ProfileImage
              src={imageUri || "https://randomuser.me/api/portraits/men/41.jpg"}
              alt="Profile Image"
            />
            <Button
              variant="contained"
              component="span"
              startIcon={<UploadIcon />}
              color="primary"
              style={{ marginTop: 16 }}
            >
              Change Photo
            </Button>
          </label>
        </Grid>

        {/* Form Fields */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                defaultValue={userData.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
                defaultValue={userData.bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Instagram"
                variant="outlined"
                margin="normal"
                defaultValue={
                  platform?.find((p) => p.platform === "Instagram")
                    ?.platformLink || ""
                }
                onChange={(e) => setInstagramLink(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Facebook"
                variant="outlined"
                margin="normal"
                defaultValue={
                  platform?.find((p) => p.platform === "Facebook")
                    ?.platformLink || ""
                }
                onChange={(e) => setFbLink(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Youtube"
                variant="outlined"
                margin="normal"
                defaultValue={
                  platform?.find((p) => p.platform === "Youtube")
                    ?.platformLink || ""
                }
                onChange={(e) => setYoutubeLink(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Twitter"
                variant="outlined"
                margin="normal"
                defaultValue={
                  platform?.find((p) => p.platform === "Twitter")
                    ?.platformLink || ""
                }
                onChange={(e) => setTwitterLink(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <Select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  renderValue={(value) => value || "Select Gender"}
                  displayEmpty
                >
                  {genderList.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {gender}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <Select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  renderValue={(value) => value || "Select State"}
                  displayEmpty
                >
                  {indianStates.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                margin="normal"
                defaultValue={userData.address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <TextField
                fullWidth
                label="Date of Birth"
                variant="outlined"
                margin="normal"
                value={dob ? dob?.toISOString().split("T")[0] : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowDatePicker(true)}>
                        <CalendarTodayIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onClick={() => setShowDatePicker(true)}
                readOnly
              /> */}
              <Modal
                open={showDatePicker}
                onClose={() => setShowDatePicker(false)}
                aria-labelledby="date-picker-modal-title"
                aria-describedby="date-picker-modal-description"
              >
                <ModalContent>
                  <ModalHeader>
                    <Typography variant="h6">Select Date</Typography>
                    <ModalCloseButton onClick={() => setShowDatePicker(false)}>
                      <CloseIcon />
                    </ModalCloseButton>
                  </ModalHeader>
                  <Divider />
                  {/* <Input
                    type="date"
                    value={dob ? dob?.toISOString().substr(0, 10) : ""}
                    onChange={handleDateChange}
                    fullWidth
                    margin="normal"
                  /> */}
                </ModalContent>
              </Modal>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  renderValue={(value) => value || "Select Category"}
                  displayEmpty
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                margin="normal"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="tel"
              />
            </Grid>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: 36 }}
              onClick={handleSave}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default EditProfile;
