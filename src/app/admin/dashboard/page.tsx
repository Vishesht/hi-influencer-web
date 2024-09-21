"use client";
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const DashboardCard = styled(Card)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
}));

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  // Dummy data for demonstration
  const dataCounts = {
    users: 120,
    orders: 75,
    ads: 30,
    payments: 50,
  };

  const handleViewOrders = () => {
    router?.push("/admin/orders");
  };
  return (
    <StyledContainer maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard>
            <CardContent>
              <Typography variant="h5">{dataCounts.users}</Typography>
              <Typography color="textSecondary">Users</Typography>
            </CardContent>
            <Button variant="contained" color="primary">
              View Users
            </Button>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard>
            <CardContent>
              <Typography variant="h5">{dataCounts.orders}</Typography>
              <Typography color="textSecondary">Orders</Typography>
            </CardContent>
            <Button
              onClick={handleViewOrders}
              variant="contained"
              color="primary"
            >
              View Orders
            </Button>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard>
            <CardContent>
              <Typography variant="h5">{dataCounts.ads}</Typography>
              <Typography color="textSecondary">Ads</Typography>
            </CardContent>
            <Button variant="contained" color="primary">
              View Ads
            </Button>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard>
            <CardContent>
              <Typography variant="h5">{dataCounts.payments}</Typography>
              <Typography color="textSecondary">Payments</Typography>
            </CardContent>
            <Button variant="contained" color="primary">
              View Payments
            </Button>
          </DashboardCard>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default AdminDashboard;
