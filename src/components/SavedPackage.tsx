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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import PackageDetailsModal from "./PackageDetailsModal";
import { truncateText } from "@/common/utils";

// Custom styled Card with better spacing and shadow
const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  height: "350px", // Fixed height for uniformity
  boxShadow: theme.shadows[4],
  transition: "transform 0.3s ease-in-out",
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
    description: "You can ask influencer to do a free promotion for you.",
  },
  {
    name: "Ask for Follow",
    description: "Encourage influencers to follow you on social media.",
  },
  {
    name: "Invitation",
    description: "You can invite influencers to join promotional events.",
  },
  {
    name: "Join the Trip with Influencer",
    description: "Join influencers on their trips for unique experiences.",
  },
  {
    name: "Book Appointment",
    description: "Schedule your appointment with a leading influencer.",
  },
  {
    name: "Chat",
    description: "Pay to chat with the influencer for collaboration.",
  },
];

const SavedPackage = ({ pkg, isEdit, influencer }) => {
  const packageData = packagesData?.find((data) => data.name === pkg.name);
  const packageDescription = packageData ? packageData.description : "";
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      {" "}
      {/* Adjust grid sizes for responsiveness */}
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
            {/* Existing package-specific details here */}
            {pkg.name === "Promotions" && (
              <>
                <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                  <strong>Platform:</strong> {pkg?.data?.platform}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                  <strong>Video Price:</strong> Rs.{pkg?.data?.videoPrice}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                  <strong>Image Price:</strong> Rs.{pkg?.data?.imagePrice}
                </Typography>
                <Typography variant="body2">
                  <strong>Story Price:</strong> Rs.{pkg?.data?.storyPrice}
                </Typography>
              </>
            )}

            {pkg.name === "Book Appointment" && (
              <Box
                sx={{
                  padding: 1,
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  backgroundColor: "#f9f9f9",
                  marginBottom: 2,
                }}
                onClick={handleOpenDialog}
              >
                <Typography variant="h6" sx={{ marginBottom: 1 }}>
                  Appointment Details
                </Typography>

                <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                  <strong>Service Offered:</strong> {pkg.data.appointmentOffer}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 0.5,
                    width: "300px", // Fixed width
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <strong>Description:</strong> {pkg.data.appointmentDesc}
                </Typography>

                <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                  <strong>Location:</strong> {pkg.data.appointmentLocation}
                </Typography>

                <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                  <strong>Price:</strong> Rs. {pkg.data.appointmentPrice}
                </Typography>
              </Box>
            )}

            {/* Other package types */}
          </Box>
          {isEdit && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpen}
              fullWidth
            >
              Select
            </Button>
          )}
        </CardContent>
      </StyledCard>
      <PackageDetailsModal
        influencer={influencer}
        open={openModal}
        onClose={handleClose}
        pkg={pkg}
      />
      {/* Dialog for full description */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Appointment Details</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            <strong>Service Offered:</strong> {pkg.data.appointmentOffer}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            <strong>Description:</strong> {pkg.data.appointmentDesc}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            <strong>Location:</strong> {pkg.data.appointmentLocation}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            <strong>Price:</strong> Rs. {pkg.data.appointmentPrice}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default SavedPackage;
