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
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  BaseUrl,
  cleanImageUrl,
  indianStates,
  imgPlaceholderImg,
  socialMediaPlatforms,
  genderList,
  categories,
} from "@/common/utils";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth, storage } from "../firebase";
import { Clear, Edit as EditIcon } from "@mui/icons-material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { add } from "@/lib/features/login/loginSlice";
import AlertDialog from "@/components/Alert";
import { showAlert } from "@/lib/features/alert/alertSlice";
import PackagesSetup from "@/components/packagesSetup";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loading from "@/components/LoadingSpinner";
// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: "900px",
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

const EditProfile: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [imageUri, setImageUri] = useState<string | null>();
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [platform, setPlatform] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>();
  const [loader, setLoader] = useState<any>();
  const [newPlatform, setNewPlatform] = useState({
    name: "",
    link: "",
    followers: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const data = useAppSelector((state) => state.login.userData);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const item = user?.providerData[0];
        item?.displayName && setName(item?.displayName);
        setImageUri(item?.photoURL);
      } else {
        setName(data?.name);
        setImageUri(data?.photoURL);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!data.id) {
          console.error("User ID not found in redux.");
          return;
        }
        const response = await axios.get(`${BaseUrl}/api/users/${data.id}`);
        setUserData(response.data);
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
        setPackages(response?.data?.packages);
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
    setLoader(true);
    if (file) {
      const storageRef = ref(storage, `images/${username + "-" + file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setImageUri(downloadURL);
        setLoader(false);
      } catch (error) {
        console.error("Error uploading file:", error);
        setLoader(false);
      }
    }
  };

  const handleAlert = (msg) => {
    dispatch(
      showAlert({
        message: msg,
        confirmText: "Ok",
        // cancelText: "No",
        onConfirm: () => console.log("Confirmed"),
        // onCancel: () => console.log("Cancelled"),
      })
    );
  };

  const validateIndianPhoneNumber = (number) => {
    const phoneNumberPattern = /^[789]\d{9}$/;
    return phoneNumberPattern.test(number);
  };

  const handleSave = async () => {
    try {
      if (!name) {
        handleAlert("Name cannot be empty. Please provide a valid name.");
        return;
      } else if (!username) {
        handleAlert(
          "Username cannot be empty. Please provide a valid username."
        );
        return;
      } else if (!validateUsername(username)) {
        handleAlert(
          "Username is not valid. It must contain only lowercase letters (a-z), numbers (0-9), and underscores (_). Please ensure there are no spaces or special characters."
        );
        return;
      } else if (phoneNumber && !validateIndianPhoneNumber(phoneNumber)) {
        handleAlert("Please enter a valid phone number");
        return;
      }
      setLoader(true);
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
        packages: packages,
        isClient: userData?.isClient,
      };
      await axios
        .post(`${BaseUrl}/api/users`, updatedData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          setLoader(false);
          router.push("/user");
          dispatch(add({ ...data, name: name, photoURL: imageUri }));
        });
    } catch (error) {
      setLoader(false);
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
          followers: newPlatform.followers,
        },
      ]);
      setNewPlatform({ name: "", link: "", followers: "" });
      setOpenDialog(false);
    }
  };

  const handlePlatformChange = (e: any) => {
    const { name, value } = e.target;
    setNewPlatform((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavedPackages = (savedPackages) => {
    setPackages(savedPackages);
  };

  const imgUrl = cleanImageUrl(imageUri);

  return (
    <>
      <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
        <IconButton
          onClick={() => router.back()} // Navigates back to the previous page
          sx={{
            color: "inherit", // You can customize the color if needed
            mr: 1,
            mb: 1,
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" gutterBottom>
          Edit Profile
        </Typography>
      </Box>
      <StyledContainer>
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
                <Image
                  src={imgUrl}
                  alt="User Image"
                  width={150}
                  height={150}
                  // layout="responsive"
                  style={{
                    objectFit: "cover",
                  }}
                />
                <EditIconStyled
                  // component="span"
                  color="primary"
                  onClick={() =>
                    document.getElementById("profile-image-upload")?.click()
                  }
                >
                  <EditIcon />
                </EditIconStyled>
              </EditIconWrapper>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center", mt: 2 }}
              >
                <p>{data?.email}</p>
              </Grid>
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
                <Grid
                  item
                  xs={12}
                  sm={6}
                  key={index}
                  style={{ position: "relative" }}
                >
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
                  <IconButton
                    onClick={(p) => {
                      const newItems = platform.filter((_, i) => i !== index);
                      setPlatform(newItems);
                    }}
                    style={{
                      position: "absolute",
                      top: 32,
                      right: -6,
                      color: "red", // Optional: Customize the icon color
                    }}
                  >
                    <Clear />
                  </IconButton>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button variant="outlined" onClick={() => setOpenDialog(true)}>
                  Add Your Social Media
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
              {!userData?.isClient && (
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
              )}
            </Grid>
            {!userData?.isClient && (
              <PackagesSetup
                packages={packages}
                onSavePackages={handleSavedPackages}
              />
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{
                width: "100%",
                marginTop: 36,
                marginBottom: 22,
              }}
              onClick={handleSave}
            >
              Save
            </Button>
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
              label={
                newPlatform.name === "Youtube" ? "Subscribers" : "Followers"
              }
              fullWidth
              variant="outlined"
              name="followers"
              value={newPlatform.followers}
              onChange={handlePlatformChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleAddPlatform}>Add</Button>
          </DialogActions>
        </Dialog>
        <AlertDialog />
        <Loading loading={loader} />
      </StyledContainer>
    </>
  );
};

export default EditProfile;
