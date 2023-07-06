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
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces";
interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const { address, city, country, firstName, lastName, phone, zip } =
    order.shippingAddress;
  return (
    <ShopLayout title="Order Summary" pageDescription="Order summary">
      <>
        <Typography variant="h1" component="h1">
          Order: {order._id}
        </Typography>
        {order.isPaid ? (
          <Chip
            sx={{ mt: 2 }}
            label="Order Paid"
            variant="outlined"
            color="success"
            icon={<CreditScoreOutlined />}
          />
        ) : (
          <Chip
            sx={{ mt: 2 }}
            label="Payment pending"
            variant="outlined"
            color="error"
            icon={<CreditCardOffOutlined />}
          />
        )}

        <Grid container sx={{ mt: 2 }} className="fadeIn">
          <Grid item xs={12} sm={7}>
            <CartList products={order.orderItems} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h2">
                  Summary ({order.numberOfItems})
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1">Delivery address</Typography>
                </Box>

                <Typography>
                  {firstName} {lastName}
                </Typography>
                <Typography>{address}</Typography>
                <Typography>{city}</Typography>
                <Typography>{zip}</Typography>
                <Typography>{country}</Typography>
                <Typography>{phone}</Typography>
                <Divider sx={{ my: 1 }} />
                <OrderSummary
                  orderValues={{
                    numberOfItems: order.numberOfItems,
                    subTotal: order.subTotal,
                    totalPrice: order.totalPrice,
                    tax: order.tax,
                  }}
                />
                <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                  {!order.isPaid ? (
                    <h1>Pay</h1>
                  ) : (
                    <Chip
                      sx={{ mt: 2 }}
                      label="Order Paid"
                      variant="outlined"
                      color="success"
                      icon={<CreditScoreOutlined />}
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = "" } = query;

  const session: any = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?=p/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    };
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
