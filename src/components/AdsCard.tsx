import React, { useState } from "react";
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
import { truncateText } from "@/common/utils";
import ApplicantsPopup from "./ApplicantsPopup";
import { useRouter } from "next/navigation";
import AdDetailPopup from "./AdDetailPopup";

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
  height: "340px",
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
    applicants: string[];
    accepted: string[];
  };
  myAds: boolean;
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onEditClick: () => void;
  onApply: () => void;
  isApplied: boolean;
  isApproved: boolean;
  refreshData: () => void;
}

const AdCard: React.FC<AdCardProps> = ({
  myAds,
  ad,
  currentIndex,
  onNext,
  onPrev,
  onEditClick,
  onApply,
  isApplied,
  isApproved,
  refreshData,
}) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [applicantsData, setApplicantsData] = useState([]);
  const [applicant, setApplicants] = useState("");
  const router = useRouter();

  const handleOpenPopup = (applicant) => {
    if (applicant === "Requested") {
      setApplicantsData(ad.applicants);
    } else {
      setApplicantsData(ad.accepted);
    }
    setApplicants(applicant);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    refreshData();
    setApplicantsData([]);
    setPopupOpen(false);
  };

  const handleOpenDetailPopup = () => {
    setSelectedAd(ad);
    setPopupOpen(true);
  };

  const handleCloseDetailPopup = () => {
    setPopupOpen(false);
    setSelectedAd(null);
  };
  return (
    <StyledCard>
      <ImageContainer>
        {ad.adsImages?.length > 1 && (
          <IconButton
            onClick={onPrev}
            style={{ position: "absolute", left: 0, zIndex: 1 }}
          >
            <ArrowBackIosIcon />
          </IconButton>
        )}
        <AdImage
          src={
            ad.adsImages[currentIndex] ||
            "https://via.placeholder.com/400x200.png"
          }
          alt={ad.title}
        />
        {ad.adsImages?.length > 1 && (
          <IconButton
            onClick={onNext}
            style={{ position: "absolute", right: 0, zIndex: 1 }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        )}
        <Button
          // disabled={isApplied || isApproved}
          variant="contained"
          color="primary"
          sx={{
            position: "absolute",
            right: 10,
            bottom: 10,
            height: 30,
            width: 80,
            borderRadius: "20px",
            textTransform: "none",
            fontWeight: 500,
            backgroundColor: isApplied
              ? "#FFC400"
              : isApproved
              ? "#28a745"
              : "#24A0ED", // Conditional background color
            "&:hover": {
              backgroundColor: isApplied
                ? "#FFB000"
                : isApproved
                ? "#218838"
                : "#007bff",
            },
          }}
          onClick={
            isApplied
              ? () => null
              : isApproved
              ? () => null
              : myAds
              ? onEditClick
              : onApply
          }
        >
          {myAds
            ? "Edit"
            : isApplied
            ? "Applied"
            : isApproved
            ? "Joined"
            : "Apply"}
        </Button>
      </ImageContainer>
      <DetailsContainer>
        <Typography
          sx={{ fontSize: 16, fontWeight: 600, cursor: "pointer" }}
          onClick={handleOpenDetailPopup}
        >
          {ad.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginBottom: 2, cursor: "pointer" }}
          onClick={handleOpenDetailPopup}
        >
          {truncateText(ad?.desc, 100)}
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
          <CalendarTodayIcon fontSize="inherit" />
          <DetailLabel variant="body2">Posted At:</DetailLabel>
          <Typography variant="body2" color="textSecondary">
            {new Date(ad.createdAt).toLocaleDateString()}
          </Typography>
        </DetailItem>
        {isApplied ||
          (isApproved && (
            <DetailItem>
              <AttachMoneyIcon fontSize="small" />
              <DetailLabel variant="body2">Status:</DetailLabel>
              <Typography variant="body2" color="textPrimary">
                {isApplied ? "Applied" : isApproved ? "Approved" : ""}
              </Typography>
            </DetailItem>
          ))}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DetailItem>
            <AttachMoneyIcon fontSize="small" />
            <DetailLabel variant="body2">Budget:</DetailLabel>
            <Typography variant="body2" color="textPrimary">
              {ad.budget}
            </Typography>
          </DetailItem>
        </Box>
        {myAds && (
          <DetailItem>
            <DetailLabel variant="body2">Requested Applicants:</DetailLabel>
            <Typography
              variant="body2"
              color="textPrimary"
              onClick={myAds ? () => handleOpenPopup("Requested") : null}
              sx={{
                cursor: "pointer",
                padding: "5px 12px", // Add padding to mimic button size
                borderRadius: "20px",
                backgroundColor: "#e0e0e0", // Light background color
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#d3d3d3", // Darker shade on hover
                },
              }}
            >
              {ad.applicants.length}
            </Typography>
          </DetailItem>
        )}
        <DetailItem>
          <DetailLabel variant="body2">Joined Applicants:</DetailLabel>
          <Typography
            variant="body2"
            color="textPrimary"
            onClick={myAds ? () => handleOpenPopup("Total") : null}
            sx={{
              cursor: "pointer",
              padding: "5px 12px", // Add padding to mimic button size
              borderRadius: "20px",
              backgroundColor: "#e0e0e0", // Light background color
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#d3d3d3", // Darker shade on hover
              },
            }}
          >
            {ad.accepted.length}
          </Typography>
        </DetailItem>
      </DetailsContainer>
      <ApplicantsPopup
        applicant={applicant}
        ad={ad}
        open={popupOpen}
        onClose={handleClosePopup}
        applicantIds={applicantsData}
      />
      <AdDetailPopup
        open={popupOpen}
        onClose={handleCloseDetailPopup}
        ad={selectedAd}
      />
    </StyledCard>
  );
};

export default AdCard;
