"use client";

import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  IconButton,
  CardContent,
  Grid,
  Card,
} from "@mui/material";
import { styled } from "@mui/system";
import Header from "@/components/header";
import ImageGallery from "@/components/imageGallery";
import Image from "next/image";
import ReviewsList from "@/components/reviewsList";
import Footer from "@/components/footer";

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

const InfluencerProfile = ({ searchParams }) => {
  const influencer = JSON.parse(searchParams.influencer);

  // const SocialMediaIcon = (platformData, src) => (
  //   <Image
  //     src={src}
  //     alt={platformData.platform}
  //     width={24} // Adjust size as needed
  //     height={24} // Adjust size as needed
  //     style={{ borderRadius: '50%' }} // Round the image
  //   />
  // );

  const SocialMediaIcon = (platformData, link) => {
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
              flex: 1, // Allow the container to grow and fill available space
              display: "flex",
              flexDirection: "column", // Align items vertically in the container
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontFamily: "Roboto, sans-serif",
              }}
              variant="h4"
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
              {influencer.category} - {influencer.location}
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                fontFamily: "Roboto, sans-serif",
                mt: 1,
                mb: 4,
              }}
              variant="body2"
            >
              {influencer.description}
            </Typography>
          </Container>
          <PlatformList>
            {influencer.platform.map((platformData, index) => (
              <Box key={index} display="flex" alignItems="center">
                <IconButton href={platformData.platformLink} target="_blank">
                  {platformData.platform === "Instagram"
                    ? SocialMediaIcon(
                        platformData,
                        "/assets/images/instagram.png"
                      )
                    : platformData.platform === "YouTube"
                    ? SocialMediaIcon(
                        platformData,
                        "/assets/images/youtube.png"
                      )
                    : SocialMediaIcon(
                        platformData,
                        "/assets/images/facebook.png"
                      )}
                </IconButton>
                <Typography
                  sx={{
                    fontFamily: "sans-serif",
                  }}
                >
                  {platformData.followers}
                </Typography>
              </Box>
            ))}
          </PlatformList>
        </Box>

        {/* Gender, Age, Price */}
        <InfoBox>
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
          <InfoDetail>
            <strong>Age:</strong> {influencer.age}
          </InfoDetail>
          <InfoDetail>
            <strong>Price:</strong> {influencer.price}
          </InfoDetail>
        </InfoBox>

        {/* Packages */}
        <Box>
          <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
            Packages
          </Typography>
          <PackageGrid container spacing={3}>
            {influencer.packages.map((pkg, index) => (
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
                  </CardContent>
                </PackageCard>
              </Grid>
            ))}
          </PackageGrid>
        </Box>

        {/* Reviews */}
        <ReviewsList reviewsData={influencer?.reviewsData} />
      </ProfileContainer>
    </>
  );
};

export default InfluencerProfile;
