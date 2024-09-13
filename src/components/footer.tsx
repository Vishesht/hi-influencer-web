// Add this directive at the top of your file
"use client";

import React from "react";
import { Container, Typography, Box, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { styled } from "@mui/system";

// Styled component for the footer
const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#000",
  padding: theme.spacing(8),
  marginTop: "auto",
}));

const SocialIcons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  justifyContent: "center",
  marginTop: theme.spacing(2),
}));

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <Typography color="#fff" variant="h6" align="center" gutterBottom>
          Company Name
        </Typography>
        <Typography variant="body2" align="center" color="#fff">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </Typography>
        <Box display="flex" justifyContent="center" mt={2}>
          <Link color="#fff" href="/privacy-policy" variant="body2" mx={1}>
            Privacy Policy
          </Link>
          <Link color="#fff" href="/terms-of-service" variant="body2" mx={1}>
            Terms of Service
          </Link>
        </Box>
        <SocialIcons>
          <IconButton
            color="inherit"
            aria-label="facebook"
            href="https://facebook.com"
            target="_blank"
          >
            <Facebook />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="twitter"
            href="https://twitter.com"
            target="_blank"
          >
            <Twitter />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="instagram"
            href="https://instagram.com"
            target="_blank"
          >
            <Instagram />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="linkedin"
            href="https://linkedin.com"
            target="_blank"
          >
            <LinkedIn />
          </IconButton>
        </SocialIcons>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
