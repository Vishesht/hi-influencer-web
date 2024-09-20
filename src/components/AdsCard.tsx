import React from "react";
import {
  Box,
  Card,
  IconButton,
  Typography,
  Button,
  styled,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CategoryIcon from "@mui/icons-material/Category";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  overflow: "hidden",
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "240px",
  overflow: "hidden",
}));

const AdImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.5s ease",
}));

const DetailsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  height: "280px",
}));

const DetailItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

const DetailLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginRight: theme.spacing(1),
}));

interface AdCardProps {
  ad: {
    _id: string;
    title: string;
    desc: string;
    category: string;
    state: string;
    name: string;
    createdAt: string;
    budget: string;
    adsImages: string[];
  };
  myAds: boolean;
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onEditClick: () => void;
}

const AdCard: React.FC<AdCardProps> = ({
  myAds,
  ad,
  currentIndex,
  onNext,
  onPrev,
  onEditClick,
}) => {
  return (
    <StyledCard>
      <ImageContainer>
        <IconButton
          onClick={onPrev}
          style={{ position: "absolute", left: 0, zIndex: 1 }}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <AdImage
          src={
            ad.adsImages[currentIndex] ||
            "https://via.placeholder.com/400x200.png"
          }
          alt={ad.title}
        />
        <IconButton
          onClick={onNext}
          style={{ position: "absolute", right: 0, zIndex: 1 }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </ImageContainer>
      <DetailsContainer>
        <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>
          {ad.title}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          {ad.desc}
        </Typography>
        <DetailItem>
          <CategoryIcon fontSize="small" />
          <DetailLabel variant="body2">Category:</DetailLabel>
          <Typography variant="body2" color="textSecondary">
            {ad.category}
          </Typography>
        </DetailItem>
        <DetailItem>
          <LocationOnIcon fontSize="small" />
          <DetailLabel variant="body2">State:</DetailLabel>
          <Typography variant="body2" color="textSecondary">
            {ad.state}
          </Typography>
        </DetailItem>
        <DetailItem>
          <PersonIcon fontSize="small" />
          <DetailLabel variant="body2">Posted By:</DetailLabel>
          <Typography variant="body2" color="textSecondary">
            {ad.name}
          </Typography>
        </DetailItem>
        <DetailItem>
          <CalendarTodayIcon fontSize="small" />
          <DetailLabel variant="body2">Posted At:</DetailLabel>
          <Typography variant="body2" color="textSecondary">
            {new Date(ad.createdAt).toLocaleDateString()}
          </Typography>
        </DetailItem>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DetailItem>
            <AttachMoneyIcon fontSize="small" />
            <DetailLabel variant="body2">Budget:</DetailLabel>
            <Typography variant="body2" color="textPrimary">
              {ad.budget}
            </Typography>
          </DetailItem>
          {myAds && (
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginTop: "auto",
                borderRadius: "20px",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#0b5ed7",
                },
              }}
              onClick={onEditClick}
            >
              Edit
            </Button>
          )}
        </Box>
      </DetailsContainer>
    </StyledCard>
  );
};

export default AdCard;
