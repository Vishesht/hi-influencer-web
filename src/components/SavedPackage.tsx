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
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import PackageDetailsModal from "./PackageDetailsModal";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { packagesData } from "@/common";
import axios from "axios";
import { BaseUrl } from "@/common/utils";

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

const SavedPackage = ({ pkg, isEdit, influencer, reloadData }) => {
  const router = useRouter();
  const packageData = packagesData?.find((data) => data.name === pkg.name);
  const packageDescription = packageData ? packageData.description : "";
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const data = useAppSelector((state) => state.login.userData);

  const handleOpen = () => {
    if (data) {
      setOpenModal(true);
    } else {
      alert(
        "You must be logged in to access this feature. Please log in first."
      );
      router.push("/login");
    }
  };
  const handleClose = () => setOpenModal(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Menu for MoreVertRoundedIcon
  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    // Handle edit action here (you might want to redirect or open an edit modal)
    console.log("Edit package:", pkg);
    handleCloseMenu();
  };

  const handleDelete = async (pkg) => {
    try {
      await axios.delete(`${BaseUrl}/api/deletePackage/${data?.id}`, {
        data: { name: pkg?.name },
      });
      reloadData();
      handleCloseMenu();
    } catch (error) {
      // Handle error here, e.g., throw it to be handled by the component
      throw error.response?.data || { message: "An error occurred" };
    }
  };
  console.log("first", influencer);
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
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
            <Box sx={{ display: "flex" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {pkg.name}
                </Typography>
                <Typography
                  color="grey"
                  variant="body2"
                  sx={{ marginBottom: 1 }}
                >
                  {packageDescription}
                </Typography>
              </Box>
              {!isEdit && <MoreVertRoundedIcon onClick={handleClickMenu} />}
            </Box>
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
            {pkg.name === "Chat" && (
              <>
                {/* <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                  <strong>Chat Price: </strong>
                  {pkg?.data?.chatPrice == "0"
                    ? " Free"
                    : `Rs.${pkg?.data?.chatPrice}`}
                </Typography> */}
              </>
            )}
            {/* Other package types */}
          </Box>
          {isEdit && influencer?.id !== data?.id && (
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

      {/* Menu for edit and delete */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {/* <MenuItem onClick={handleEdit}>Edit</MenuItem> */}
        <MenuItem onClick={() => handleDelete(pkg)}>Delete</MenuItem>
      </Menu>
    </Grid>
  );
};

export default SavedPackage;
