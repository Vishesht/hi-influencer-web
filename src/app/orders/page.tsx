"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { BaseUrl } from "@/common/utils";
import { useAppSelector } from "@/lib/hooks";

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const FilterBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const OrderCard = styled(Card)(({ theme, bgColor }) => ({
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[3],
  backgroundColor: bgColor,
}));

const Orders: React.FC = () => {
  const [filter, setFilter] = useState<string>("All");
  const data = useAppSelector((state) => state.login.userData);
  const [orderData, setOrders] = useState<any>([]);

  useEffect(() => {
    getOrders();
  }, [data?.id]);

  const getOrders = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/api/getorders/${data?.id}`);
      const orders = response.data.userOrders || [];
      setOrders(orders); // Set all orders
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilter(event.target.value as string);
  };

  const filteredOrders = orderData.filter(
    (order) => filter === "All" || order.status === filter
  );

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
      case "Requested":
        return "#ff9800"; // Orange for requested orders
      case "New":
        return "#cddc39"; // Lime for new orders
      default:
        return "#ffffff80"; // Default white for any other status
    }
  };

  const handleAcceptOrder = async (orderId: string) => {};

  const handleRejectOrder = async (orderId: string) => {};
  return (
    <StyledBox>
      <FilterBox>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select value={filter} onChange={handleFilterChange} label="Status">
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="In Review">In Review</MenuItem>
            <MenuItem value="Pending for approval">
              Pending for approval
            </MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
            <MenuItem value="Requested">Requested</MenuItem>
          </Select>
        </FormControl>
      </FilterBox>

      <Grid container spacing={3}>
        {filteredOrders.map((order: any) => (
          <Grid item xs={12} sm={6} md={4} key={order._id}>
            <OrderCard bgColor={getStatusBackgroundColor(order.status)}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Package Name: {order.orderDetails.pkgName}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Influencer: {order.influencerDetails.name}
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
                  {order.orderDetails.socialMediaAccount && (
                    <Typography variant="body2">
                      Social Media Account:{" "}
                      {order.orderDetails.socialMediaAccount}
                    </Typography>
                  )}
                  {order.orderDetails.title && (
                    <Typography variant="body2">
                      Title: {order.orderDetails.title}
                    </Typography>
                  )}
                  {order.orderDetails.description && (
                    <Typography variant="body2">
                      Description: {order.orderDetails.description}
                    </Typography>
                  )}
                  {order.orderDetails.phone && (
                    <Typography variant="body2">
                      Phone: {order.orderDetails.phone}
                    </Typography>
                  )}
                  {order.orderDetails.timing && (
                    <Typography variant="body2">
                      Timing: {order.orderDetails.timing}
                    </Typography>
                  )}
                  {order.orderDetails.location && (
                    <Typography variant="body2">
                      Location: {order.orderDetails.location}
                    </Typography>
                  )}
                  {order.orderDetails.negotiablePrice && (
                    <Typography variant="body2">
                      Price: {order.orderDetails.negotiablePrice}
                    </Typography>
                  )}
                  {order.orderDetails.images?.length > 0 && (
                    <Box mt={1}>
                      <Typography variant="body2" fontWeight="bold">
                        Images:
                      </Typography>
                      {order.orderDetails.images.map(
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

                {order.status === "New" && (
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleAcceptOrder(order._id)}
                      sx={{ marginRight: 1 }}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleRejectOrder(order._id)}
                    >
                      Reject
                    </Button>
                  </Box>
                )}

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
              </CardContent>
            </OrderCard>
          </Grid>
        ))}
      </Grid>
    </StyledBox>
  );
};

export default Orders;
