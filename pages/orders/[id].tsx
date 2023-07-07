import React, { useState } from "react";
import { ShopLayout } from "../../components/layouts";
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
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
import { PayPalButtons } from "@paypal/react-paypal-js";
import { tesloApi } from "../../api";
import { useRouter } from "next/router";

type OrderResponseBody = {
  id: string;
  status:
    | "CREATED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "COMPLETED"
    | "PAYER_ACTION_REQUIRED";
};

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const router = useRouter();
  const { address, city, country, firstName, lastName, phone, zip } =
    order.shippingAddress;
  const [isPaying, setIsPaying] = useState(false);

  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== "COMPLETED") {
      return alert("No hay pago en Paypal");
    }
    setIsPaying(true);
    try {
      await tesloApi.post("/orders/pay", {
        transactionId: details.id,
        orderId: order._id,
      });
      router.reload();
    } catch (error) {
      setIsPaying(false);
      console.log(error);
      alert("Payment Error");
    }
  };

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
                  <Box
                    display="flex"
                    justifyContent="center"
                    className="fadeIn"
                    sx={{ display: isPaying ? "flex" : "none" }}
                  >
                    <CircularProgress />
                  </Box>
                  <Box
                    sx={{ display: isPaying ? "none" : "flex", flex: 1 }}
                    flexDirection="column"
                  >
                    {!order.isPaid ? (
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: order.totalPrice.toString(),
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={(data, actions) => {
                          return actions.order!.capture().then((details) => {
                            onOrderCompleted(details);
                          });
                        }}
                      />
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
