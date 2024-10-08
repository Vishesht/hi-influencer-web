"use client";

import * as React from "react";
import { Box, Container, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ListModal from "@/components/ListModal";
import axios from "axios";
import { BaseUrl } from "@/common/utils";
import { useAppSelector } from "@/lib/hooks";
import GridComponent from "@/components/GridComponents";
import Loading from "@/components/LoadingSpinner";

export default function Home() {
  const [platformModalOpen, setPlatformModalOpen] = React.useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = React.useState(false);
  const [userList, setUserList] = React.useState([]);
  const [filteredUsers, setFilteredUsers] = React.useState([]);
  const [selectedPlatform, setSelectedPlatform] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const data = useAppSelector((state) => state.login.userData);
  const [loader, setLoader] = React.useState(false);

  React.useEffect(() => {
    const detectBrowser = () => {
      const userAgent = navigator.userAgent;

      if (userAgent.includes("Chrome")) {
        return "Chrome";
      } else if (userAgent.includes("Firefox")) {
        return "Firefox";
      } else if (userAgent.includes("Safari")) {
        return "Safari";
      } else if (userAgent.includes("Edge")) {
        return "Edge";
      } else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
        return "Internet Explorer";
      } else {
        const unknownBrowser = `Unknown Browser: ${userAgent}`;
        // window.open("https://www.hiinfluencer.in", "_blank");
        // Create a temporary anchor element
        const anchor = document.createElement("a");
        anchor.href = "https://www.hiinfluencer.in";
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer"; // Security measure
        document.body.appendChild(anchor);
        anchor.click(); // Programmatically click the link
        document.body.removeChild(anchor); // Clean up
        return unknownBrowser;
      }
    };

    const browser = detectBrowser();
    console.log(`User is using: ${browser}`);
    alert(browser);
  }, []);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}/api/userlist/${data?.id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setUserList(response.data);
        setFilteredUsers(response.data);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.error("Error:", error);
      }
    };

    if (data?.id) {
      setLoader(true);
      fetchUsers();
    }
  }, [data]);

  const uniqueCategories = [
    ...new Set(userList.map((user) => user.category).filter(Boolean)),
  ];

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
    setPlatformModalOpen(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCategoryModalOpen(false);
  };

  const handleRemovePlatform = () => {
    setSelectedPlatform("");
  };

  const handleRemoveCategory = () => {
    setSelectedCategory("");
  };

  React.useEffect(() => {
    let filtered = userList;

    if (selectedPlatform) {
      filtered = filtered.filter((user) =>
        user.platform.some((p) => p.platform === selectedPlatform)
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter((user) => user.category === selectedCategory);
    }

    setFilteredUsers(filtered);
  }, [selectedPlatform, selectedCategory, userList]);

  return (
    <Box>
      <Container sx={{ textAlign: "center", mt: 3 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(90deg, #FF76C6, #B64DFF)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontFamily: "Helvetica",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, // Responsive font size
          }}
        >
          Connect brands with influencers.
        </Typography>
        <Typography
          color="grey"
          variant="body1"
          sx={{ mt: 2, fontSize: { xs: "0.9rem", sm: "1rem" } }} // Responsive font size
        >
          Connect with top Instagram, YouTube, and Facebook influencers to
          create engaging content and promote your brand effectively.
        </Typography>

        {/* Input fields with cross buttons */}
        <Container
          sx={{
            mt: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: { xs: "column", sm: "row" }, // Responsive flex direction
            gap: 2, // Add gap between items
            maxWidth: "90%", // Limit maximum width
            mx: "auto", // Center the container
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: { xs: "100%", sm: "340px" }, // Responsive width for smaller screens
              marginRight: { sm: "10px", xs: "0" }, // Margin adjustment based on screen size
              marginBottom: { xs: "10px", sm: "0" }, // Margin adjustment based on screen size
            }}
          >
            <input
              value={selectedPlatform || "Choose a platform"}
              style={{
                padding: "12px 20px",
                borderRadius: "50px",
                width: "100%", // Make input full width
                border: "1px solid #ddd",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "box-shadow 0.3s ease, border-color 0.3s ease",
                outline: "none",
                color: selectedPlatform ? "black" : "#999",
              }}
              onClick={() => setPlatformModalOpen(true)}
              readOnly
            />
            {selectedPlatform && (
              <IconButton
                onClick={handleRemovePlatform}
                sx={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "gray",
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Box>

          <Box
            sx={{ position: "relative", width: { xs: "100%", sm: "340px" } }}
          >
            <input
              value={selectedCategory || "Enter keywords, niches or categories"}
              style={{
                padding: "12px 20px",
                borderRadius: "50px",
                width: "100%", // Make input full width
                border: "1px solid #ddd",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "box-shadow 0.3s ease, border-color 0.3s ease",
                outline: "none",
                color: selectedCategory ? "black" : "#999",
              }}
              onClick={() => setCategoryModalOpen(true)}
              readOnly
            />
            {selectedCategory && (
              <IconButton
                onClick={handleRemoveCategory}
                sx={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "gray",
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Box>
        </Container>

        {/* Conditional rendering for filtered users */}
        {filteredUsers.length > 0 ? (
          <GridComponent data={filteredUsers} />
        ) : loader ? (
          <Loading loading={loader} />
        ) : (
          <Typography variant="h6" sx={{ mt: 4, color: "gray" }}>
            No data found.
          </Typography>
        )}
      </Container>

      <ListModal
        title={"Select Platform"}
        platformModalOpen={platformModalOpen}
        setPlatformModalOpen={() => setPlatformModalOpen(false)}
        socialMediaPlatforms={[
          "Instagram",
          "Facebook",
          "Youtube",
          "Twitter",
          "Others",
        ]}
        onSelect={handlePlatformSelect}
      />

      <ListModal
        title={"Select Category"}
        platformModalOpen={categoryModalOpen}
        setPlatformModalOpen={() => setCategoryModalOpen(false)}
        socialMediaPlatforms={uniqueCategories}
        onSelect={handleCategorySelect}
      />
    </Box>
  );
}
