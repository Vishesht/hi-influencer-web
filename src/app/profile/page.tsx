"use client";
import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardMedia,
  Grid2,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/system";

// Sample data
const user = {
  name: "John Doe",
  location: "Los Angeles",
  description:
    "Creative professional with a passion for digital marketing and social media.",
  socialMedia: [
    {
      platform: "Instagram",
      followers: "150k",
      link: "https://www.instagram.com/johndoe",
      icon: <InstagramIcon />,
    },
    {
      platform: "Facebook",
      followers: "50k",
      link: "https://www.facebook.com/johndoe",
      icon: <FacebookIcon />,
    },
    {
      platform: "Twitter",
      followers: "30k",
      link: "https://twitter.com/johndoe",
      icon: <TwitterIcon />,
    },
  ],
  images: [
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/women/45.jpg",
    "https://randomuser.me/api/portraits/women/46.jpg",
  ],
};

// Styled components with custom shadow values
const SocialMediaCard = styled(Card)(({ theme }) => ({
  display: "flex",
  width: 140,
  alignItems: "center",
  padding: theme.spacing(1),
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#fff",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
  marginBottom: theme.spacing(1),
}));

const GalleryImage = styled(CardMedia)(({ theme }) => ({
  height: 320,
  objectFit: "cover",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

const ProfilePage = () => {
  return (
    <Container>
      <Box textAlign="center" my={4}>
        {/* User Image */}
        <Box
          sx={{
            borderRadius: "50%",
            width: 150,
            height: 150,
            overflow: "hidden",
            mx: "auto",
            mb: 2,
          }}
        >
          <CardMedia
            component="img"
            image="https://randomuser.me/api/portraits/women/44.jpg" // Placeholder image
            alt="User Image"
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        {/* User Name */}
        <Box display="flex" justifyContent="center" gap={0} alignItems="center">
          <Typography variant="h4">{user.name}</Typography>
          {true && <CheckCircleIcon sx={{ color: "green", ml: 1 }} />}
        </Box>
        <Typography variant="h6" color="textSecondary">
          {user.location}
        </Typography>
        <Typography variant="body1" mt={2}>
          {user.description}
        </Typography>

        {/* Social Media Platforms */}
        <Box mt={4} mb={4}>
          {/* <Typography fontWeight="bold" variant="h6">
            Social Media
          </Typography> */}
          <Box display="flex" justifyContent="center" flexWrap="wrap">
            {user.socialMedia.map((platform, index) => (
              <SocialMediaCard
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: 1,
                }}
              >
                {platform.icon}
                <Box ml={1}>
                  <Typography variant="body1">
                    <a
                      href={platform.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {platform.platform}
                    </a>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {platform.followers}
                  </Typography>
                </Box>
              </SocialMediaCard>
            ))}
          </Box>
        </Box>

        {/* Buttons */}
        <Box mt={4} display="flex" justifyContent="center" gap={2}>
          <Button variant="contained" color="primary">
            Your Orders
          </Button>
          <Button variant="outlined" color="secondary">
            Edit Profile
          </Button>
        </Box>

        {/* Profile Images */}
        <Box mt={4}>
          <Typography fontWeight="bold" variant="h5">
            Gallery
          </Typography>
          <Grid2 container justifyContent={"center"} spacing={2} mt={2}>
            {user.images.map((image, index) => (
              <Grid2 xs={12} sm={6} md={4} key={index}>
                <Card>
                  <GalleryImage
                    component="img"
                    image={image}
                    alt={`Image ${index + 1}`}
                  />
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
