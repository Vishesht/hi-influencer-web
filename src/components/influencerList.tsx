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
import { useRouter } from "next/navigation";

// Styled component for the horizontal list
const HorizontalList = styled(Box)(({ theme }) => ({
  display: "flex",
  overflowX: "auto",
  padding: theme.spacing(2),
  gap: theme.spacing(2),
}));

const InfluencerList = ({ header }: { header: string }) => {
  const router = useRouter();

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
          <Typography variant="body2" gutterBottom>
            Hire top influencer across all platforms
          </Typography>
        </Box>

        <Typography variant="body2" gutterBottom>
          See more
        </Typography>
      </Box>

      <HorizontalList>
        {influencersData.map((influencer, index) => (
          <Card
            onClick={() => router.push("/influencer-profile")}
            key={index}
            sx={{ width: 300 }}
          >
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
