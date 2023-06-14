import React from "react";
import NextLink from "next/link";
import { ShopLayout } from "../../components/layouts";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { CartList, OrderSummary } from "../../components/cart";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";

const OrderPage = () => {
  return (
    <ShopLayout
      title="Order Summary 12312312"
      pageDescription="Order summary 12312312312"
    >
      <>
        <Typography variant="h1" component="h1">
          Order: 1231231
        </Typography>
        <Chip
          sx={{ mt: 2 }}
          label="Payment pending"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
        <Chip
          sx={{ mt: 2 }}
          label="Order Paid"
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
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
                  <h1>Pay</h1>
                  <Chip
                    sx={{ mt: 2 }}
                    label="Order Paid"
                    variant="outlined"
                    color="success"
                    icon={<CreditScoreOutlined />}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    </ShopLayout>
  );
};

export default OrderPage;
