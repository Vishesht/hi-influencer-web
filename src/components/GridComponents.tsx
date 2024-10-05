"use client";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { styled } from "@mui/system";
import Image from "next/image";

const PlatformList = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}));

const GridComponent = ({ data }) => {
  const router = useRouter();

  const handleSubmit = (item) => {
    router.push(`/user/${item.username}`);
  };

  const SocialMediaIcon = (platformData: any, link: any) => {
    return (
      <Image
        src={link}
        alt={platformData.platform}
        width={20} // Adjust size as needed
        height={20} // Adjust size as needed
        style={{ borderRadius: "50%" }} // Round the image
      />
    );
  };

  return (
    <Box
      sx={{
        alignSelf: "center",
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)", // 2 items per row on mobile
          sm: "repeat(3, 1fr)", // 3 items per row on tablets
          md: "repeat(4, 1fr)", // 4 items per row on web
        },
        justifyContent: "center",
        padding: 2,
        mt: 4,
      }}
    >
      {data.map((item, index) => {
        return (
          <Button
            key={item?.id || index}
            onClick={() => handleSubmit(item)}
            style={{ padding: 0, textTransform: "none" }}
          >
            <Card
              key={index}
              sx={{
                width: "100%", // Full width of parent
                maxWidth: 230, // Optional maximum width
                borderRadius: 2,
                boxShadow: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 6,
                },
                cursor: "pointer",
              }}
            >
              <Image
                src={item.photoURL}
                alt="User Image"
                width={230}
                height={220}
                style={{
                  objectFit: "cover",
                  display: "block",
                  width: "100%",
                  margin: "0 auto",
                }}
              />

              <CardContent
                sx={{
                  height: 160,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontFamily: "initial",
                    fontWeight: "bold",
                  }}
                >
                  {item.name}
                </Typography>
                {/* <Box display="flex" alignItems="center" sx={{ mb: 0 }}>
                 Uncomment and use if needed
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Arial, sans-serif", // Replace with your custom font family
                  mr: 0.5,
                }}
              >
                {item.star || "0.0"}
              </Typography>
              <StarIcon sx={{ height: 16, color: "primary.main" }} />
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Arial, sans-serif", // Replace with your custom font family
                  ml: 0.5,
                }}
              >
                ({item.ratings || "0"})
              </Typography>
                </Box> */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontFamily: "sans-serif",
                  }}
                >
                  {item.category}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontFamily: "sans-serif",
                  }}
                >
                  {item.state}
                </Typography>
                <PlatformList>
                  {item.platform.map((platformData: any, index: any) => (
                    <Box
                      key={index}
                      display="flex"
                      alignItems="center"
                      flexDirection={{ xs: "column", sm: "row" }}
                    >
                      <IconButton
                        href={platformData.platformLink}
                        target="_blank"
                      >
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
                    </Box>
                  ))}
                </PlatformList>
              </CardContent>
            </Card>
          </Button>
        );
      })}
    </Box>
  );
};

export default GridComponent;
