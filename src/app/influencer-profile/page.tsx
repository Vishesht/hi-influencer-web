"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  IconButton,
  Grid,
  Tooltip,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import ImageGallery from "../../components/imageGallery";
import ReviewsList from "../../components/reviewsList";
import HireModal from "../../components/HireModal";
import SavedPackage from "@/components/SavedPackage";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Verified, Share } from "@mui/icons-material";
import { influencerData } from "@/lib/features/influencer/influencerSlice";
import axios from "axios";
import { BaseUrl } from "@/common/utils";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/components/LoadingSpinner";
import ChatIcon from "@mui/icons-material/Chat";

const ProfileContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(1), // Default for mobile
  [theme.breakpoints.up("md")]: {
    // Change to web breakpoint (e.g., md)
    padding: theme.spacing(3),
  },
}));

const PlatformList = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(2),
  alignItems: "center",
  padding: 8,
  marginTop: 6,
}));

const ShareButton = styled(IconButton)(({ theme }) => ({
  color: "#00000090",
  "&:hover": {
    backgroundColor: "#25d366",
  },
}));

const ShareModal = styled(Modal)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const ShareModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  maxWidth: "400px",
  width: "100%",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
}));

const InfluencerProfile = () => {
  const dispatch = useAppDispatch();
  const path = usePathname();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const userData = useAppSelector((state) => state.login.userData);
  const data = useAppSelector((state) => state.influencer);
  const influencer = data?.influencer;
  const extractUserId = (url) => url.split("/").pop();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const [urlToCopy, setUrlToCopy] = useState("");

  const fetchUser = async (username) => {
    try {
      setLoader(true);
      const response = await axios.get(`${BaseUrl}/api/user/${username}`);
      dispatch(influencerData(response?.data));
      setLoader(false);
    } catch (err) {
      setLoader(false);

      if (err.response.data.message === "User not found") {
        setError(err.response.data.message);
      }
    }
  };

  useEffect(() => {
    path && fetchUser(extractUserId(path));
  }, [path]);

  const handleClose = () => setModalOpen(false);

  const handleShareModalOpen = () => {
    setUrlToCopy(`${window.location.origin}${path}`);
    setCopyModalOpen(true);
  };
  const handleShareModalClose = () => setCopyModalOpen(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(urlToCopy).then(() => {
      alert("Link copied to clipboard!");
      handleShareModalClose();
    });
  };

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "20%",
          marginBottom: "6%",
        }}
      >
        {error}
      </div>
    );
  }

  const SocialMediaIcon = (platformData: any, link: any) => {
    return (
      <Image
        src={link}
        alt={platformData.platform}
        width={24}
        height={24}
        style={{ borderRadius: "50%" }}
      />
    );
  };

  const saveChat = async (userId1, userId2) => {
    try {
      const response = await axios.post(`${BaseUrl}/service/create-chat`, {
        userId1,
        userId2,
      });
      console.log("saveChat", response.data);
      setLoader(false);
      router.push("/chat");
    } catch (error) {
      setLoader(false);
      console.log("Error saving chat:", error);
    }
  };

  const CreateChat = (influencerId) => {
    saveChat(userData?.id, influencerId);
  };

  return (
    <>
      <ProfileContainer>
        <ImageGallery images={influencer?.images} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <Container>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <ShareButton onClick={handleShareModalOpen}>
                <Share />
              </ShareButton>
            </Box>
            <Container
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Box>
                {influencer?.photoURL ? (
                  <Image
                    src={influencer.photoURL}
                    alt="User Image"
                    width={80}
                    height={80}
                    style={{
                      objectFit: "cover",
                      borderRadius: 200,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 200,
                      backgroundColor: "#ccc",
                    }}
                  />
                )}
              </Box>

              <Container>
                <Box
                  display="flex"
                  gap={0}
                  alignItems="center"
                  justifyContent={"space-between"}
                >
                  <Box alignItems={"center"} display={"flex"}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontFamily: "Roboto, sans-serif",
                        fontSize: { xs: "1.2rem", sm: "1.5rem" },
                      }}
                      variant="h5"
                    >
                      {influencer?.name}
                    </Typography>
                    {influencer?.verified && (
                      <Tooltip title="Verified" arrow>
                        <Verified sx={{ color: "blue", ml: 1 }} />
                      </Tooltip>
                    )}
                  </Box>
                </Box>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontFamily: "Roboto, sans-serif",
                    fontSize: { xs: "0.8rem", sm: "1rem" },
                  }}
                  variant="body1"
                >
                  {influencer?.category} - {influencer?.state}
                </Typography>
              </Container>
            </Container>

            <PlatformList>
              {influencer?.platform.map((platformData: any, index: any) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  flexDirection={{ xs: "column", sm: "row" }}
                >
                  <IconButton
                    href={
                      platformData.platformLink.startsWith("http")
                        ? platformData.platformLink
                        : `https://${platformData.platformLink}`
                    }
                    target="_blank"
                    sx={{
                      p: 0,
                      borderRadius: "50%",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    {platformData.platform === "Instagram" &&
                      SocialMediaIcon(
                        platformData,
                        "/assets/images/instagram.png"
                      )}
                    {platformData.platform === "Youtube" &&
                      SocialMediaIcon(
                        platformData,
                        "/assets/images/youtube.png"
                      )}
                    {platformData.platform === "Twitter" &&
                      SocialMediaIcon(
                        platformData,
                        "/assets/images/twitter.png"
                      )}
                    {platformData.platform === "Facebook" &&
                      SocialMediaIcon(
                        platformData,
                        "/assets/images/facebook.png"
                      )}
                  </IconButton>
                  <Typography
                    sx={{
                      fontFamily: "sans-serif",
                      ml: 1,
                      fontSize: { xs: "0.8rem", sm: "1rem" },
                    }}
                  >
                    {platformData.platform}
                  </Typography>
                </Box>
              ))}
            </PlatformList>
            <Button
              variant="outlined"
              onClick={() => CreateChat(influencer?.id)}
              sx={{
                ml: 1,
                mt: 2,
                borderColor: "green.500", // Border color
                color: "green.500", // Text color
                "&:hover": {
                  borderColor: "green.600", // Darker border on hover
                  color: "green.600", // Darker text on hover
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
                padding: { xs: "4px 8px", sm: "6px 12px" }, // Smaller padding
                flexWrap: "wrap", // Allow wrapping
                fontSize: { xs: "0.8rem", sm: "0.9rem" }, // Smaller font size
              }}
            >
              <ChatIcon sx={{ marginRight: 0.5 }} /> {/* Chat icon */}
              <Typography variant="body2">Chat</Typography> {/* Chat text */}
            </Button>
            <Typography
              sx={{
                color: "text.secondary",
                fontFamily: "Roboto, sans-serif",
                mt: 1,
                mb: 4,
              }}
              variant="body2"
            >
              {influencer?.bio}
            </Typography>
          </Container>
        </Box>
        <Box sx={{ px: 2.2 }}>
          {influencer?.packages?.length > 0 && (
            <Typography
              variant="h6"
              sx={{
                marginBottom: 2,
                fontWeight: "bold",
                fontSize: { xs: "1rem", sm: "1.2rem" },
              }}
            >
              Packages
            </Typography>
          )}
          <Grid container spacing={3} direction={{ xs: "column", sm: "row" }}>
            {influencer?.packages.map((pkg) => (
              <SavedPackage
                influencer={influencer}
                key={pkg.name}
                pkg={pkg}
                isEdit={true}
              />
            ))}
          </Grid>
        </Box>
        {influencer?.reviewsData?.length > 0 && (
          <ReviewsList reviewsData={influencer?.reviewsData} />
        )}
        <Loading loading={loader} />
      </ProfileContainer>
      <ShareModal
        sx={{ ml: 2, mr: 2 }}
        open={copyModalOpen}
        onClose={handleShareModalClose}
      >
        <ShareModalContent>
          <Typography variant="h6" gutterBottom>
            Share this Profile
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={urlToCopy}
            InputProps={{
              readOnly: true,
            }}
            sx={{
              marginBottom: 2,
            }}
          />
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={handleCopyToClipboard}
          >
            Copy Link
          </Button>
        </ShareModalContent>
      </ShareModal>
      <HireModal open={modalOpen} onClose={handleClose} />
    </>
  );
};

export default InfluencerProfile;
