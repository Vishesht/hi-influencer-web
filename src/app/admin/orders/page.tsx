"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { BaseUrl } from "@/common/utils"; // Adjust the import according to your structure

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const OrderCard = styled(Card)(({ theme, bgColor }) => ({
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[3],
  backgroundColor: bgColor,
}));

const getStatusBackgroundColor = (status: string) => {
  switch (status) {
    case "In Review":
      return "#ffeb3b80"; // Yellow
    case "Pending for approval":
      return "#2196f380"; // Blue
    case "Approved":
      return "#4caf5080"; // Green
    case "Completed":
      return "#9e9e9e80"; // Grey
    case "Cancelled":
      return "#ff000080"; // Red
    default:
      return "#ffffff80"; // Default white for any other status
  }
};

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/api/admin/getAllOrders`);
      const fetchedOrders = response.data;
      console.log("Fetched orders:", fetchedOrders); // For debugging
      setOrders(fetchedOrders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const approveOrder = async (orderId: string) => {
    try {
      await axios.put(`${BaseUrl}/api/admin/approveOrder`, { orderId });
      fetchOrders(); // Refresh orders after approval
    } catch (error) {
      console.error("Error approving order:", error);
    }
  };

  if (loading) {
    return (
      <StyledBox>
        <CircularProgress />
      </StyledBox>
    );
  }
  return (
    <StyledBox>
      <Typography variant="h4" gutterBottom>
        All Orders
      </Typography>
      <Grid container spacing={3}>
        {orders.map((order) =>
          order.userOrders.map((userOrder) => (
            <Grid item xs={12} sm={6} md={4} key={userOrder._id}>
              <OrderCard bgColor={getStatusBackgroundColor(userOrder.status)}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Package Name: {userOrder.orderDetails.pkgName}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    InfluencerId: {userOrder.influencerId || "N/A"}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Status: <strong>{userOrder.status}</strong>
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Created At: {new Date(userOrder.createdAt).toLocaleString()}
                  </Typography>

                  <Box mt={2}>
                    <Typography variant="body2" fontWeight="bold">
                      Order Details:
                    </Typography>
                    <Typography variant="body2">
                      Order ID: {userOrder._id}
                    </Typography>
                    {userOrder.orderDetails.socialMediaAccount && (
                      <Typography variant="body2">
                        Social Media Account:{" "}
                        {userOrder.orderDetails.socialMediaAccount}
                      </Typography>
                    )}
                    {userOrder.orderDetails.title && (
                      <Typography variant="body2">
                        Title: {userOrder.orderDetails.title}
                      </Typography>
                    )}
                    {userOrder.orderDetails.description && (
                      <Typography variant="body2">
                        Description: {userOrder.orderDetails.description}
                      </Typography>
                    )}
                    {userOrder.orderDetails.phone && (
                      <Typography variant="body2">
                        Phone: {userOrder.orderDetails.phone}
                      </Typography>
                    )}
                    {userOrder.orderDetails.timing && (
                      <Typography variant="body2">
                        Timing: {userOrder.orderDetails.timing}
                      </Typography>
                    )}
                    {userOrder.orderDetails.location && (
                      <Typography variant="body2">
                        Location: {userOrder.orderDetails.location}
                      </Typography>
                    )}
                    {userOrder.orderDetails.negotiablePrice && (
                      <Typography variant="body2">
                        Price: {userOrder.orderDetails.negotiablePrice}
                      </Typography>
                    )}
                    {userOrder.orderDetails.images?.length > 0 && (
                      <Box mt={1}>
                        <Typography variant="body2" fontWeight="bold">
                          Images:
                        </Typography>
                        {userOrder.orderDetails.images.map(
                          (img: string, index: number) => (
                            <img
                              key={index}
                              src={img}
                              alt={`Order Image ${index}`}
                              style={{
                                width: "100%",
                                height: "auto",
                                marginBottom: "5px",
                              }}
                            />
                          )
                        )}
                      </Box>
                    )}
                  </Box>

                  {userOrder.status === "Approved" && (
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ marginTop: 2 }}
                    >
                      Pay
                    </Button>
                  )}
                  {userOrder.status === "In Review" && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => approveOrder(userOrder._id)}
                      fullWidth
                      sx={{ marginTop: 2 }}
                    >
                      Approve Order
                    </Button>
                  )}
                </CardContent>
              </OrderCard>
            </Grid>
          ))
        )}
      </Grid>
    </StyledBox>
  );
};

export default AdminOrders;
