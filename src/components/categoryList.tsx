"use client";

import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";

// Styled component for cards with hover effect
const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  borderRadius: 12, // Custom border radius
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Custom shadow value
  width: "100%", // Ensures card takes full width of its container
  maxWidth: "300px", // Set a max width for larger screens
  margin: theme.spacing(2), // Margin for spacing around cards
  // Responsive design adjustments
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%", // Full width on small screens
    margin: theme.spacing(1), // Less margin on small screens
  },
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)", // Custom shadow on hover
  },
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
      <Grid container spacing={2}>
        {influencers.map((influencer, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StyledCard>
              <CardMedia
                component="img"
                height="140"
                image={influencer.image}
                alt={influencer.name}
              />
              <CardContent>
                <Typography variant="h6">{influencer.name}</Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoryList;
