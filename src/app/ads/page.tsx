"use client";
import React, { useState } from "react";
import {
  Box,
  Card,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const AdCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginBottom: theme.spacing(2),
}));

const AdImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "auto",
  borderRadius: theme.shape.borderRadius,
}));

const AdDetails = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const Ads: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAds, setFilteredAds] = useState(ads);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    setFilteredAds(
      ads.filter(
        (ad) =>
          ad.title.toLowerCase().includes(searchValue) ||
          ad.location.toLowerCase().includes(searchValue)
      )
    );
  };

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        All Ads
      </Typography>
      <TextField
        fullWidth
        placeholder="Search ads by title or location"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        style={{ marginBottom: "20px" }}
      />
      <Grid container spacing={2}>
        {filteredAds.map((ad) => (
          <Grid item xs={12} sm={6} md={4} key={ad.id}>
            <AdCard>
              <AdImage src={ad.image} alt={ad.title} />
              <AdDetails>
                <Typography variant="h6">{ad.title}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {ad.location}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {ad.datePosted}
                </Typography>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  sx={{ marginTop: 1 }}
                >
                  <strong>Requests:</strong> {ad.requests}
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  <strong>Price:</strong> {ad.price}
                </Typography>
              </AdDetails>
            </AdCard>
          </Grid>
        ))}
      </Grid>
    </StyledContainer>
  );
};

export default Ads;

// Dummy data for ads
const ads = [
  {
    id: "1",
    image: "https://via.placeholder.com/400x200.png",
    title: "Promote New Restaurant",
    location: "Downtown, NY",
    datePosted: "2024-09-01",
    requests: "122",
    price: "$500",
  },
  {
    id: "2",
    image: "https://via.placeholder.com/400x200.png",
    title: "YouTube Channel Promotion",
    location: "San Francisco, CA",
    datePosted: "2024-08-29",
    requests: "12",
    price: "$800",
  },
  {
    id: "3",
    image: "https://via.placeholder.com/400x200.png",
    title: "Instagram Shoutout",
    location: "Los Angeles, CA",
    datePosted: "2024-08-22",
    requests: "1322",
    price: "$300",
  },
  {
    id: "4",
    image: "https://via.placeholder.com/400x200.png",
    title: "Business Promotion",
    location: "New York, NY",
    datePosted: "2024-08-30",
    requests: "322",
    price: "$1000",
  },
  {
    id: "5",
    image: "https://via.placeholder.com/400x200.png",
    title: "New Product Launch",
    location: "Chicago, IL",
    datePosted: "2024-09-02",
    requests: "412",
    price: "$600",
  },
  {
    id: "6",
    image: "https://via.placeholder.com/400x200.png",
    title: "Event Promotion",
    location: "Miami, FL",
    datePosted: "2024-08-28",
    requests: "995",
    price: "$400",
  },
];
