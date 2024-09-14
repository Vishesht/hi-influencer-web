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

// Dummy order data
const orders = [
  { id: "1", influencer: "Jane Doe", status: "Completed", price: "$500" },
  {
    id: "2",
    influencer: "John Smith",
    status: "Pending for approval",
    price: "$200",
  },
  { id: "3", influencer: "Alice Johnson", status: "In Review", price: "$350" },
  { id: "4", influencer: "Robert Brown", status: "Approved", price: "$450" },
  { id: "5", influencer: "Emily Davis", status: "Completed", price: "$300" },
  { id: "6", influencer: "Chris White", status: "Approved", price: "$600" },
  // Add more dummy orders as needed
];

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const FilterBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const OrderCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[3],
  height: 220,
}));

const Orders: React.FC = () => {
  const [filter, setFilter] = useState<string>("All");

  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilter(event.target.value as string);
  };

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <StyledBox>
      <FilterBox>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select value={filter} onChange={handleFilterChange} label="Status">
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="In Review">In Review</MenuItem>
            <MenuItem value="Pending for approval">
              Pending for approval
            </MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
      </FilterBox>

      <Grid container spacing={3}>
        {filteredOrders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order.id}>
            <OrderCard>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order ID: {order.id}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Influencer: {order.influencer}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Status: {order.status}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Price: {order.price}
                </Typography>
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
