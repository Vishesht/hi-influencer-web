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
import { usePathname } from "next/navigation";
import Loading from "@/components/LoadingSpinner";

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
  const [modalOpen, setModalOpen] = useState(false);
  const data = useAppSelector((state) => state.influencer);
  const influencer = data?.influencer;
  const extractUserId = (url) => url.split("/").pop();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const [urlToCopy, setUrlToCopy] = useState("");

  useEffect(() => {
    const fetchUser = async (username) => {
      try {
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
    setLoader(true);
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
    const formattedLink = platformData.platformLink.startsWith("http")
      ? platformData.platformLink
      : `https://${platformData.platformLink}`;
    return (
      <IconButton
        href={formattedLink}
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
        <Image
          src={link}
          alt={platformData.platform}
          width={24}
          height={24}
          style={{ borderRadius: "50%" }}
        />
      </IconButton>
    );
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
                <Image
                  src={influencer?.photoURL}
                  alt="User Image"
                  width={80}
                  height={80}
                  // layout="responsive"
                  style={{
                    objectFit: "cover",
                    borderRadius: 200,
                  }}
                />
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
              {influencer?.bio}
            </Typography>
          </Container>
        </Box>
        <Box sx={{ px: 2.2 }}>
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
