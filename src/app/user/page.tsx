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
  Tooltip,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import VerifiedIcon from "@mui/icons-material/Verified";
import { styled } from "@mui/system";
import { useRouter } from "next/navigation";
import { BaseUrl, checkUserDetails, cleanImageUrl } from "@/common/utils";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useAppSelector } from "@/lib/hooks";
import CustomButton from "@/components/CustomButton";
import Image from "next/image";
import ProfilePromotion from "@/components/ProfilePromotion";
import Loading from "@/components/LoadingSpinner";
import ReusableSnackbar from "@/components/ReusableSnackbar";

interface User {
  id: string;
  emailVerified: boolean;
  photoURL: string;
  platform: Array<any>;
  category: string;
  username: string;
  name: string;
  bio: string;
  images: Array<string>;
  isInfluencer: boolean;
  verified: boolean;
  isClient: boolean;
}

interface FirebaseUser {
  name: string;
  email: string;
}

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

const verificationText = "Your account has been submitted for verification.";

const ProfilePage = () => {
  const [user, setUser] = useState<User>();
  const [firebaseData, setFirebaseData] = useState<any>(null);
  const router = useRouter();
  const data = useAppSelector((state) => state.login.userData);
  const verifyData: any = user ? checkUserDetails(user) : {};
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setFirebaseData(user?.providerData[0]);
      } else {
        setFirebaseData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async () => {
    setLoader(true);
    try {
      if (!data.id) {
        console.error("User ID not found in local storage.");
        return;
      }
      const response = await axios.get(`${BaseUrl}/api/users/${data.id}`);
      setUser(response.data);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const filteredArr = user?.platform?.filter(
    (item) => item.platformLink.trim() !== ""
  );

  const handleClick = (link: string) => {
    const url = link.startsWith("http") ? link : `http://${link}`;
    window.open(url, "_blank", "noopener noreferrer");
  };

  const verifyAcc = async (id) => {
    try {
      const res = await axios.put(`${BaseUrl}/api/users/${id}/influencer`);
      if (res.status == 200) {
        setSnackbarOpen(true);
        setSnackbarMessage(verificationText);
        fetchUserData();
      }
    } catch (err) {
      console.error(err);
    }
  };
  const fb = JSON?.stringify(firebaseData);
  const firebaseDb = fb ? JSON?.parse(fb) : null;
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
          <Image
            src={user?.photoURL || data?.photoURL}
            alt="User Image"
            width={150}
            height={150}
            // layout="responsive"
            style={{
              objectFit: "cover",
            }}
          />
        </Box>

        {/* User Name */}
        <Box display="flex" justifyContent="center" gap={0} alignItems="center">
          <Typography variant="h4">
            {user?.name || firebaseData?.displayName || data?.name}
          </Typography>
          {user?.verified && (
            <Tooltip title="Verified" arrow>
              <VerifiedIcon sx={{ color: "blue", ml: 1 }} />
            </Tooltip>
          )}
        </Box>

        {user?.category && (
          <Typography variant="h6" color="textSecondary">
            {user?.username + " - " + user?.category}
          </Typography>
        )}

        {user?.bio && (
          <Typography variant="body1" mt={2}>
            {user?.bio}
          </Typography>
        )}

        {/* Social Media Platforms */}
        {filteredArr?.length > 0 && (
          <Box mt={4} mb={4}>
            <Box display="flex" justifyContent="center" flexWrap="wrap">
              {filteredArr?.map((platform, index) => (
                <SocialMediaCard
                  onClick={() => handleClick(platform.platformLink)}
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
                  {platform.platform === "LinkedIn" && <LinkedInIcon />}
                  {platform.platform === "Telegram" && <TelegramIcon />}

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
        )}
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => router.push("/edit-profile")}
          sx={{
            borderColor: "#6C63FF", // Custom border color
            textTransform: "none", // Disable uppercase text
            padding: "6px 20px", // Increase padding for a larger button
            fontSize: "16px", // Slightly increase font size
            fontWeight: "bold", // Make text bold
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add subtle shadow for depth
            transition: "transform 0.3s ease, background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#6C63FF", // Change background color on hover
              color: "#fff", // Change text color on hover
              transform: "scale(1.05)", // Add a slight zoom effect on hover
            },
            mb: 3,
          }}
        >
          Edit Profile
        </Button>
        {user?.username && user?.verified && (
          <ProfilePromotion userName={user?.username} />
        )}

        {!user?.isClient ? (
          user &&
          !user?.verified && (
            <CustomButton
              isInfluencer={!user?.isInfluencer}
              isEnabled={!verifyData?.userDetailsMissing}
              onClick={() => verifyAcc(user?.id)}
              description={
                !user?.isInfluencer ? verifyData?.message : verificationText
              }
            >
              Verify Account
            </CustomButton>
          )
        ) : (
          <></>
        )}

        {/* Profile Images */}
        <Box mt={4}>
          {user?.images.length > 0 && (
            <Typography fontWeight="bold" variant="h5">
              Gallery
            </Typography>
          )}
          <Grid container justifyContent={"center"} spacing={2} mt={2}>
            {user?.images?.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <GalleryImage
                    // component="img"
                    image={image}
                    // alt={`Image ${index + 1}`}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Loading loading={loader} />
      <ReusableSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        severity="success" // Change this to "error", "info", etc., as needed
      />
    </Container>
  );
};

export default ProfilePage;
