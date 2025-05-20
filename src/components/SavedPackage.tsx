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
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Custom styled Card with better spacing and shadow
const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[8],
  },
}));

const SavedPackage = ({ pkg, isEdit, influencer, reloadData, fromEdit }) => {
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
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (pkg) => {
    try {
      const res = await axios.delete(
        `${BaseUrl}/api/deletePackage/${data?.id}`,
        {
          data: { name: pkg?.name },
        }
      );
      reloadData(pkg);
      handleCloseMenu();
    } catch (error) {
      reloadData(pkg);
      console.log("err", error);
    }
  };
  const resFontSize = { xs: "0.7em", sm: "0.8rem" };

  return (
    <Grid
      item
      xs={fromEdit ? 8 : 4}
      sm={fromEdit ? 10 : 5}
      md={fromEdit ? 10 : 5}
      lg={fromEdit ? 10 : 4}
    >
      <StyledCard
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: { xs: 2, sm: 3 },
          }}
        >
          <Box sx={{ flexGrow: 1, mb: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "0.9rem", sm: "1.2rem" },
                  }}
                >
                  {pkg.name}
                </Typography>
                <Typography
                  color="grey"
                  variant="body2"
                  sx={{
                    marginBottom: 1,
                    fontSize: { xs: "0.7rem", sm: "0.9rem" },
                  }}
                >
                  {packageDescription}
                </Typography>
              </Box>
              {!isEdit && <MoreVertRoundedIcon onClick={handleClickMenu} />}
            </Box>

            {/* Package-specific details */}
            {pkg.name === "Promotions" && (
              <Box
                sx={{
                  padding: 3,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
                  color: "white",
                  boxShadow: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {pkg?.data?.platform === "Instagram" && (
                    <InstagramIcon
                      sx={{
                        marginRight: 1,
                      }}
                    />
                  )}
                  {pkg?.data?.platform === "Facebook" && (
                    <FacebookIcon
                      sx={{
                        marginRight: 1,
                      }}
                    />
                  )}
                  {pkg?.data?.platform === "Twitter" && (
                    <TwitterIcon
                      sx={{
                        marginRight: 1,
                      }}
                    />
                  )}
                  {pkg?.data?.platform === "YouTube" && (
                    <YouTubeIcon
                      sx={{
                        marginRight: 1,
                      }}
                    />
                  )}
                  <Typography
                    variant="body1"
                    color="white"
                    sx={{
                      fontWeight: "bold",
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                    }}
                  >
                    {pkg?.data?.platform}
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ fontSize: resFontSize }}>
                  <strong>Video / Reels:</strong> Rs.{pkg?.data?.videoPrice}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: resFontSize }}>
                  <strong>Image:</strong> Rs.{pkg?.data?.imagePrice}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: resFontSize }}>
                  <strong>Story:</strong> Rs.{pkg?.data?.storyPrice}
                </Typography>
              </Box>
            )}

            {pkg.name === "Book Appointment" && (
              <Box
                sx={{
                  padding: 2,
                  borderRadius: 2,
                  marginTop: 2,
                  background:
                    "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)", // Gradient background
                  color: "white", // Set text color to white for better contrast
                  border: "1px solid transparent", // Remove the border or set to transparent to not interfere with gradient
                  boxShadow: 2, // Optional: add some shadow for depth
                }}
                onClick={handleOpenDialog}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    color: "linear-gradient(135deg, #FF5733, #FFC300)", // You can also set a solid color if preferred
                    background: "linear-gradient(135deg, #FF5733, #FFC300)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                  }}
                >
                  {pkg.data.appointmentOffer}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 1,
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3, // Limit to 3 lines
                    lineHeight: 1.5,
                  }}
                >
                  {pkg.data.appointmentDesc}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                  <strong>{pkg.data.appointmentLocation}</strong>
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                  <strong>Rs. {pkg.data.appointmentPrice}</strong>
                </Typography>
              </Box>
            )}
            {pkg.name === "Ask for Collaboration" && (
              <Box
                sx={{
                  padding: 2,
                  borderRadius: 2,
                  marginTop: 2,
                  background: "linear-gradient(135deg, #FF7E5F, #FF6F20)", // Gradient background
                  color: "white", // Set text color to white for better contrast
                  border: "1px solid transparent", // Remove the border or set to transparent to not interfere with gradient
                  boxShadow: 2, // Optional: add some shadow for depth
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                  }}
                >
                  {pkg.data.collaborationOffer}
                </Typography>

                <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                  <strong>Rs. {pkg.data.collaborationPrice}</strong>
                </Typography>
              </Box>
            )}
          </Box>

          {isEdit && influencer?.id !== data?.id && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpen}
              fullWidth
              sx={{
                fontSize: { xs: "0.8rem", sm: "1rem" },
                backgroundColor: "#1DA1F2",
              }}
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

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => handleDelete(pkg)}>Delete</MenuItem>
      </Menu>
    </Grid>
  );
};

export default SavedPackage;
