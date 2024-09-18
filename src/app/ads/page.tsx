"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { BaseUrl } from "@/common/utils";
import AdCard from "@/components/AdsCard";

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const Ads: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [adsData, setAdsData] = useState([]);
  const [currentImageIndices, setCurrentImageIndices] = useState({});

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/getallads`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setAdsData(response.data); // Set the fetched ads data
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    fetchAds();
  }, []);

  const filteredAds = adsData.filter(
    (ad) =>
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleNextImage = (adId) => {
    setCurrentImageIndices((prev) => {
      const currentIndex = prev[adId] ?? 0;
      const ad = adsData.find((ad) => ad._id === adId);
      const totalImages = ad?.adsImages.length || 0;

      return {
        ...prev,
        [adId]: (currentIndex + 1) % totalImages, // Loop back to the start
      };
    });
  };

  const handlePrevImage = (adId) => {
    setCurrentImageIndices((prev) => {
      const currentIndex = prev[adId] ?? 0;
      const ad = adsData.find((ad) => ad._id === adId);
      const totalImages = ad?.adsImages.length || 0;

      return {
        ...prev,
        [adId]: (currentIndex - 1 + totalImages) % totalImages, // Loop to the end
      };
    });
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
        {filteredAds.map((ad) => {
          const currentIndex = currentImageIndices[ad._id] ?? 0;
          return (
            <Grid item xs={12} sm={6} md={4} key={ad._id}>
              <AdCard
                ad={ad}
                currentIndex={currentIndex}
                onNext={() => handleNextImage(ad._id)}
                onPrev={() => handlePrevImage(ad._id)}
              />
            </Grid>
          );
        })}
      </Grid>
    </StyledContainer>
  );
};

export default Ads;
