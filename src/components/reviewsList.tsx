import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Rating,
} from "@mui/material";
import { styled } from "@mui/system";
import StarIcon from "@mui/icons-material/Star";

// Styled container for the reviews
const ReviewsContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

// Styled card for each review
const ReviewCard = styled(Card)(({}) => ({
  transition: "box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: `0 8px 16px rgba(0, 0, 0, 0.2)`,
  },
}));

// Custom Rating component using star icons
const CustomRating = styled(Rating)(({}) => ({
  "& .MuiRating-icon": {
    // color: theme.palette.primary.main,
  },
}));

const ReviewsList = ({ reviewsData }) => (
  <ReviewsContainer>
    <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
      Reviews
    </Typography>
    <Grid container spacing={3}>
      {reviewsData.map((review) => (
        <Grid item xs={12} md={6} key={review.id}>
          <ReviewCard>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {review.user}
              </Typography>
              <CustomRating
                name="read-only"
                value={review.rating}
                readOnly
                precision={0.5}
                icon={<StarIcon />}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
                sx={{ marginBottom: 1 }}
              />
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                {review.comment}
              </Typography>
            </CardContent>
          </ReviewCard>
        </Grid>
      ))}
    </Grid>
  </ReviewsContainer>
);

export default ReviewsList;
