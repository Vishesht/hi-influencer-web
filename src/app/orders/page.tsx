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
  Tabs,
  Tab,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { BaseUrl } from "@/common/utils";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import PackageDetailsModal from "@/components/PackageDetailsModal";
import InfluencerProfileComponent from "@/components/InfluencerProfileComponent";
import ReviewPopup from "@/components/Review";

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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<string>("All");
  const [tabIndex, setTabIndex] = useState<number>(0); // To manage tabs
  const data = useAppSelector((state) => state.login.userData);
  const [orderData, setOrders] = useState<any>([]);
  const [requestData, setRequests] = useState<any>([]); // State for requests
  const paymentStatus = useAppSelector((state) => state.payment.paymentStatus);
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [reviewItem, setReviewItem] = useState();

  useEffect(() => {
    if (paymentStatus && tabIndex === 0) {
      getOrders();
    }
  }, [paymentStatus]);

  useEffect(() => {
    if (tabIndex === 0) {
      getOrders();
    } else {
      getRequests(); // Fetch requests when the Requests tab is active
    }
  }, [data?.id, tabIndex]);

  const getOrders = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/api/getorders/${data?.id}`);
      setOrders(response.data);
      dispatch(paymentStatus(false));
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  const getRequests = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}/api/getOrderByInfluencerId/${data?.id}`
      );
      setRequests(response.data);
    } catch (err) {
      console.error("Error fetching orders", err);
      if (err.status === 404) {
        setRequests([]);
      }
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilter(event.target.value as string);
  };

  const filteredOrders = orderData.filter(
    (order) => filter === "All" || order.status === filter
  );

  const filteredRequests = requestData.filter(
    (request) => filter === "All" || request.status === filter
  );

  const getStatusBackgroundColor = (status: string) => {
    switch (status) {
      case "In Review":
        return "#ffeb3b80"; // Yellow
      case "Pending for approval":
        return "#2196f380"; // Blue
      case "Payment Completed":
        return "#4caf5080"; // Green
      case "Task Completed":
        return "#9e9e9e80"; // Grey
      case "Rejected":
        return "#ff000080"; // Red
      case "Requested":
        return "#ff9800"; // Orange for requested orders
      case "Testing":
        return "#cddc39"; // Lime for new orders
      default:
        return "#ffffff80"; // Default white for any other status
    }
  };

  const handleAcceptOrder = async (_id: string, newStatus) => {
    try {
      await axios
        .put(`${BaseUrl}/api/changeStatus`, { _id, newStatus })
        .then((res) => console.log("res", res))
        .catch((err) => console.log("Err", err));
      getRequests();
      getOrders();
    } catch (error) {
      console.error("Error approving order:", error);
    }
  };

  const handleRejectOrder = async (_id: string) => {
    try {
      const newStatus = "Rejected";
      await axios
        .put(`${BaseUrl}/api/changeStatus`, { _id, newStatus })
        .then((res) => console.log("res", res))
        .catch((err) => console.log("Err", err));
      getRequests();
    } catch (error) {
      console.error("Error approving order:", error);
    }
  };

  const onClosePopup = () => {
    setOpenModal(false);
  };

  const onReviewPopup = async (creds) => {
    try {
      await axios.post(`${BaseUrl}/api/addReview`, creds);
      getOrders();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const saveChat = async (userId1, userId2) => {
    try {
      const response = await axios.post(`${BaseUrl}/service/create-chat`, {
        userId1,
        userId2,
      });
      console.log("saveChat", response.data);
      router.push("/chat");
    } catch (error) {
      console.error("Error saving chat:", error);
    }
  };

  const CreateChat = (item) => {
    saveChat(item.loggedUserId, item.influencerId);
  };

  return (
    <StyledBox>
      <Tabs
        value={tabIndex}
        onChange={(event, newValue) => setTabIndex(newValue)}
      >
        <Tab label="Orders" />
        <Tab label="Requests" />
      </Tabs>

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
            <MenuItem value="Testing">Testing</MenuItem>
            <MenuItem value="Task Completed">Task Completed</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      </FilterBox>

      <Grid container spacing={3}>
        {(tabIndex === 0 ? filteredOrders : filteredRequests).map(
          (item: any) => {
            const reviewDone = item?.influencerDetails?.reviewsData?.includes(
              item._id
            );
            return (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <OrderCard bgColor={getStatusBackgroundColor(item.status)}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Package Name: {item.orderDetails[0].pkgName}
                    </Typography>
                    {item?.requestedChanges && (
                      <Typography
                        variant="body2"
                        gutterBottom
                        sx={{ color: "red" }}
                      >
                        Note: {item.requestedChanges}
                      </Typography>
                    )}
                    <InfluencerProfileComponent
                      influencer={tabIndex === 0 ? true : false}
                      influencerDetails={item?.influencerDetails}
                    />
                    <Typography variant="body1" gutterBottom>
                      Status: <strong>{item.status}</strong>
                    </Typography>
                    {item.status === "Payment Completed" && (
                      <Typography variant="body1" gutterBottom>
                        {tabIndex === 0
                          ? "Note: Please allow some time for the influencer to complete your task. In the meantime, feel free to check the chat section for updates or to inquire about your task."
                          : "Alert: Please begin working on the task assigned to you."}
                      </Typography>
                    )}
                    <Typography variant="body2" gutterBottom>
                      Created At: {new Date(item.createdAt).toLocaleString()}
                    </Typography>

                    <Box mt={2}>
                      <Typography variant="body2" fontWeight="bold">
                        Order Details:
                      </Typography>
                      <Typography variant="body2">
                        Order ID: {item._id}
                      </Typography>
                      {tabIndex === 0 &&
                        item.status === "Task Completed" &&
                        !reviewDone && (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => {
                              setOpen(true);
                              setReviewItem(item);
                            }}
                            sx={{ marginRight: 1, mt: 1 }}
                          >
                            Add your review
                          </Button>
                        )}
                      {item.orderDetails[0].socialMediaAccount && (
                        <Typography variant="body2">
                          Social Media Account:{" "}
                          {item.orderDetails[0].socialMediaAccount}
                        </Typography>
                      )}
                      {item.orderDetails[0].title && (
                        <Typography variant="body2">
                          Title: {item.orderDetails[0].title}
                        </Typography>
                      )}
                      {item.orderDetails[0].description && (
                        <Typography variant="body2">
                          Description: {item.orderDetails[0].description}
                        </Typography>
                      )}
                      {item.orderDetails[0].phone && (
                        <Typography variant="body2">
                          Phone: {item.orderDetails[0].phone}
                        </Typography>
                      )}
                      {item.orderDetails[0].timing && (
                        <Typography variant="body2">
                          Timing: {item.orderDetails[0].timing}
                        </Typography>
                      )}
                      {item.orderDetails[0].location && (
                        <Typography variant="body2">
                          Location: {item.orderDetails[0].location}
                        </Typography>
                      )}
                      {item.orderDetails[0].negotiablePrice && (
                        <Typography variant="body2">
                          Price: {item.orderDetails[0].negotiablePrice}
                        </Typography>
                      )}
                      {item.orderDetails[0].images?.length > 0 && (
                        <Box mt={1}>
                          <Typography variant="body2" fontWeight="bold">
                            Images:
                          </Typography>
                          {item.orderDetails[0].images.map(
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
                    {item.status === "Payment Completed" && (
                      <Box mt={2} sx={{ display: "flex" }}>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => CreateChat(item)}
                          sx={{ marginRight: 1 }}
                        >
                          Chat
                        </Button>
                        {tabIndex === 1 &&
                          item.status === "Payment Completed" && (
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() =>
                                handleAcceptOrder(item._id, "Testing")
                              }
                              sx={{ marginRight: 1 }}
                            >
                              Review my work
                            </Button>
                          )}
                      </Box>
                    )}
                    {tabIndex === 0 && item.status === "Testing" && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() =>
                          handleAcceptOrder(item._id, "Task Completed")
                        }
                        sx={{ marginRight: 1, mt: 1 }}
                      >
                        Complete task
                      </Button>
                    )}

                    {item.requestedChanges && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => setOpenModal(true)}
                        sx={{ marginRight: 1, mt: 2 }}
                      >
                        Edit
                      </Button>
                    )}

                    {tabIndex === 1 &&
                      item.status === "Pending for approval" && (
                        <Box mt={2}>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() =>
                              handleAcceptOrder(item._id, "Waiting for payment")
                            }
                            sx={{ marginRight: 1 }}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleRejectOrder(item._id)}
                          >
                            Reject
                          </Button>
                        </Box>
                      )}

                    {tabIndex === 0 &&
                      item.status === "Waiting for payment" && (
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          sx={{ marginTop: 2 }}
                          onClick={() =>
                            router?.push(`payment?_id=${item._id}`)
                          }
                        >
                          Pay
                        </Button>
                      )}
                  </CardContent>
                </OrderCard>
                <PackageDetailsModal
                  rework={true}
                  influencerId={item?.influencerId}
                  open={openModal}
                  onClose={onClosePopup}
                  pkg={{ name: item.orderDetails[0].pkgName, id: item._id }}
                />
              </Grid>
            );
          }
        )}
      </Grid>
      <ReviewPopup
        open={open}
        onClose={() => {
          setOpen(false), getOrders();
        }}
        onSubmit={({ rating, review }) => {
          const item = {
            userId: data?.id,
            influencerId: reviewItem?.influencerId,
            rating,
            review,
            orderId: reviewItem._id,
          };
          onReviewPopup(item);
        }}
      />
    </StyledBox>
  );
};

export default Orders;
