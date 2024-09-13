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
    name: "John Doe",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "John Doe",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "John Doe",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "John Doe",
    image: "https://via.placeholder.com/150",
  },
  // Add more influencer objects here
];

const CategoryList = ({ header }: { header: string }) => {
  return (
    <Container>
      <Typography style={{ marginTop: 22 }} variant="h4" gutterBottom>
        {header}
      </Typography>
      <HorizontalList>
        {influencers.map((influencer, index) => (
          <Card key={index} sx={{ width: 300 }}>
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
