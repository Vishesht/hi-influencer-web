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
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const _id = searchParams._id;
  const customerId = "Vishesht";

  // Validate the inputs before initiating payment
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!mobile || mobile.length !== 10) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setSnackbarMessage("Payment successful!");
    setSnackbarOpen(true);
    setAmount("");
    try {
      const newStatus = "Payment Completed";
      await axios
        .put(`${BaseUrl}/api/changeStatus`, { _id, newStatus })
        .then((res) => {
          if (res.status === 200) {
            dispatch(paymentStatus(true));
            router.push("/orders");
          }
        })
        .catch((err) => console.log("Err", err));
    } catch (error) {
      console.error("Error approving order:", error);
    }
  };

  // const initiatePayment = async () => {
  //   try {
  //     const response = await axios.post(`${BaseUrl}/pay/payments`, {
  //       amount,
  //       customerId,
  //       email,
  //       mobile,
  //     });

  //     const { paytmParams } = response.data;
  //     console.log("first", paytmParams);

  //     const form = document.createElement("form");
  //     form.method = "POST";
  //     form.action = "https://securegw-stage.paytm.in/order/process"; // Use the appropriate URL

  //     Object.keys(paytmParams).forEach((key) => {
  //       const hiddenField = document.createElement("input");
  //       hiddenField.type = "hidden";
  //       hiddenField.name = key;
  //       hiddenField.value = paytmParams[key];

  //       form.appendChild(hiddenField);
  //     });
  //     console.log("first", form);
  //     document.body.appendChild(form);
  //     form.submit(form);
  //   } catch (error) {
  //     console.error("Payment initiation failed", error);
  //   }
  // };

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
            label="Name"
            variant="outlined"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            margin="normal"
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            label="Mobile"
            variant="outlined"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            margin="normal"
            type="number"
            error={!!errors.mobile}
            helperText={errors.mobile}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            type="email"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Amount"
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            margin="normal"
            type="number"
            error={!!errors.amount}
            helperText={errors.amount}
          />

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
