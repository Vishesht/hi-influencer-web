"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { BaseUrl } from "@/common/utils";
import AdCard from "@/components/AdsCard";
import { useAppSelector } from "@/lib/hooks";

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const FilterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(1.5),
  borderRadius: "8px",
  marginBottom: theme.spacing(2),
}));

const Ads: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [adsData, setAdsData] = useState([]);
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const [filter, setFilter] = useState("all");
  const data = useAppSelector((state) => state.login.userData);

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

  const filteredAds = adsData.filter((ad) => {
    const matchesSearchTerm =
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.state.toLowerCase().includes(searchTerm.toLowerCase());

    // Check if the filter is "myAds"
    const matchesFilter =
      filter === "all" || (filter === "myAds" && ad.id === data?.id);

    return matchesSearchTerm && matchesFilter;
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string
  ) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
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

      <FilterContainer>
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
          style={{ marginBottom: "10px" }}
        />

        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilterChange}
          fullWidth
          sx={{ marginBottom: 1 }}
        >
          <ToggleButton value="all">All Ads</ToggleButton>
          <ToggleButton value="myAds">My Ads</ToggleButton>
        </ToggleButtonGroup>
      </FilterContainer>

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
