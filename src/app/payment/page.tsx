"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BaseUrl } from "@/common/utils";
import { useAppDispatch } from "@/lib/hooks";
import { paymentStatus } from "@/lib/features/Payments/paymentSlice";

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 600,
  margin: "auto",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const PaymentCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(3),
  boxShadow: theme.shadows[5],
}));

const PaymentPage: React.FC = ({ searchParams }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const _id = searchParams._id;

  const handleSubmit = async () => {
    // Implement payment processing logic here
    console.log({ amount, cardNumber, expiryDate, cvv });

    // Show success message
    setSnackbarMessage("Payment successful!");
    setSnackbarOpen(true);

    // Reset fields after submission
    setAmount("");
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    try {
      const newStatus = "Payment Completed";
      await axios
        .put(`${BaseUrl}/api/changeStatus`, { _id, newStatus })
        .then((res) => {
          dispatch(paymentStatus(false));
          router.back();
        })
        .catch((err) => console.log("Err", err));
    } catch (error) {
      console.error("Error approving order:", error);
    }
    // router?.push("router");
    //redirect back and change the status
  };

  return (
    <StyledBox>
      <Typography variant="h4" gutterBottom>
        Payment Page
      </Typography>

      <PaymentCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Enter Payment Details
          </Typography>

          <TextField
            fullWidth
            label="Amount"
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            margin="normal"
            type="number"
          />
          <TextField
            fullWidth
            label="Card Number"
            variant="outlined"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            margin="normal"
            type="text"
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expiry Date (MM/YY)"
                variant="outlined"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                margin="normal"
                type="text"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="CVV"
                variant="outlined"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                margin="normal"
                type="password"
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Pay Now
          </Button>
        </CardContent>
      </PaymentCard>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </StyledBox>
  );
};

export default PaymentPage;
