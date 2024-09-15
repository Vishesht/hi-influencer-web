"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/system";
import { useRouter } from "next/navigation";
import { BaseUrl } from "@/common/utils";

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
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const data = JSON.parse(userData);
    const fetchUserData = async () => {
      try {
        // Retrieve the user ID from local storage

        if (!data._id) {
          console.error("User ID not found in local storage.");
          return;
        }

        // Fetch user data from the API
        const response = await axios.get(`${BaseUrl}/api/users/${data._id}`);
        console.log("first21", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

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
            image={
              user.photoURL ||
              "https://randomuser.me/api/portraits/women/44.jpg"
            }
            alt="User Image"
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        {/* User Name */}
        <Box display="flex" justifyContent="center" gap={0} alignItems="center">
          <Typography variant="h4">{user.name}</Typography>
          {user.emailVerified && (
            <CheckCircleIcon sx={{ color: "green", ml: 1 }} />
          )}
        </Box>
        {user.email && (
          <Typography variant="h6" color="textSecondary">
            {user.email}
          </Typography>
        )}
        {user.category && (
          <Typography variant="h6" color="textSecondary">
            {user.category}
          </Typography>
        )}
        {(user.address || user.state) && (
          <Typography variant="h6" color="textSecondary">
            {user.address + " " + user.state}
          </Typography>
        )}
        {user.bio && (
          <Typography variant="body1" mt={2}>
            {user.bio}
          </Typography>
        )}

        {/* Social Media Platforms */}
        <Box mt={4} mb={4}>
          <Box display="flex" justifyContent="center" flexWrap="wrap">
            {user.platform?.map((platform, index) => (
              <SocialMediaCard
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: 1,
                }}
              >
                {platform.platform === "Instagram" && <InstagramIcon />}
                {platform.platform === "Facebook" && <FacebookIcon />}
                {platform.platform === "Youtube" && <YouTubeIcon />}
                {platform.platform === "Twitter" && <TwitterIcon />}
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/orders")}
          >
            Your Orders
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => router.push("/edit-profile")}
          >
            Edit Profile
          </Button>
        </Box>

        {/* Profile Images */}
        <Box mt={4}>
          {user.images.length > 0 && (
            <Typography fontWeight="bold" variant="h5">
              Gallery
            </Typography>
          )}
          <Grid container justifyContent={"center"} spacing={2} mt={2}>
            {user.images?.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <GalleryImage
                    component="img"
                    image={image}
                    alt={`Image ${index + 1}`}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
