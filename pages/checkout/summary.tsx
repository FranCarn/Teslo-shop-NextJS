import React from "react";
import { ShopLayout } from "../../components/layouts";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { CartList, OrderSummary } from "../../components/cart";
import NextLink from "next/link";

const SummaryPage = () => {
  return (
    <ShopLayout title="Order Summary" pageDescription="Order summary">
      <>
        <Typography variant="h1" component="h1">
          Order Summary
        </Typography>
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={12} sm={7}>
            <CartList />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h2">Summary (3 products)</Typography>
                <Divider sx={{ my: 1 }} />
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1">Delivery address</Typography>
                  <NextLink href="/checkout/address" passHref legacyBehavior>
                    <Link underline="always">Edit</Link>
                  </NextLink>
                </Box>

                <Typography>Ricardo Ruben</Typography>
                <Typography>123 Avda siempreviva</Typography>
                <Typography>Springfield</Typography>
                <Typography>8900</Typography>
                <Typography>Birmania</Typography>
                <Typography>154123123</Typography>
                <Divider sx={{ my: 1 }} />
                <Box display="flex" justifyContent="flex-end">
                  <NextLink href="/cart" passHref legacyBehavior>
                    <Link underline="always">Edit</Link>
                  </NextLink>
                </Box>
                <OrderSummary />
                <Box sx={{ mt: 3 }}>
                  <Button color="secondary" className="circular-btn" fullWidth>
                    Confirm Order
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    </ShopLayout>
  );
};

export default SummaryPage;
