"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  IconButton,
  CardContent,
  Grid,
  Card,
  Button,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import ImageGallery from "../../components/imageGallery";
import ReviewsList from "../../components/reviewsList";
import HireModal from "../../components/HireModal";
import SavedPackage from "@/components/SavedPackage";

// Styled components
const ProfileContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const InfoBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(3),
  border: "1px solid #e0e0e0", // Light border for separation
}));

const InfoDetail = styled(Typography)(({ theme }) => ({
  fontFamily: "sans-serif",
  color: "black",
}));

const PlatformList = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row", // Align items in a row
  gap: theme.spacing(2), // Space between items
  alignItems: "center", // Center items vertically
}));

const PackageGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

// Styled card with hover effect
const PackageCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: `0 8px 16px rgba(0, 0, 0, 0.2)`,
  },
}));

const InfluencerProfile = ({ searchParams }: any) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const influencer = JSON?.parse(searchParams.influencer);
  // const SocialMediaIcon = (platformData, src) => (
  //   <Image
  //     src={src}
  //     alt={platformData.platform}
  //     width={24} // Adjust size as needed
  //     height={24} // Adjust size as needed
  //     style={{ borderRadius: '50%' }} // Round the image
  //   />
  // );

  const SocialMediaIcon = (platformData: any, link: any) => {
    return (
      <IconButton
        href={platformData.platformLink}
        target="_blank"
        sx={{
          p: 0, // Remove default padding
          borderRadius: "50%", // Circular buttons
          transition: "transform 0.3s ease", // Smooth transition
          "&:hover": {
            transform: "scale(1.05)", // Slight zoom effect on hover
          },
        }}
      >
        <Image
          src={link}
          alt={platformData.platform}
          width={24} // Adjust size as needed
          height={24} // Adjust size as needed
          style={{ borderRadius: "50%" }} // Round the image
        />
      </IconButton>
    );
  };

  const HireButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    backgroundColor: "#dc004e",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#1976d2",
    },
  }));

  return (
    <>
      <ProfileContainer>
        <ImageGallery images={influencer?.images} />

        {/* Influencer Info */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start", // Align items at the start
            flexWrap: "wrap", // Wrap content on smaller screens
            mt: 3,
          }}
        >
          <Container
            sx={{
              flex: 1,
              flexDirection: "column",
            }}
          >
            <Container
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton
                edge="end"
                color="inherit"
                // onClick={handleClick}
              >
                <Avatar
                  src={influencer?.photoURL}
                  sx={{
                    bgcolor: "#FFF3E0",
                    color: "#000",
                    width: 80,
                    height: 80,
                  }}
                ></Avatar>
              </IconButton>
              <Container>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Roboto, sans-serif",
                    mt: 4,
                  }}
                  variant="h5"
                >
                  {influencer.name}
                </Typography>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontFamily: "Roboto, sans-serif",
                    mt: 1,
                    mb: 2,
                  }}
                  variant="body1"
                >
                  {influencer.category} - {influencer.state}
                </Typography>
              </Container>
            </Container>
            <PlatformList>
              {influencer.platform.map((platformData: any, index: any) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  flexDirection={{ xs: "column", sm: "row" }}
                >
                  <IconButton href={platformData.platformLink} target="_blank">
                    {platformData.platform === "Instagram"
                      ? SocialMediaIcon(
                          platformData,
                          "/assets/images/instagram.png"
                        )
                      : platformData.platform === "Youtube"
                      ? SocialMediaIcon(
                          platformData,
                          "/assets/images/youtube.png"
                        )
                      : platformData.platform === "Twitter"
                      ? SocialMediaIcon(
                          platformData,
                          "/assets/images/twitter.png"
                        )
                      : platformData.platform === "Facebook" &&
                        SocialMediaIcon(
                          platformData,
                          "/assets/images/facebook.png"
                        )}
                  </IconButton>
                  <Typography
                    sx={{
                      fontFamily: "sans-serif",
                    }}
                  >
                    {platformData.platform}
                  </Typography>
                </Box>
              ))}
            </PlatformList>

            <Typography
              sx={{
                color: "text.secondary",
                fontFamily: "Roboto, sans-serif",
                mt: 1,
                mb: 4,
              }}
              variant="body2"
            >
              {influencer.bio}
            </Typography>
          </Container>
        </Box>

        {/* Gender, Age, Price */}
        {/* <InfoBox>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: "bold",
              color: (theme) => theme.palette.primary.main,
              marginBottom: (theme) => theme.spacing(2),
            }}
          >
            Details
          </Typography>

          <InfoDetail>
            <strong>Gender:</strong> {influencer.gender}
          </InfoDetail>
          {influencer.age && (
            <InfoDetail>
              <strong>Age:</strong> {influencer.age}
            </InfoDetail>
          )}
          {influencer.price && (
            <InfoDetail>
              <strong>Price:</strong> {influencer.price}
            </InfoDetail>
          )}
        </InfoBox> */}

        {/* Packages */}
        <Box>
          {influencer?.packages?.length > 0 && (
            <Typography
              variant="h6"
              sx={{ marginBottom: 2, fontWeight: "bold" }}
            >
              Packages
            </Typography>
          )}
          <Grid container spacing={3} direction={{ xs: "column", sm: "row" }}>
            {influencer?.packages.map((pkg) => (
              <SavedPackage key={pkg.name} pkg={pkg} isEdit={true} />
            ))}
          </Grid>
        </Box>
        {/* <Box>
          {influencer?.packages?.length > 0 && (
            <Typography
              variant="h6"
              sx={{ marginBottom: 2, fontWeight: "bold" }}
            >
              Packages
            </Typography>
          )}
          <PackageGrid container spacing={3}>
            {influencer?.packages.map((pkg: any, index: any) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <PackageCard>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {pkg.type}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "text.secondary", marginBottom: 1 }}
                    >
                      {pkg.price}
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                      <strong>Duration:</strong> {pkg.duration}
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                      <strong>Reach:</strong> {pkg.reach}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Engagement:</strong> {pkg.engagement}
                    </Typography>
                    <HireButton
                      onClick={handleOpen}
                      variant="contained"
                      fullWidth
                    >
                      Hire
                    </HireButton>
                  </CardContent>
                </PackageCard>
              </Grid>
            ))}
          </PackageGrid>
        </Box> */}

        {/* Reviews */}
        {influencer?.reviewsData?.length > 0 && (
          <ReviewsList reviewsData={influencer?.reviewsData} />
        )}
      </ProfileContainer>
      <HireModal open={modalOpen} onClose={handleClose} />
    </>
  );
};

export default InfluencerProfile;
