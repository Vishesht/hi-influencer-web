"use client";

import * as React from "react";
import InfluencerList from "@/components/influencerList";
import CategoryList from "@/components/categoryList";
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ListModal from "@/components/ListModal";
import axios from "axios";
import { BaseUrl } from "@/common/utils";
import { useAppSelector } from "@/lib/hooks";
import GridComponent from "@/components/GridComponents";

const socialMediaPlatforms = ["Instagram", "Facebook", "YouTube", "Others"];
const categories = ["Fashion", "Tech", "Lifestyle", "Travel", "Others"];

export default function Home() {
  const theme = useTheme();
  const [platformModalOpen, setPlatformModalOpen] = React.useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [userList, setUserList] = React.useState([]);
  const data = useAppSelector((state) => state.login.userData);

  React.useEffect(() => {
    const fetchUsers = async () => {
      axios
        .get(`${BaseUrl}/api/userlist/${data?.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setUserList(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    if (data?.id) {
      fetchUsers();
    }
  }, [data]);

  return (
    <Box>
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(90deg, #FF76C6, #B64DFF)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontFamily: "Helvetica",
          }}
        >
          Connect brands with influencers.
        </Typography>
        <Typography color="grey" variant="body1" sx={{ mt: 2 }}>
          Connect with top Instagram, YouTube, and Facebook influencers to
          create engaging content and promote your brand effectively.
        </Typography>

        {/* Input fields */}
        <Container
          sx={{
            mt: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <input
            placeholder="Choose a platform"
            style={{
              padding: "12px 20px",
              borderRadius: "50px",
              marginRight: isMobile ? "0" : "10px",
              marginBottom: isMobile ? "10px" : "0",
              width: "340px",
              border: "1px solid #ddd",
              backgroundColor: "#fff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "box-shadow 0.3s ease, border-color 0.3s ease",
              fontSize: "16px",
              outline: "none",
            }}
            onClick={() => setPlatformModalOpen(true)}
            onFocus={(e) =>
              (e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)")
            }
            onBlur={(e) =>
              (e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)")
            }
          />

          <input
            placeholder="Enter keywords, niches or categories"
            style={{
              padding: "12px 20px",
              borderRadius: "50px",
              marginRight: isMobile ? "0" : "10px",
              width: "340px",
              border: "1px solid #ddd",
              backgroundColor: "#fff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "box-shadow 0.3s ease, border-color 0.3s ease",
              fontSize: "16px",
              outline: "none",
            }}
            onClick={() => setCategoryModalOpen(true)}
            onFocus={(e) =>
              (e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)")
            }
            onBlur={(e) =>
              (e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)")
            }
          />
        </Container>
        <GridComponent data={userList} />
      </Container>
      {/* <InfluencerList data={userList} header="Featured" /> */}
      {/* <InfluencerList data={userList} header="Instagram" />
      <InfluencerList data={userList} header="Youtube" /> */}
      {/* <CategoryList header="Categories" /> */}

      <ListModal
        title={"Select Platform"}
        platformModalOpen={platformModalOpen}
        setPlatformModalOpen={() => setPlatformModalOpen(false)}
        socialMediaPlatforms={socialMediaPlatforms}
      />

      <ListModal
        title={"Select Category"}
        platformModalOpen={categoryModalOpen}
        setPlatformModalOpen={() => setCategoryModalOpen(false)}
        socialMediaPlatforms={categories}
      />
    </Box>
  );
}
