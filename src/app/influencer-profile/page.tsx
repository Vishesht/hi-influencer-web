"use client";

import React, { useEffect } from "react";
import { Container, Typography, Box, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { styled } from "@mui/system";
import Header from "@/components/header";

// Styled components
const ProfileContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const InfoBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const PlatformList = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
}));

const PackageBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(2),
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const ReviewsList = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(2),
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  borderRadius: theme.spacing(1),
}));

const InfluencerProfile = ({ searchParams }) => {
  const influencer = JSON.parse(searchParams.influencer);

  return (
    <>
      <Header search={false} />
      <ProfileContainer>
        {influencer.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Influencer image ${index}`}
            style={{ width: "30%", borderRadius: "8px", marginRight: 24 }}
          />
        ))}

        {/* Influencer Info */}
        <Typography variant="h4">{influencer.name}</Typography>
        <Typography variant="body1" color="textSecondary">
          {influencer.category} - {influencer.location}
        </Typography>

        {/* Platforms */}
        <InfoBox>
          <Typography variant="h6">Platforms</Typography>
          <PlatformList>
            {influencer.platform.map((platformData, index) => (
              <Box key={index} display="flex" alignItems="center">
                <IconButton href={platformData.platformLink} target="_blank">
                  {platformData.platform === "Instagram" ? (
                    <InstagramIcon />
                  ) : (
                    <FacebookIcon />
                  )}
                </IconButton>
                <Typography>{platformData.followers}</Typography>
              </Box>
            ))}
          </PlatformList>
        </InfoBox>

        {/* Gender, Age, Price */}
        <InfoBox>
          <Typography variant="h6">Details</Typography>
          <Typography>Gender: {influencer.gender}</Typography>
          <Typography>Age: {influencer.age}</Typography>
          <Typography>Price: {influencer.price}</Typography>
        </InfoBox>

        {/* Packages */}
        <PackageBox>
          <Typography variant="h6">Packages</Typography>
          {influencer.packages.map((pkg, index) => (
            <Box key={index} marginBottom={2}>
              <Typography variant="subtitle1">
                {pkg.type} - {pkg.price}
              </Typography>
              <Typography>Duration: {pkg.duration}</Typography>
              <Typography>Reach: {pkg.reach}</Typography>
              <Typography>Engagement: {pkg.engagement}</Typography>
            </Box>
          ))}
        </PackageBox>

        {/* Reviews */}
        <ReviewsList>
          <Typography variant="h6">Reviews</Typography>
          {influencer?.reviewsData?.map((review) => (
            <Box key={review.id} marginBottom={2}>
              <Typography variant="subtitle1">{review.user}</Typography>
              <Typography>Rating: {review.rating}</Typography>
              <Typography>{review.comment}</Typography>
            </Box>
          ))}
        </ReviewsList>
      </ProfileContainer>
    </>
  );
};

export default InfluencerProfile;
