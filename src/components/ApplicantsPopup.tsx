import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { BaseUrl } from "@/common/utils";
import Image from "next/image";
import { fontSizes } from "@/lib/utils/styles";

const ApplicantsPopup = ({ ad, open, onClose, applicant, applicantIds }) => {
  const [applicants, setApplicants] = useState([]);

  const getUserDetailsByIds = async (userIds) => {
    try {
      const response = await axios.post(`${BaseUrl}/api/users/details`, {
        userIds,
      });
      return response.data; // Return the array of user details
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error; // Rethrow the error for handling in the component
    }
  };

  useEffect(() => {
    const fetchApplicants = async () => {
      if (applicantIds.length > 0) {
        try {
          const response = await getUserDetailsByIds(applicantIds);
          setApplicants(response);
        } catch (error) {
          console.error("Error fetching applicants:", error);
        }
      } else {
        setApplicants([]);
      }
    };

    fetchApplicants();
  }, [applicantIds]);

  const handleAccept = async (userId) => {
    try {
      await axios.post(`${BaseUrl}/api/ads/${ad._id}/accept/${userId}`);
      alert("Applicant accepted!");
      onClose();
    } catch (error) {
      console.error("Error accepting applicant:", error);
      alert("Failed to accept applicant. Please try again.");
    }
  };

  const handleReject = async (userId) => {
    try {
      await axios.post(`${BaseUrl}/api/ads/${ad._id}/reject/${userId}`);
      alert("Applicant rejected!");
      onClose();
    } catch (error) {
      console.error("Error rejecting applicant:", error);
      alert("Failed to reject applicant. Please try again.");
    }
  };

  const checkCondition = applicant === "Requested";

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: 3,
            padding: 2,
            position: "relative",
            width: {
              xs: "90%",
              sm: "70%",
              md: "50%",
              lg: "400px",
            },
            maxWidth: "400px",
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", right: 10, top: 10 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            {checkCondition ? "Requested Applicants" : "Joined Applicants"}
          </Typography>
          {applicants.length > 0 ? (
            <List>
              {applicants.map((applicant) => (
                <ListItem
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  key={applicant.id}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Image
                      alt={applicant.name}
                      src={applicant?.photoURL}
                      width={24}
                      height={24}
                      style={{
                        objectFit: "cover",
                        borderRadius: 50,
                      }}
                    />
                    <Typography
                      sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}
                      variant="body2"
                    >
                      {applicant.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    {checkCondition && (
                      <>
                        <Button
                          sx={{
                            color: "darkgreen",
                            fontWeight: "600",
                            backgroundColor: "lightgreen",
                            mr: 1,
                            ml: 0.5,
                            fontSize: fontSizes,
                          }}
                          onClick={() => handleAccept(applicant.id)}
                        >
                          Accept
                        </Button>
                        <Button
                          sx={{
                            color: "red",
                            fontWeight: "600",
                            backgroundColor: "lightgrey",
                            fontSize: fontSizes,
                          }}
                          onClick={() => handleReject(applicant.id)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </Box>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1" align="center" sx={{ marginTop: 2 }}>
              No applicants found.
            </Typography>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default ApplicantsPopup;
