"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Grid,
  Box,
} from "@mui/material";
import SavedPackage from "./SavedPackage";
import { validatePromotion } from "@/common/validations";

const PackagesSetup = ({ packages, onSavePackages }) => {
  const [selectedPackage, setSelectedPackage] = useState("");
  const [formData, setFormData] = useState({});
  const [savedPackages, setSavedPackages] = useState([]);

  useEffect(() => {
    if (packages?.length > 0) {
      setSavedPackages(packages);
    }
  }, [packages]);

  const packagesData = [
    {
      name: "Promotions",
      description:
        "Promote through video, images, or story posts to maximize engagement and visibility.",
    },
    // {
    //   name: "Free Promotion",
    //   description:
    //     "Offer a no-cost promotion option to attract potential clients and build your audience.",
    // },
    // {
    //   name: "Ask for Follow",
    //   description:
    //     "Charge users a fee to follow you, enhancing engagement and fostering community.",
    // },
    // {
    //   name: "Invitation",
    //   description:
    //     "Invite clients to parties, clubs, or restaurants for exclusive promotional events.",
    // },
    // {
    //   name: "Join the Trip with Influencer",
    //   description:
    //     "Allow clients to join you on trips, providing unique experiences and opportunities for collaboration.",
    // },
    {
      name: "Book Appointment",
      description:
        "Clients can schedule appointments for personalized services like makeup or consulting sessions.",
    },
    {
      name: "Chat",
      description:
        "Set a price for clients to chat with you, enhancing interaction and connection.",
    },
  ];

  const platforms = ["Facebook", "Instagram", "YouTube"];

  const handlePackageChange = (e) => {
    const selected = e.target.value;
    setSelectedPackage(selected);
    setFormData({});
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (selectedPackage) {
      const packageToSave = {
        name: selectedPackage,
        data: formData,
      };
      const validation = validatePromotion(packageToSave);
      if (selectedPackage === "Promotions" && validation?.length > 0) {
        alert(validation[0]);
        return null;
      } else if (selectedPackage === "Chat" && validation?.length > 0) {
        alert(validation[0]);
        return null;
      } else if (
        selectedPackage === "Book Appointment" &&
        validation?.length > 0
      ) {
        alert(validation[0]);
        return null;
      }
      const updatedPackages = [...savedPackages, packageToSave];
      setSavedPackages(updatedPackages);
      onSavePackages(updatedPackages);
      setSelectedPackage("");
      setFormData({});
    }
  };

  const renderPackageDetails = () => {
    switch (selectedPackage) {
      case "Promotions":
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Select
                  name="platform"
                  value={formData.platform || ""}
                  onChange={handleInputChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select a platform
                  </MenuItem>
                  {platforms.map((platform) => (
                    <MenuItem key={platform} value={platform}>
                      {platform}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Price for Video"
                name="videoPrice"
                type="number"
                value={formData.videoPrice || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Price for Images"
                name="imagePrice"
                type="number"
                value={formData.imagePrice || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Price for Story"
                name="storyPrice"
                type="number"
                value={formData.storyPrice || ""}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        );
      case "Free Promotion":
        return (
          <Typography>
            This is a free promotion. No additional setup needed.
          </Typography>
        );
      case "Ask for Follow":
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Select
                  name="followPlatform"
                  value={formData.followPlatform || ""}
                  onChange={handleInputChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select a platform
                  </MenuItem>
                  {platforms.map((platform) => (
                    <MenuItem key={platform} value={platform}>
                      {platform}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price to Follow"
                name="followPrice"
                type="number"
                value={formData.followPrice || ""}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        );
      case "Invitation":
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Starting Price for Invitation"
                name="invitationPrice"
                type="number"
                value={formData.invitationPrice || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="invitationLocation"
                value={formData.invitationLocation || ""}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        );
      case "Join the Trip with Influencer":
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Trip Title"
                name="tripTitle"
                value={formData.tripTitle || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Trip Details"
                name="tripDetails"
                multiline
                rows={4}
                value={formData.tripDetails || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date of Trip"
                name="tripDate"
                type="date"
                value={formData.tripDate || ""}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Joining Fee"
                name="tripFee"
                type="number"
                value={formData.tripFee || ""}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        );
      case "Book Appointment":
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Packages"
                name="appointmentOffer"
                placeholder="e.g. Book for makeup, book for wedding videography etc."
                value={formData.appointmentOffer || ""}
                onChange={handleInputChange}
                variant="outlined"
                helperText="Add the service you offer like Book for yoga class, cooking class, makeup, haircut, photography session, wedding videography, tutoring session"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Service Price"
                name="appointmentPrice"
                type="number"
                placeholder="eg. 1200"
                helperText="Please specify the price for this service "
                value={formData.appointmentPrice || ""}
                onChange={handleInputChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Service Location"
                name="appointmentLocation"
                placeholder="e.g., 123 Main St, Delhi or Online"
                value={formData.appointmentLocation || ""}
                onChange={handleInputChange}
                variant="outlined"
                helperText="Enter the full address for in-person services or specify 'Online' for virtual appointments."
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Service Description"
                name="appointmentDesc"
                placeholder="Provide details about the service (e.g., duration, special requirements)"
                value={formData.appointmentDesc || ""}
                onChange={handleInputChange}
                variant="outlined"
                helperText="Include any important information or specific details about the service."
                required
              />
            </Grid>
          </Grid>
        );
      case "Chat":
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="How much you will charge for chatting?"
                name="chatPrice"
                type="number"
                placeholder="Price"
                value={formData.chatPrice || ""}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  const renderSavedPackages = () => {
    return (
      <Box>
        {savedPackages?.length > 0 && (
          <Typography
            variant="h6"
            sx={{ marginBottom: 2, fontWeight: "bold", mt: 4 }}
          >
            Packages
          </Typography>
        )}
        <Grid container spacing={3} direction={{ xs: "column", sm: "row" }}>
          {savedPackages?.map((pkg) => (
            <SavedPackage key={pkg.name} pkg={pkg} isEdit={false} />
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <div style={{ marginTop: 24 }}>
      <Typography variant="h5" gutterBottom>
        Setup Your Packages
      </Typography>
      <Typography variant="body1" gutterBottom>
        This section allows you to create and manage your packages for
        promotions, collaborations, and other services you offer. Customize each
        package with specific details such as pricing, platform, and description
        to effectively communicate your offerings to potential clients.
      </Typography>
      <FormControl fullWidth margin="normal">
        <Select
          value={selectedPackage}
          onChange={handlePackageChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select Package
          </MenuItem>
          {packagesData.map((pkg) => (
            <MenuItem key={pkg.name} value={pkg.name}>
              {pkg.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {renderPackageDetails()}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        style={{ marginTop: 20 }}
        disabled={!selectedPackage}
      >
        Save Package
      </Button>
      {savedPackages?.length > 0 && renderSavedPackages()}
    </div>
  );
};

export default PackagesSetup;
