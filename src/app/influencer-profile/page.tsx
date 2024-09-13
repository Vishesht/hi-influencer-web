"use client";

import React from "react";
import { Container, Typography, Box, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { styled } from "@mui/system";
import Header from "@/components/header";

// Sample influencer data
const influencer = {
  id: "1",
  name: "Jane Doe",
  platform: [
    {
      platform: "Instagram",
      followers: "150k",
      platformLink: "https://www.instagram.com/janedoe",
    },
    {
      platform: "Facebook",
      followers: "2M",
      platformLink: "https://www.facebook.com/janedoe",
    },
  ],
  location: "New York, USA",
  gender: "Female",
  age: 25,
  price: "₹200",
  star: "4.5",
  ratings: "1219",
  category: "Fashion & Lifestyle Influencer",
  description:
    "Jane Doe is a passionate fashion and lifestyle influencer based in New York. She loves sharing her daily outfits, beauty routines, and lifestyle tips with her followers. With a strong presence on Instagram and Facebook, she inspires thousands to embrace their personal style and confidence.",
  image: "https://randomuser.me/api/portraits/women/44.jpg",
  images: [
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/women/45.jpg",
    "https://randomuser.me/api/portraits/women/46.jpg",
  ],
  packages: [
    {
      type: "Story",
      price: "Rs.500/story",
      duration: "24 hours",
      reach: "10K followers",
      engagement: "5%",
    },
    {
      type: "Image",
      price: "Rs.1000/image",
      duration: "Permanent",
      reach: "15K followers",
      engagement: "7%",
    },
    {
      type: "Video",
      price: "Rs.1500/video",
      duration: "Permanent",
      reach: "20K followers",
      engagement: "10%",
    },
  ],
  reviewsData: [
    {
      id: "1",
      user: "Alice Smith",
      rating: 4,
      comment: "Great influencer! Very professional and effective.",
    },
    {
      id: "2",
      user: "Bob Johnson",
      rating: 5,
      comment: "Absolutely amazing experience! Highly recommend.",
    },
    {
      id: "3",
      user: "Charlie Brown",
      rating: 3,
      comment: "Decent influencer, but could improve on communication.",
    },
  ],
};

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

const InfluencerProfile = () => {
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
          {influencer.reviewsData.map((review) => (
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
