import type { NextApiRequest, NextApiResponse } from "next";
import { IProduct } from "../../../interfaces/products";
import { db } from ".";
import { connect } from "../../../database/db";
import Product from "../../../models/product";

type Data =
  | {
      message: string;
    }
  | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);
    case "PUT":
      return;

    case "POST":
      return;

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await Product.find().sort({ title: "asc" }).lean();

  await db.disconnect();

  // TODO: update images;

  return res.status(200).json(products);
};
