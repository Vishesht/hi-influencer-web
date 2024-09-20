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
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { BaseUrl } from "@/common/utils";
import AdCard from "@/components/AdsCard";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { editAds } from "@/lib/features/Ads/AdsSlice";

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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [adsData, setAdsData] = useState([]);
  const [myAdsData, setMyAdsData] = useState([]);
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
        setAdsData(response.data);

        if (data?.id) {
          const res = await axios.get(`${BaseUrl}/api/getuserads/${data.id}`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          setMyAdsData(res.data);
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    fetchAds();
  }, [data?.id]);

  const filteredAds = adsData.filter((ad) => {
    const matchesSearchTerm =
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.state.toLowerCase().includes(searchTerm.toLowerCase());

    // Check if the filter is "myAds"
    const matchesFilter =
      filter === "all" ||
      (filter === "myAds" && myAdsData.some((userAd) => userAd.id === ad.id));

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

  const handleEditClick = (ad) => {
    dispatch(editAds(ad));
    router.push(`/create-ad?edit=true`);
  };

  return (
    <StyledContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          All Ads
        </Typography>
        <Button
          onClick={() => router.push("/create-ad")}
          variant="contained"
          color="secondary"
          sx={{
            backgroundColor: "#F653E1",
            marginLeft: "20px",
            padding: "4px 10px",
            borderRadius: "50px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            fontWeight: "bold",
            fontSize: "16px",
            textTransform: "none",
            transition: "background-color 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              backgroundColor: "#e44bcf",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
            },
            "&:active": {
              backgroundColor: "#d43bbf",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          Post Ads
        </Button>
      </Box>
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
                myAds={filter === "all" ? false : true}
                ad={ad}
                currentIndex={currentIndex}
                onNext={() => handleNextImage(ad._id)}
                onPrev={() => handlePrevImage(ad._id)}
                onEditClick={() => handleEditClick(ad)}
              />
            </Grid>
          );
        })}
      </Grid>
    </StyledContainer>
  );
};

export default Ads;
