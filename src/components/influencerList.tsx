// Add this directive at the top of your file
"use client";

import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { influencersData } from "./dummyData";
import StarIcon from "@mui/icons-material/Star";
import Link from "next/link";

// "Roboto", "Helvetica", "Arial", sans-serif';
const customFontFamily = "Roboto";

// Styled component for the horizontal list
const HorizontalList = styled(Box)(({ theme }) => ({
  display: "flex",
  overflowX: "auto",
  padding: theme.spacing(2),
  gap: theme.spacing(2),
}));

const InfluencerList = ({ header }: { header: string }) => {
  return (
    <Container>
      <Box
        style={{ marginTop: 32 }}
        display="flex"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Box>
          <Typography sx={{ fontWeight: "bold" }} variant="h5">
            {header}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            sx={{
              fontFamily: "Helvetica",
            }}
          >
            Hire top influencer across all platforms
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            display: "inline-block",
            padding: "4px 10px",
            borderRadius: "4px",
            backgroundColor: "#F653E1", // Background color
            color: "#fff", // Text color
            fontWeight: "bold", // Font weight
            textAlign: "center", // Center text
            cursor: "pointer", // Pointer cursor on hover
            transition: "background-color 0.3s ease, box-shadow 0.3s ease", // Smooth transitions
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Light shadow for depth
            "&:hover": {
              backgroundColor: "#e44bcf", // Background color on hover
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Darker shadow on hover
            },
            "&:active": {
              backgroundColor: "#d43bbf", // Background color on click
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)", // Lighter shadow on click
            },
          }}
          onClick={() => {
            // Handle click event
            console.log("See more clicked");
          }}
        >
          See more
        </Typography>
      </Box>

      <HorizontalList>
        {influencersData.map((influencer, index) => (
          <Link
            key={index}
            href={{
              pathname: "/influencer-profile",
              query: {
                influencer: JSON.stringify(influencer),
              },
            }}
            passHref
          >
            <Card
              key={index}
              sx={{
                width: 260,
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
              <CardMedia
                component="img"
                image={influencer.image}
                alt={influencer.name}
                sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
              />
              <CardContent
                sx={{
                  height: 140,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  p: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: customFontFamily,
                    fontWeight: "bold",
                    mb: 1,
                  }}
                >
                  {influencer.name}
                </Typography>
                <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: customFontFamily,
                      mr: 0.5,
                    }}
                  >
                    {influencer.star}
                  </Typography>
                  <StarIcon sx={{ height: 16, color: "primary.main" }} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: customFontFamily,
                      ml: 0.5,
                    }}
                  >
                    ({influencer.ratings})
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontFamily: customFontFamily,
                    mb: 0.5,
                  }}
                >
                  {influencer.location}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontFamily: customFontFamily,
                  }}
                >
                  {influencer.category}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </HorizontalList>
    </Container>
  );
};

export default InfluencerList;
