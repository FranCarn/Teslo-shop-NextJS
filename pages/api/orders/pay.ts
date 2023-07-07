import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { Paypal } from "../../../interfaces";
import { db } from "../../../database";
import { Order } from "../../../models";

type Data =
  | {
      message: string;
    }
  | Paypal.PaypalOrderStatusResponse;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return payOrder(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}
const getPaypalBearerToken = async (): Promise<string | undefined> => {
  const base64Token = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const body = new URLSearchParams("grant_type=client_credentials");

  try {
    const { data } = await axios.post(
      process.env.PAYPAL_OAUTH_URL || "",
      body,
      {
        headers: {
          Authorization: `Basic ${base64Token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else console.log(error);
  }
};

async function payOrder(req: NextApiRequest, res: NextApiResponse<Data>) {
  const paypalBearerToken = await getPaypalBearerToken();

  if (!paypalBearerToken) {
    return res.status(400).json({ message: "You dont have paypal token" });
  }
  const { transactionId = "", orderId = "" } = req.body;

  const { data } = await axios.get<Paypal.PaypalOrderStatusResponse>(
    `${process.env.PAYPAL_ORDERS_URL || ""}/${transactionId}`,
    {
      headers: {
        Authorization: `Bearer ${paypalBearerToken}`,
      },
    }
  );
  if (data.status !== "COMPLETED") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  await db.connect();
  const dbOrder = await Order.findById(orderId);
  if (!dbOrder) {
    await db.disconnect();
    return res.status(404).json({ message: "Order not exist in database" });
  }
  if (dbOrder.totalPrice !== Number(data.purchase_units[0].amount.value)) {
    return res.status(404).json({ message: "Amount doest not match" });
  }

  dbOrder.transactionId = transactionId;
  dbOrder.isPaid = true;
  dbOrder.save();
  await db.disconnect();

  return res.status(200).json({ message: "Order Paid" });
}
