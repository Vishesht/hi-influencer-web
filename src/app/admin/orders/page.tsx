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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

const FilterBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const getStatusBackgroundColor = (status) => {
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

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/api/admin/getAllOrders`);
      const fetchedOrders = response.data;
      setOrders(fetchedOrders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => order.status === filter);

  const sortedOrders = [...filteredOrders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const approveOrder = async (_id) => {
    try {
      const newStatus = "Pending for approval";
      await axios.put(`${BaseUrl}/api/changeStatus`, { _id, newStatus });
      fetchOrders();
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
      <FilterBox>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select value={filter} onChange={handleFilterChange} label="Status">
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="In Review">In Review</MenuItem>
            <MenuItem value="Pending for approval">
              Pending for approval
            </MenuItem>
            <MenuItem value="Waiting for payment">Waiting for payment</MenuItem>
            <MenuItem value="Payment Completed">Payment Completed</MenuItem>
            <MenuItem value="Task Completed">Task Completed</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      </FilterBox>
      <Grid container spacing={3}>
        {sortedOrders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order._id}>
            <OrderCard bgColor={getStatusBackgroundColor(order.status)}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Package Name: {order.orderDetails[0].pkgName}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Influencer ID: {order.influencerId || "N/A"}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Status: <strong>{order.status}</strong>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Created At: {new Date(order.createdAt).toLocaleString()}
                </Typography>

                <Box mt={2}>
                  <Typography variant="body2" fontWeight="bold">
                    Order Details:
                  </Typography>
                  <Typography variant="body2">Order ID: {order._id}</Typography>
                  {order.orderDetails[0].socialMediaAccount && (
                    <Typography variant="body2">
                      Social Media Account:{" "}
                      {order.orderDetails[0].socialMediaAccount}
                    </Typography>
                  )}
                  {order.orderDetails[0].title && (
                    <Typography variant="body2">
                      Title: {order.orderDetails[0].title}
                    </Typography>
                  )}
                  {order.orderDetails[0].description && (
                    <Typography variant="body2">
                      Description: {order.orderDetails[0].description}
                    </Typography>
                  )}
                  {order.orderDetails[0].phone && (
                    <Typography variant="body2">
                      Phone: {order.orderDetails[0].phone}
                    </Typography>
                  )}
                  {order.orderDetails[0].negotiablePrice && (
                    <Typography variant="body2">
                      Price: {order.orderDetails[0].negotiablePrice}
                    </Typography>
                  )}
                  {order.orderDetails[0].images?.length > 0 && (
                    <Box mt={1}>
                      <Typography variant="body2" fontWeight="bold">
                        Images:
                      </Typography>
                      {order.orderDetails[0].images.map((img, index) => (
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
                      ))}
                    </Box>
                  )}
                </Box>

                {order.status === "Approved" && (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                  >
                    Pay
                  </Button>
                )}
                {order.status === "In Review" && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => approveOrder(order._id)}
                    fullWidth
                    sx={{ marginTop: 2 }}
                  >
                    Approve Order
                  </Button>
                )}
              </CardContent>
            </OrderCard>
          </Grid>
        ))}
      </Grid>
    </StyledBox>
  );
};

export default AdminOrders;
