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
  Select,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import UploadIcon from "@mui/icons-material/Upload";
import { BaseUrl } from "@/common/utils";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: "900px",
}));

const ProfileImage = styled("img")(({ theme }) => ({
  width: "150px",
  height: "150px",
  borderRadius: "50%",
  objectFit: "cover",
  marginBottom: theme.spacing(2),
  border: `4px solid ${theme.palette.primary.main}`,
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
  const router = useRouter();
  const [imageUri, setImageUri] = useState<string | ArrayBuffer | null>(null);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [platform, setPlatform] = useState<any[]>([]);
  const localStorageItem = localStorage.getItem("userData");
  const data = JSON.parse(localStorageItem);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const item = user?.providerData[0];
        setName(item.displayName);
        setImageUri(item.photoURL);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!data.id) {
          console.error("User ID not found in local storage.");
          return;
        }
        const response = await axios.get(`${BaseUrl}/api/users/${data.id}`);
        setBio(response.data.bio);
        setAddress(response.data.address);
        setImageUri(response.data.photoURL);
        setSelectedGender(response.data.gender);
        setSelectedState(response.data.state);
        setPhoneNumber(response.data.phoneNumber);
        setPlatform(response.data.platform);
        setSelectedCategory(response.data.category);
        setUsername(response.data.username);
        setName(response.data.name);
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

  // const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDob(new Date(event.target.value));
  //   setShowDatePicker(false);
  // };

  const handleSave = async () => {
    try {
      const userData = localStorage.getItem("userData");
      const data = JSON.parse(userData);
      if (!data._id) {
        console.error("User ID not found in local storage.");
        return;
      }

      const updatedData = {
        id: data.id,
        name: name,
        email: data.email,
        username: username,
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
            platformLink:
              platform.find((p) => p.platform === "Instagram")?.platformLink ||
              "",
          },
          {
            platform: "Facebook",
            followers: "",
            platformLink:
              platform.find((p) => p.platform === "Facebook")?.platformLink ||
              "",
          },
          {
            platform: "Youtube",
            followers: "",
            platformLink:
              platform.find((p) => p.platform === "Youtube")?.platformLink ||
              "",
          },
          {
            platform: "Twitter",
            followers: "",
            platformLink:
              platform.find((p) => p.platform === "Twitter")?.platformLink ||
              "",
          },
        ],
        category: selectedCategory,
      };
      await axios
        .post(`${BaseUrl}/api/users`, updatedData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          router.push("/user");
          alert("Profile updated successfully");
        });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <StyledContainer>
      <Typography variant="h5" sx={{ mb: 4 }} gutterBottom>
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
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Instagram"
                variant="outlined"
                margin="normal"
                value={
                  platform.find((p) => p.platform === "Instagram")
                    ?.platformLink || ""
                }
                onChange={(e) => {
                  const updatedPlatform = [...platform];
                  const index = updatedPlatform.findIndex(
                    (p) => p.platform === "Instagram"
                  );
                  if (index !== -1) {
                    updatedPlatform[index].platformLink = e.target.value;
                  } else {
                    updatedPlatform.push({
                      platform: "Instagram",
                      platformLink: e.target.value,
                    });
                  }
                  setPlatform(updatedPlatform);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Facebook"
                variant="outlined"
                margin="normal"
                value={
                  platform.find((p) => p.platform === "Facebook")
                    ?.platformLink || ""
                }
                onChange={(e) => {
                  const updatedPlatform = [...platform];
                  const index = updatedPlatform.findIndex(
                    (p) => p.platform === "Facebook"
                  );
                  if (index !== -1) {
                    updatedPlatform[index].platformLink = e.target.value;
                  } else {
                    updatedPlatform.push({
                      platform: "Facebook",
                      platformLink: e.target.value,
                    });
                  }
                  setPlatform(updatedPlatform);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Youtube"
                variant="outlined"
                margin="normal"
                value={
                  platform.find((p) => p.platform === "Youtube")
                    ?.platformLink || ""
                }
                onChange={(e) => {
                  const updatedPlatform = [...platform];
                  const index = updatedPlatform.findIndex(
                    (p) => p.platform === "Youtube"
                  );
                  if (index !== -1) {
                    updatedPlatform[index].platformLink = e.target.value;
                  } else {
                    updatedPlatform.push({
                      platform: "Youtube",
                      platformLink: e.target.value,
                    });
                  }
                  setPlatform(updatedPlatform);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Twitter"
                variant="outlined"
                margin="normal"
                value={
                  platform.find((p) => p.platform === "Twitter")
                    ?.platformLink || ""
                }
                onChange={(e) => {
                  const updatedPlatform = [...platform];
                  const index = updatedPlatform.findIndex(
                    (p) => p.platform === "Twitter"
                  );
                  if (index !== -1) {
                    updatedPlatform[index].platformLink = e.target.value;
                  } else {
                    updatedPlatform.push({
                      platform: "Twitter",
                      platformLink: e.target.value,
                    });
                  }
                  setPlatform(updatedPlatform);
                }}
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
                label="Address (optional)"
                variant="outlined"
                margin="normal"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
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
              />
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
                   <Input
                    type="date"
                    value={dob ? dob?.toISOString().substr(0, 10) : ""}
                    onChange={handleDateChange}
                    fullWidth
                    margin="normal"
                  /> 
                </ModalContent>
              </Modal>
            </Grid> */}
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
              <Typography
                variant="inherit"
                sx={{ color: "GrayText", fontFamily: "initial" }}
                gutterBottom
              >
                We respect your privacy. Your phone number will be kept
                confidential and will not be disclosed to any third parties.
              </Typography>
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
