"use client";
import React, { useState } from "react";
import {
  CardContent,
  Typography,
  Grid,
  Button,
  styled,
  Card,
  Box,
} from "@mui/material";
import PackageDetailsModal from "./PackageDetailsModal";

// Custom styled Card with better spacing and shadow
const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  height: 300,
  boxShadow: theme.shadows[4], // Increased shadow for more prominence
  transition: "transform 0.3s ease-in-out", // Added hover effect
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[8],
  },
}));

const packagesData = [
  {
    name: "Promotions",
    description: "Promote through video, images, or story posts.",
  },
  {
    name: "Free Promotion",
    description: "This is a free promotion to increase visibility.",
  },
  {
    name: "Ask for Follow",
    description: "Encourage users to follow you on social media.",
  },
  {
    name: "Invitation",
    description:
      "Invite to parties, clubs, or restaurants for promotional events.",
  },
  {
    name: "Join the Trip with Influencer",
    description: "Join influencers on their trips for unique experiences.",
  },
  {
    name: "Book Appointment",
    description: "Book personal appointments with the influencer.",
  },
  { name: "Chat", description: "Pay to chat with the influencer." },
];

const SavedPackage = ({ pkg, isEdit, influencerId }) => {
  const packageData = packagesData?.find((data) => data.name === pkg.name);
  const packageDescription = packageData ? packageData.description : "";
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <StyledCard>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {pkg.name}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 1 }}>
              {packageDescription}
            </Typography>
            {pkg.name === "Promotions" && (
              <>
                <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                  <strong>Platform:</strong> {pkg.data.platform}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                  <strong>Video Price:</strong> Rs.{pkg.data.videoPrice}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                  <strong>Image Price:</strong> Rs.{pkg.data.imagePrice}
                </Typography>
                <Typography variant="body2">
                  <strong>Story Price:</strong> Rs.{pkg.data.storyPrice}
                </Typography>
              </>
            )}
            {pkg.name === "Ask for Follow" && (
              <>
                <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                  <strong>Platform:</strong> {pkg.data.followPlatform}
                </Typography>
                <Typography variant="body2">
                  <strong>Price:</strong> Rs.{pkg.data.followPrice}
                </Typography>
              </>
            )}
            {pkg.name === "Chat" && (
              <>
                <Typography variant="body2">
                  <strong>Price:</strong> Rs.{pkg.data.chatPrice}
                </Typography>
              </>
            )}
            {pkg.name === "Book Appointment" && (
              <>
                <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                  {pkg.data.appointmentOffer}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                  <strong>Time:</strong> {pkg.data.appointmentTiming}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                  <strong>Price:</strong> Rs.{pkg.data.appointmentPrice}
                </Typography>
              </>
            )}
            {pkg.name === "Invitation" && (
              <>
                <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                  <strong>Location:</strong> {pkg.data.invitationLocation}
                </Typography>
                <Typography variant="body2">
                  <strong>Price:</strong> Rs.{pkg.data.invitationPrice}
                </Typography>
              </>
            )}
            {pkg.name === "Join the Trip with Influencer" && (
              <>
                <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                  <strong>Title:</strong> {pkg.data.tripTitle}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                  <strong>Details:</strong> {pkg.data.tripTitle}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                  <strong>Date:</strong> {pkg.data.tripDate}
                </Typography>
                <Typography variant="body2">
                  <strong>Price:</strong> Rs.{pkg.data.tripFee}
                </Typography>
              </>
            )}
          </Box>
          {isEdit && (
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              color="primary"
              onClick={handleOpen}
              fullWidth
            >
              Hire
            </Button>
          )}
        </CardContent>
      </StyledCard>
      <PackageDetailsModal
        influencerId={influencerId}
        open={openModal}
        onClose={handleClose}
        pkg={pkg}
      />
    </Grid>
  );
};

export default SavedPackage;
