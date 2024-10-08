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
  Badge,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { BaseUrl } from "@/common/utils";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import PackageDetailsModal from "@/components/PackageDetailsModal";
import InfluencerProfileComponent from "@/components/InfluencerProfileComponent";
import ReviewPopup from "@/components/Review";
import { sendNotification } from "@/api/commonApi";
import Loading from "@/components/LoadingSpinner";

interface OrderCardProps {
  bgColor?: string;
}

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const FilterBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const OrderCard = styled(Card)<OrderCardProps>(({ theme, bgColor }) => ({
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
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (paymentStatus && tabIndex === 0) {
      getOrders();
    }
  }, [paymentStatus]);

  useEffect(() => {
    if (tabIndex === 0) {
      getOrders();
      getRequests();
    } else {
      getRequests();
    }
  }, [data?.id, tabIndex]);

  const getOrders = async () => {
    setLoader(true);
    try {
      const response = await axios.get(`${BaseUrl}/api/getorders/${data?.id}`);
      setOrders(response.data);
      dispatch(paymentStatus(false));
      setLoader(false);
    } catch (err) {
      setLoader(false);
      // console.log("Error fetching orders", err);
    }
  };

  const getRequests = async () => {
    setLoader(true);
    try {
      const response = await axios.get(
        `${BaseUrl}/api/getOrderByInfluencerId/${data?.id}`
      );
      setLoader(false);
      const filteredRequest = response?.data?.filter(
        (order) => order.status !== "In Review"
      );
      setRequests(filteredRequest);
    } catch (err) {
      setLoader(false);
      // console.log("Error fetching orders", err);
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
      // case "Payment Completed":
      case "In Progress":
        return "#4caf5080"; // Green
      case "Testing":
        return "#cddc39"; // Lime for new orders
      case "Task Completed":
        return "#9e9e9e80"; // Grey
      case "Rejected":
        return "#ff000080"; // Red
      case "Requested":
        return "#ff9800"; // Orange for requested orders

      default:
        return "#ffffff80"; // Default white for any other status
    }
  };

  const handleAcceptOrder = async (_id: string, item, newStatus) => {
    try {
      await axios
        .put(`${BaseUrl}/api/changeStatus`, { _id, newStatus })
        .then((res) => {
          if (res.status === 200) {
            const title =
              newStatus == "In Progress"
                ? "Order Confirmed"
                : newStatus == "Testing"
                ? "Task Completed"
                : newStatus == "Task Completed"
                ? "Review Finalized"
                : "";
            const desc =
              newStatus == "In Progress"
                ? `Your order is confirmed for the package ${item.orderDetails[0].pkgName}.`
                : newStatus == "Testing"
                ? "Your task has been successfully completed by the influencer. You may now proceed to review their work."
                : newStatus == "Task Completed"
                ? "The client has successfully completed their review of your task, and it has been approved."
                : "";
            title &&
              desc &&
              sendNotification(item.influencerDetails.email, title, desc);
          }
        })
        .catch((err) => console.log("Err", err));
      getRequests();
      getOrders();
    } catch (error) {
      console.log("Error approving order:", error);
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
      console.log("Error approving order:", error);
    }
  };

  const onClosePopup = () => {
    getOrders();
    setOpenModal(false);
  };

  const onReviewPopup = async (creds) => {
    try {
      await axios.post(`${BaseUrl}/api/addReview`, creds);
      const title = `You received a ${creds.rating}-star rating!`;
      const desc = `Congratulations! Your recent work has been rated ${creds.rating} stars by the client. Keep up the great work!`;
      const title1 = "You received a low rating.";
      const desc1 = `Your recent work has been rated below ${creds.rating} stars by the client. We encourage you to review their feedback and strive for improvement.`;
      sendNotification(
        creds.influencerEmail,
        creds.rating < 3 ? title1 : title,
        creds.rating < 3 ? desc1 : desc
      );
      getOrders();
    } catch (error) {
      console.log("Error adding review:", error);
    }
  };

  const saveChat = async (userId1, userId2) => {
    setLoader(true);
    try {
      const response = await axios.post(`${BaseUrl}/service/create-chat`, {
        userId1,
        userId2,
      });
      console.log("saveChat", response.data);
      setLoader(false);
      router.push("/chat");
    } catch (error) {
      setLoader(false);
      console.log("Error saving chat:", error);
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
        <Tab
          label={
            <Badge badgeContent={filteredOrders?.length} color="secondary">
              Orders -
            </Badge>
          }
        />
        <Tab
          label={
            <Badge badgeContent={filteredRequests?.length} color="secondary">
              Requests -
            </Badge>
          }
        />
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
            {/* <MenuItem value="Waiting for payment">Waiting for payment</MenuItem> */}
            {/* <MenuItem value="Payment Completed">Payment Completed</MenuItem> */}
            <MenuItem value="In Progress">In Progress</MenuItem>
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
                      {/* <Typography variant="body2" fontWeight="bold">
                        Order Details:
                      </Typography>
                      <Typography variant="body2">
                        Order ID: {item._id}
                      </Typography> */}
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
                      {item.orderDetails[0].chatReason && (
                        <Typography variant="body2">
                          <b>Reason for chatting:</b>{" "}
                          {item.orderDetails[0].chatReason}
                        </Typography>
                      )}
                      {item.orderDetails[0].socialMediaAccount && (
                        <Typography variant="body2">
                          <b>Social Media Account:</b>{" "}
                          {item.orderDetails[0].socialMediaAccount}
                        </Typography>
                      )}
                      {item.orderDetails[0].title && (
                        <Typography variant="body2">
                          <b>Title:</b> {item.orderDetails[0].title}
                        </Typography>
                      )}
                      {item.orderDetails[0].description && (
                        <Typography variant="body2">
                          <b>Description:</b> {item.orderDetails[0].description}
                        </Typography>
                      )}
                      {item.orderDetails[0].selectedMedia && (
                        <Typography variant="body2">
                          <b>Type:</b> {item.orderDetails[0].selectedMedia}
                        </Typography>
                      )}
                      {item.orderDetails[0].name && (
                        <Typography variant="body2">
                          <b>Name:</b> {item.orderDetails[0].name}
                        </Typography>
                      )}
                      {item.orderDetails[0].email && (
                        <Typography variant="body2">
                          <b>Email:</b> {item.orderDetails[0].email}
                        </Typography>
                      )}
                      {item.orderDetails[0].gender && (
                        <Typography variant="body2">
                          <b>Gender:</b> {item.orderDetails[0].gender}
                        </Typography>
                      )}
                      {item.orderDetails[0].instagram && (
                        <Typography variant="body2">
                          <b>Instagram Link:</b>{" "}
                          {item.orderDetails[0].instagram}
                        </Typography>
                      )}
                      {item.orderDetails[0].age && (
                        <Typography variant="body2">
                          <b>Age:</b> {item.orderDetails[0].age}
                        </Typography>
                      )}
                      {item.orderDetails[0].profession && (
                        <Typography variant="body2">
                          <b>Profession:</b> {item.orderDetails[0].profession}
                        </Typography>
                      )}
                      {item.orderDetails[0].phone && (
                        <Typography variant="body2">
                          <b>Phone:</b> {item.orderDetails[0].phone}
                        </Typography>
                      )}
                      {item.orderDetails[0].timing && (
                        <Typography variant="body2">
                          <b>Timing:</b> {item.orderDetails[0].timing}
                        </Typography>
                      )}
                      {item.orderDetails[0].location && (
                        <Typography variant="body2">
                          <b>Location:</b> {item.orderDetails[0].location}
                        </Typography>
                      )}
                      {item.orderDetails[0].negotiablePrice && (
                        <Typography variant="body2">
                          <b>Price:</b> {item.orderDetails[0].negotiablePrice}
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
                    {item.status === "In Progress" && (
                      <Box mt={2} sx={{ display: "flex" }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => CreateChat(item)}
                          sx={{ marginRight: 1 }}
                        >
                          Chat
                        </Button>
                        {tabIndex === 1 && item.status === "In Progress" && (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() =>
                              handleAcceptOrder(item._id, item, "Testing")
                            }
                            sx={{ marginRight: 1 }}
                          >
                            Mark Completed
                          </Button>
                        )}
                      </Box>
                    )}
                    {tabIndex === 0 && item.status === "Testing" && (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() =>
                            handleAcceptOrder(item._id, item, "Task Completed")
                          }
                          sx={{ marginRight: 1, mt: 1 }}
                        >
                          Complete task
                        </Button>
                        <Typography variant="body2">
                          Please click on <b>Complete Task</b> if you believe
                          the influencer has successfully completed their work
                        </Typography>
                      </>
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
                              handleAcceptOrder(
                                item._id,
                                item,
                                "In Progress"
                                // "Waiting for payment"
                              )
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
                  influencer={item}
                  open={openModal}
                  onClose={onClosePopup}
                  pkg={{ name: item.orderDetails[0].pkgName, id: item._id }}
                />
                <ReviewPopup
                  open={open}
                  onClose={() => {
                    setOpen(false), getOrders();
                  }}
                  onSubmit={({ rating, review }) => {
                    const items = {
                      userId: data?.id,
                      influencerEmail: item?.influencerDetails?.email,
                      influencerId: reviewItem?.influencerId,
                      rating,
                      review,
                      orderId: reviewItem._id,
                    };
                    onReviewPopup(items);
                  }}
                />
              </Grid>
            );
          }
        )}
      </Grid>
      <Loading loading={loader} />
    </StyledBox>
  );
};

export default Orders;
