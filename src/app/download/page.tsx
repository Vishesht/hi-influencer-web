"use client";
import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Divider,
  Link,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AndroidIcon from "@mui/icons-material/Android"; // You can use MUI icons or any custom icons
import AppleIcon from "@mui/icons-material/Apple"; // You can use MUI icons or any custom icons

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
}));

const InfoCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  boxShadow: theme.shadows[3],
  marginBottom: theme.spacing(3),
}));

const AppLink = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[2],
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const IconWrapper = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 100,
  height: 100,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  marginRight: theme.spacing(2),
  background: theme.palette.grey[200],
}));

const Download: React.FC = () => {
  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Discover Our Influencer Hiring Platform
      </Typography>
      <InfoCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Revolutionize Your Influencer Marketing
          </Typography>
          <Typography variant="body1" paragraph>
            Our platform makes it easy to connect with influencers who can
            elevate your brand. From finding the perfect influencer to managing
            campaigns, we provide the tools you need to succeed in influencer
            marketing.
          </Typography>
          <Typography variant="body1" paragraph>
            Download our app to get started on the go. Access all the features
            of our platform right from your mobile device. Whether you are on
            iOS or Android, we have you covered!
          </Typography>
        </CardContent>
      </InfoCard>

      <Divider sx={{ marginBottom: 4 }} />

      <Typography variant="h6" gutterBottom>
        Download the App
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <AppLink
            href="https://play.google.com/store/apps/details?id=com.yourapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWrapper>
              <AndroidIcon fontSize="large" color="primary" />
            </IconWrapper>
            <Box>
              <Typography variant="h6">Get it on Google Play</Typography>
              <Typography variant="body2" color="textSecondary">
                Available on Android devices.
              </Typography>
            </Box>
          </AppLink>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AppLink
            href="https://apps.apple.com/us/app/yourapp/id1234567890"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWrapper>
              <AppleIcon fontSize="large" color="primary" />
            </IconWrapper>
            <Box>
              <Typography variant="h6">Download on the App Store</Typography>
              <Typography variant="body2" color="textSecondary">
                Available on iOS devices.
              </Typography>
            </Box>
          </AppLink>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Download;
