"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { BaseUrl } from "@/common/utils";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth, storage } from "../firebase";
import { Edit as EditIcon } from "@mui/icons-material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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

const EditIconWrapper = styled("div")({
  position: "relative",
  display: "inline-block",
});

const EditIconStyled = styled(IconButton)({
  position: "absolute",
  bottom: 8,
  right: 8,
  backgroundColor: "white",
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)", // Adding shadow here
  "&:hover": {
    backgroundColor: "lightgrey",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)", // Darker shadow on hover
  },
});

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

const socialMediaPlatforms = [
  "Instagram",
  "Facebook",
  "Youtube",
  "Twitter",
  "Telegram",
  "LinkedIn",
];

const EditProfile: React.FC = () => {
  const router = useRouter();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [platform, setPlatform] = useState<any[]>([]);
  const [newPlatform, setNewPlatform] = useState({
    name: "",
    link: "",
    description: "",
  });
  const [openDialog, setOpenDialog] = useState(false);

  const localStorageItem = localStorage.getItem("userData");
  const data = localStorageItem ? JSON.parse(localStorageItem) : {};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const item = user?.providerData[0];
        item?.displayName && setName(item?.displayName);
        setImageUri(item?.photoURL);
      } else {
        setName(data?.name);
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
        response.data.photoURL && setImageUri(response.data.photoURL);
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

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const storageRef = ref(storage, `images/${file.name + "-" + username}`);
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        data.photoURL = downloadURL;
        localStorage.setItem("userData", JSON.stringify(data));
        setImageUri(downloadURL);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleSave = async () => {
    try {
      if (!name || !username || !validateUsername(username)) {
        alert("Please fill all required fields correctly.");
        return;
      }

      const updatedData = {
        id: data.id,
        name,
        email: data.email,
        username,
        isInfluencer: false,
        phoneNumber,
        gender: selectedGender,
        photoURL: imageUri,
        bio,
        state: selectedState,
        address,
        platform,
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

  const validateUsername = (username: string) =>
    /^[a-z0-9_]+$/.test(username.trim());

  const handleAddPlatform = () => {
    if (newPlatform.name && newPlatform.link) {
      setPlatform([
        ...platform,
        {
          platform: newPlatform.name,
          platformLink: newPlatform.link,
          description: newPlatform.description,
        },
      ]);
      setNewPlatform({ name: "", link: "", description: "" });
      setOpenDialog(false);
    }
  };

  const handlePlatformChange = (e: any) => {
    const { name, value } = e.target;
    setNewPlatform((prev) => ({ ...prev, [name]: value }));
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
            <EditIconWrapper>
              <ProfileImage
                src={
                  imageUri || "https://randomuser.me/api/portraits/men/41.jpg"
                }
                alt="Profile Image"
              />
              <EditIconStyled
                // component="span"
                color="primary"
                // onClick={() =>
                //   document.getElementById("profile-image-upload")?.click()
                // }
              >
                <EditIcon />
              </EditIconStyled>
            </EditIconWrapper>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
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
                required
                inputProps={{ pattern: "[a-z0-9]*" }}
                helperText="Username must be lowercase and contain no spaces."
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
            {platform.map((p, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <TextField
                  fullWidth
                  label={p.platform}
                  variant="outlined"
                  margin="normal"
                  value={p.platformLink}
                  onChange={(e) => {
                    const updatedPlatform = [...platform];
                    updatedPlatform[index].platformLink = e.target.value;
                    setPlatform(updatedPlatform);
                  }}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button variant="outlined" onClick={() => setOpenDialog(true)}>
                Add New Social Media
              </Button>
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
                inputProps={{ pattern: "[0-9]{10}" }}
                helperText="Phone number must be 10 digits."
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

      {/* Dialog for Adding New Social Media */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Social Media</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Platform Name</InputLabel>
            <Select
              name="name"
              value={newPlatform.name}
              onChange={handlePlatformChange}
              label="Platform Name"
            >
              {socialMediaPlatforms.map((platform) => (
                <MenuItem key={platform} value={platform}>
                  {platform}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Platform Link"
            fullWidth
            variant="outlined"
            name="link"
            value={newPlatform.link}
            onChange={handlePlatformChange}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            variant="outlined"
            name="description"
            value={newPlatform.description}
            onChange={handlePlatformChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddPlatform}>Add</Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default EditProfile;
