"use client";
import React, { useState } from "react";
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

// Dummy transaction data
const transactions = [
  {
    id: "1",
    type: "Deducted",
    amount: "$200",
    status: "Completed",
    date: "2024-09-01",
    time: "14:30",
  },
  {
    id: "2",
    type: "Earning",
    amount: "$500",
    status: "Completed",
    date: "2024-09-02",
    time: "09:15",
  },
  {
    id: "3",
    type: "Failed",
    amount: "$150",
    status: "Failed",
    date: "2024-09-03",
    time: "16:00",
  },
  {
    id: "4",
    type: "Refund",
    amount: "$50",
    status: "Refunded",
    date: "2024-09-04",
    time: "11:45",
  },
  {
    id: "5",
    type: "Earning",
    amount: "$300",
    status: "Completed",
    date: "2024-09-05",
    time: "13:20",
  },
  // Add more dummy transactions as needed
];

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const FilterBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const TransactionCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[3],
}));

const PaymentHistory: React.FC = () => {
  const [filter, setFilter] = useState<string>("All");

  const handleFilterChange = (event: any) => {
    setFilter(event.target.value as string);
  };

  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((txn) => txn.status === filter);

  return (
    <StyledBox>
      <FilterBox>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select value={filter} onChange={handleFilterChange} label="Status">
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Failed">Failed</MenuItem>
            <MenuItem value="Refunded">Refunded</MenuItem>
          </Select>
        </FormControl>
      </FilterBox>

      <Grid container spacing={3}>
        {filteredTransactions.map((txn) => (
          <Grid item xs={12} sm={6} md={4} key={txn.id}>
            <TransactionCard>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Transaction ID: {txn.id}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Type: {txn.type}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Amount: {txn.amount}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Status: {txn.status}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Date: {txn.date}
                </Typography>
                <Typography variant="body1">Time: {txn.time}</Typography>
              </CardContent>
            </TransactionCard>
          </Grid>
        ))}
      </Grid>
    </StyledBox>
  );
};

export default PaymentHistory;
