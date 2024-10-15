import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Select,
  InputLabel,
  FormControl,
  Chip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { BaseUrl, imgPlaceholderImg } from "@/common/utils";
import { add } from "@/lib/features/login/loginSlice";
import { useAppSelector } from "@/lib/hooks";
import { validatePlatforms, validateUsername } from "@/common/validations";

// List of social media platforms
export const socialMediaPlatforms = [
  "Instagram",
  "Youtube",
  "Facebook",
  // "Twitter",
  // "LinkedIn",
  // "Telegram",
];

const SocialMediaLinks = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [linkData, setLinkData] = useState<any>({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [userAvailableData, setUserAvailableData] = useState("");
  const router = useRouter();
  const data = useAppSelector((state) => state.login.userData);
  const dispatch = useDispatch();

  // Handle platform selection
  const handlePlatformChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selected = event.target.value as string[];
    setSelectedPlatforms(selected);

    // Initialize link data for newly selected platforms
    const newLinkData = { ...linkData };
    selected.forEach((platform) => {
      if (!newLinkData[platform]) {
        newLinkData[platform] = { platformLink: "", followers: "" };
      }
    });
    setLinkData(newLinkData);
  };

  // Handle input change for individual platform link and followers
  const handleInputChange = (
    platform: string,
    field: string,
    value: string
  ) => {
    setLinkData((prevData: any) => ({
      ...prevData,
      [platform]: {
        ...prevData[platform],
        [field]: value,
      },
    }));
  };
  // Handle form submission with API call
  const handleSubmit = async () => {
    if (!userName) {
      alert("Username cannot be empty. Please provide a valid username.");
      return;
    } else if (!validateUsername(userName)) {
      alert(
        "It must contain only lowercase letters (a-z), numbers (0-9), and underscores (_). Please ensure there are no spaces or special characters."
      );
      return;
    }
    if (userName.length < 6) {
      alert("Username must be at least 6 characters long");
      return null;
    }
    if (phoneNumber.length && phoneNumber.length < 10) {
      alert("Phone number must be at least 10 digits long");
      return;
    }
    if (!userAvailableData?.available) {
      alert("Username not available");
      return;
    }
    if (selectedPlatforms.length > 0 && phoneNumber) {
      const platformData = selectedPlatforms.map((platform) => ({
        platform: platform,
        platformLink: linkData[platform]?.platformLink || "",
        followers: linkData[platform]?.followers || "",
      }));
      const validationResult = validatePlatforms(platformData);
      if (validationResult?.error) {
        alert(validationResult?.message);
        return;
      }
      const updatedData = {
        id: data.id,
        name: data.name,
        email: data.email,
        phoneNumber: phoneNumber,
        platform: platformData,
        username: userName,
        photoURL: imgPlaceholderImg,
        isClient: false,
      };
      try {
        await axios.post(`${BaseUrl}/api/users`, updatedData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        dispatch(add({ ...data, phoneNumber: phoneNumber }));
        router.push("/edit-profile");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  // Navigate to home page without submitting the form
  const handleSkip = () => {
    router.push("/");
  };

  const checkUsernameAvailability = async (username) => {
    if (!username) {
      let msg = "Username cannot be empty. Please provide a valid username.";
      return { available: false, message: msg };
    }
    if (!validateUsername(username)) {
      let msg =
        "It must contain only lowercase letters (a-z), numbers (0-9), and underscores (_). Please ensure there are no spaces or special characters.";
      return { available: false, message: msg };
    }
    if (username.length < 6) {
      let msg = "Username must be at least 6 characters long";
      return { available: false, message: msg };
    }
    try {
      // Make a GET request to the backend API to check username availability
      const response = await axios.get(`${BaseUrl}/api/check-username`, {
        params: {
          username: username,
        },
      });
      if (response.data.available) {
        console.log("Username is available");
        return { available: true, message: response.data.message };
      } else {
        console.log("Username is taken");
        return { available: false, message: response.data.message };
      }
    } catch (error) {
      console.error("Error checking username availability:", error);
      return {
        available: false,
        message: "Error occurred while checking username",
      };
    }
  };

  const handleCheckUsername = async (user) => {
    const result: any = await checkUsernameAvailability(user);
    setUserAvailableData(result);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <TextField
          label="User Name"
          variant="outlined"
          fullWidth
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
            e.target.value.length > 5 && handleCheckUsername(e.target.value);
          }}
          helperText={userName?.length > 5 && userAvailableData.message}
          FormHelperTextProps={{
            style: { color: userAvailableData.available ? "green" : "red" },
          }}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          type="number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Typography
          variant="inherit"
          sx={{ color: "GrayText", fontFamily: "initial" }}
          gutterBottom
        >
          We respect your privacy. Your phone number will be kept confidential
          and will not be disclosed to any third parties.
        </Typography>
      </div>

      {/* Multi-select dropdown for selecting social media platforms */}
      <FormControl
        fullWidth
        variant="outlined"
        style={{ marginBottom: "24px" }}
      >
        <InputLabel id="platform-label">Select Platforms</InputLabel>
        <Select
          labelId="platform-label"
          multiple
          value={selectedPlatforms}
          onChange={handlePlatformChange}
          label="Select Platforms"
          renderValue={(selected) => (
            <div>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  style={{ marginRight: "5px" }}
                />
              ))}
            </div>
          )}
        >
          {socialMediaPlatforms.map((platform) => (
            <MenuItem key={platform} value={platform}>
              {platform}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Render input fields for each selected platform */}
      {selectedPlatforms.map((platform) => {
        return (
          <div key={platform} style={{ marginBottom: "20px" }}>
            <h4 style={{ marginBottom: 12 }}>{platform}</h4>
            <TextField
              label={`Enter ${platform} Link`}
              variant="outlined"
              fullWidth
              value={linkData[platform]?.platformLink || ""}
              onChange={(e) =>
                handleInputChange(platform, "platformLink", e.target.value)
              }
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label={
                platform === "Youtube"
                  ? "Number of Subscribers"
                  : "Number of Followers"
              }
              variant="outlined"
              type="number"
              fullWidth
              value={linkData[platform]?.followers || ""}
              onChange={(e) =>
                handleInputChange(platform, "followers", e.target.value)
              }
              style={{ marginBottom: "10px" }}
            />
          </div>
        );
      })}

      {/* Submit and Skip buttons */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
        {/* <Button variant="outlined" color="secondary" onClick={handleSkip}>
          Skip
        </Button> */}
      </div>
    </div>
  );
};

export default SocialMediaLinks;
