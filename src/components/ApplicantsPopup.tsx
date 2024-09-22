import React, { useState, useEffect } from "react";
import { Modal, Button, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";
import { BaseUrl } from "@/common/utils";

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
      // Handle successful acceptance (e.g., update local state or notify user)
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
      // Handle successful rejection (e.g., update local state or notify user)
      alert("Applicant rejected!");
      onClose();
    } catch (error) {
      console.error("Error rejecting applicant:", error);
      alert("Failed to reject applicant. Please try again.");
    }
  };
  const checkCondition = applicant == "Requested";

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ padding: 20, background: "#fff" }}>
        <h2>{checkCondition ? "Requested Applicants" : "Joined Applicants"}</h2>
        <List>
          {applicants.map((applicant) => (
            <ListItem key={applicant.id}>
              <ListItemText primary={applicant.name} />
              {checkCondition && (
                <>
                  <Button onClick={() => handleAccept(applicant.id)}>
                    Accept
                  </Button>
                  <Button onClick={() => handleReject(applicant.id)}>
                    Reject
                  </Button>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </div>
    </Modal>
  );
};

export default ApplicantsPopup;
