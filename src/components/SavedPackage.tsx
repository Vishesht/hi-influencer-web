import React from "react";
import {
  CardContent,
  Typography,
  Grid,
  Button,
  styled,
  Card,
  Box,
} from "@mui/material";

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  height: 300,
}));

const packagesData = [
  {
    name: "Promotions",
    description: "Promote through video, images, or story posts.",
  },
  {
    name: "Free Promotion",
    description: "This is a free promotion to increase visibility.",
  },
  {
    name: "Ask for Follow",
    description: "Encourage users to follow you on social media.",
  },
  {
    name: "Invitation",
    description:
      "Invite to parties, clubs, or restaurants for promotional events.",
  },
  {
    name: "Join the Trip with Influencer",
    description: "Join influencers on their trips for unique experiences.",
  },
  {
    name: "Book Appointment",
    description: "Book personal appointments with the influencer.",
  },
  { name: "Chat", description: "Pay to chat with the influencer." },
];

const SavedPackage = ({ pkg, isEdit }) => {
  const packageData = packagesData?.find((data) => data.name === pkg.name);
  const packageDescription = packageData ? packageData.description : "";

  return (
    <Grid item xs={12} sm={6} md={4}>
      <StyledCard>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {pkg.name}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "text.secondary", marginBottom: 1 }}
            >
              {pkg.price || "Price not specified"}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
              <strong>Description:</strong> {packageDescription}
            </Typography>
            {pkg.name === "Promotions" && (
              <>
                <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                  <strong>Platform:</strong> {pkg.data.platform}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                  <strong>Video Price:</strong> Rs.{pkg.data.videoPrice}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                  <strong>Image Price:</strong> Rs.{pkg.data.imagePrice}
                </Typography>
                <Typography variant="body2">
                  <strong>Story Price:</strong> Rs.{pkg.data.storyPrice}
                </Typography>
              </>
            )}
          </Box>
          <Box>
            {/* Add other package details similarly */}
            {isEdit && (
              <Button
                sx={{ mt: 2 }}
                variant="contained"
                onClick={() => {
                  /* handle hire logic */
                }}
                fullWidth
              >
                Hire
              </Button>
            )}
          </Box>
        </CardContent>
      </StyledCard>
    </Grid>
  );
};

export default SavedPackage;
