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
import { capitalizeWords } from "@/common/utils";

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
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)", // 2 items per row on mobile (xs)
          sm: "repeat(3, 1fr)", // 3 items per row on small screens (sm, e.g., tablets)
          md: "repeat(4, 1fr)", // 4 items per row on medium screens (md, e.g., laptops)
          lg: "repeat(5, 1fr)", // 5 items per row on large screens (lg, e.g., desktops)
        },
        mt: 4,
      }}
    >
      {data.map((item, index) => {
        return (
          <Button
            key={item?.id || index}
            onClick={() => handleSubmit(item)}
            style={{
              marginTop: 4,
              marginBottom: 4,
              textTransform: "none",
            }}
          >
            <Card
              sx={{
                width: "200px",
                borderRadius: 2,
                boxShadow: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 6,
                },
                cursor: "pointer",
                display: "flex", // Use flexbox
                flexDirection: "column", // Column layout
                height: "340px", // Fixed height for cards
                overflow: "hidden", // Prevent overflow
              }}
            >
              <Box
                sx={{
                  height: "180px",
                  width: "100%",
                  position: "relative",
                }}
              >
                <Image
                  src={item.photoURL}
                  alt="User Image"
                  layout="fill"
                  objectFit="cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    display: "block",
                  }}
                />
              </Box>

              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  pl: 0.8,
                  pr: 0.8,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontFamily: "initial",
                    fontWeight: "bold",
                    fontSize: { xs: "0.8rem", sm: "1.2rem" }, // Responsive font size
                  }}
                >
                  {capitalizeWords(item.name)}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontFamily: "sans-serif",
                    fontSize: { xs: "0.7rem", sm: "0.8rem" }, // Responsive font size
                  }}
                >
                  {item.category}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontFamily: "sans-serif",
                    fontSize: { xs: "0.7rem", sm: "0.8rem" }, // Responsive font size
                  }}
                >
                  {item.state}
                </Typography>
                <PlatformList>
                  {item.platform.map((platformData, platformIndex) => (
                    <Box
                      key={platformIndex}
                      display="flex"
                      alignItems="center"
                      flexDirection={{ xs: "column", sm: "row" }}
                    >
                      <IconButton
                        href={platformData.platformLink}
                        target="_blank"
                      >
                        {SocialMediaIcon(
                          platformData,
                          `/assets/images/${platformData.platform.toLowerCase()}.png`
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
