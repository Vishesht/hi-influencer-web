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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { BaseUrl } from "@/common/utils"; // Adjust the import according to your structure
import InfluencerProfileComponent from "@/components/InfluencerProfileComponent";
import { sendNotification } from "@/api/commonApi";

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

  // Modal State
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [requestedChangesText, setRequestedChangesText] = useState("");

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

  const sortedOrders: any = [...filteredOrders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const approveOrder = async (_id, order) => {
    try {
      const newStatus = "Pending for approval";
      await axios
        .put(`${BaseUrl}/api/changeStatus`, { _id, newStatus })
        .then((res) => {
          if (res.status == 200) {
            const title = "New Order Received";
            const desc = `You got a new order for the package "${order.orderDetails[0].pkgName}". Please check your orders for more details.`;
            sendNotification(order.influencerDetails.email, title, desc);
            const title1 = "Order Received";
            const desc1 = `Your order is received by "${order.influencerDetails.name}". Wait for his confirmation.`;
            sendNotification(order.loggedUserId.email, title1, desc1);
          }
        });
      fetchOrders();
    } catch (error) {
      console.error("Error approving order:", error);
    }
  };

  // Open modal to add requested changes
  const handleOpenModal = (_id) => {
    setSelectedOrderId(_id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setRequestedChangesText("");
  };

  const updateRequestedChanges = async () => {
    try {
      await axios.put(`${BaseUrl}/api/orders/requestedChanges`, {
        _id: selectedOrderId,
        requestedChanges: requestedChangesText,
      });
      console.log("Requested changes updated successfully");
      fetchOrders(); // Optionally refresh the orders
      handleCloseModal(); // Close the modal after successful update
    } catch (error) {
      console.error(
        "Error updating requested changes:",
        error.response?.data || error.message
      );
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
                <InfluencerProfileComponent
                  influencer={true}
                  influencerDetails={order?.influencerDetails}
                />
                <Typography variant="body1" gutterBottom>
                  Status: <strong>{order.status}</strong>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Created At: {new Date(order.createdAt).toLocaleString()}
                </Typography>
                <InfluencerProfileComponent
                  influencerDetails={order?.loggedUserId}
                />
                <Box mt={2}>
                  <Typography variant="body2" fontWeight="bold">
                    Order Details:
                  </Typography>
                  {/* <Typography variant="body2">{order._id}</Typography> */}
                  {order.orderDetails[0].chatReason && (
                    <Typography variant="body2">
                      <b>Chat Reason: </b>
                      {order.orderDetails[0].chatReason}
                    </Typography>
                  )}
                  {order.orderDetails[0].selectedMedia && (
                    <Typography variant="body2">
                      <b>Type: </b>
                      {order.orderDetails[0].selectedMedia}
                    </Typography>
                  )}
                  {order.orderDetails[0].socialMediaAccount && (
                    <Typography variant="body2">
                      <b>Social Media Account: </b>{" "}
                      {order.orderDetails[0].socialMediaAccount}
                    </Typography>
                  )}
                  {order.orderDetails[0].title && (
                    <Typography variant="body2">
                      <b>Title: </b> {order.orderDetails[0].title}
                    </Typography>
                  )}
                  {order.orderDetails[0].description && (
                    <Typography variant="body2">
                      <b>Description: </b> {order.orderDetails[0].description}
                    </Typography>
                  )}
                  {order.orderDetails[0].phone && (
                    <Typography variant="body2">
                      <b>Phone: </b>
                      {order.orderDetails[0].phone}
                    </Typography>
                  )}
                  {order.orderDetails[0].negotiablePrice && (
                    <Typography variant="body2">
                      <b>Price: </b>
                      {order.orderDetails[0].negotiablePrice}
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
                    onClick={() => approveOrder(order._id, order)}
                    fullWidth
                    sx={{ marginTop: 2 }}
                  >
                    Approve Order
                  </Button>
                )}
                {order.status === "In Review" &&
                  !sortedOrders.requestedChanges && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenModal(order._id)}
                      fullWidth
                      sx={{ marginTop: 2, backgroundColor: "grey" }}
                    >
                      Requested changes
                    </Button>
                  )}
              </CardContent>
            </OrderCard>
          </Grid>
        ))}
      </Grid>

      {/* Requested Changes Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Requested Changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide the changes you would like to request for this order.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="requestedChanges"
            label="Requested Changes"
            type="text"
            fullWidth
            variant="outlined"
            value={requestedChangesText}
            onChange={(e) => setRequestedChangesText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={updateRequestedChanges}>Send Request</Button>
        </DialogActions>
      </Dialog>
    </StyledBox>
  );
};

export default AdminOrders;
