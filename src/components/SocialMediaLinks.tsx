import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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

// List of social media platforms
export const socialMediaPlatforms = [
  "Instagram",
  "Youtube",
  "Facebook",
  "Twitter",
  "LinkedIn",
  "Telegram",
];

const SocialMediaLinks = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [linkData, setLinkData] = useState<any>({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
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
    if (selectedPlatforms.length > 0 && phoneNumber) {
      const platformData = selectedPlatforms.map((platform) => ({
        platform: platform,
        platformLink: linkData[platform]?.platformLink || "",
        followers: linkData[platform]?.followers || "",
      }));

      const updatedData = {
        id: data.id,
        name: data.name,
        email: data.email,
        phoneNumber: phoneNumber,
        platform: platformData,
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
        router.push("/");
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

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
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
      {selectedPlatforms.map((platform) => (
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
            label="Number of Followers"
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
      ))}

      {/* Submit and Skip buttons */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
        {/* <Button variant="outlined" color="secondary" onClick={handleSkip}>
          Skip
        </Button> */}
      </div>

      {/* Display the added social media links */}
      {socialLinks.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Platform</TableCell>
                <TableCell>Link</TableCell>
                <TableCell>Followers</TableCell>
                <TableCell>ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {socialLinks.map((linkData, index) => (
                <TableRow key={index}>
                  <TableCell>{linkData.platform}</TableCell>
                  <TableCell>
                    <a
                      href={linkData.platformLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {linkData.platformLink}
                    </a>
                  </TableCell>
                  <TableCell>{linkData.followers}</TableCell>
                  <TableCell>{linkData._id.$oid}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default SocialMediaLinks;
