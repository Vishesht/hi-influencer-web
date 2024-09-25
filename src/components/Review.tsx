// ReviewPopup.js
"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Rating,
  Box,
  Typography,
} from "@mui/material";

// Reusable ReviewPopup component
const ReviewPopup = ({ open, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ rating, review });
    // Clear input fields after submission
    setRating(0);
    setReview("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Submit Your Review</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Typography component="legend">Rate your experience:</Typography>
          <Rating
            name="client-rating"
            value={rating}
            onChange={handleRatingChange}
            size="large"
          />
        </Box>
        <TextField
          fullWidth
          label="Write your review"
          multiline
          rows={4}
          variant="outlined"
          value={review}
          onChange={handleReviewChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit Review
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewPopup;
