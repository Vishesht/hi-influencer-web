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
      <Typography style={{ marginTop: 32 }} variant="h5" gutterBottom>
        {header}
      </Typography>
      <HorizontalList>
        {influencersData.map((influencer, index) => (
          <Card key={index} sx={{ width: 300 }}>
            <CardMedia
              component="img"
              image={influencer.image}
              alt={influencer.name}
            />
            <CardContent style={{ height: 140 }}>
              <Typography variant="h6">{influencer.name}</Typography>
              <Typography color="text.secondary">
                <Box display="flex" alignItems="center">
                  <Typography variant="body2">{influencer.star}</Typography>
                  <StarIcon style={{ height: 16 }} color="primary" />
                  <Typography variant="body2">
                    ({influencer.ratings})
                  </Typography>
                </Box>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {influencer.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {influencer.category}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </HorizontalList>
    </Container>
  );
};

export default InfluencerList;
