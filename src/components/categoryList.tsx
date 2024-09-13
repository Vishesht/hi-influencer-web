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

// Styled component for the horizontal list
const HorizontalList = styled(Box)(({ theme }) => ({
  display: "flex",
  overflowX: "auto",
  padding: theme.spacing(2),
  gap: theme.spacing(2),
}));

// Sample influencer data
const influencers = [
  {
    name: "Fashion",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Music & Dance",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Beauty",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Travel",
    image: "https://via.placeholder.com/150",
  },
  // Add more influencer objects here
];

const CategoryList = ({ header }: { header: string }) => {
  return (
    <Container style={{ marginBottom: 44 }}>
      <Typography sx={{ fontWeight: "bold", marginTop: 5 }} variant="h5">
        {header}
      </Typography>
      <HorizontalList>
        {influencers.map((influencer, index) => (
          <Card key={index} sx={{ width: "100%" }}>
            <CardMedia
              component="img"
              height="140"
              image={influencer.image}
              alt={influencer.name}
            ></CardMedia>
            <CardContent style={{ backgroundColor: "#fff" }}>
              <Typography variant="h6">{influencer.name}</Typography>
            </CardContent>
          </Card>
        ))}
      </HorizontalList>
    </Container>
  );
};

export default CategoryList;
