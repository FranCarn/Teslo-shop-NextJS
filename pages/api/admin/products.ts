import type { NextApiRequest, NextApiResponse } from "next";
import { IProduct } from "../../../interfaces/products";
import Product from "../../../models/product";
import { db } from "../../../database/";
import { isValidObjectId } from "mongoose";

type Data =
  | {
      message: string;
    }
  | IProduct[]
  | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);
    case "PUT":
      return updateProduct(req, res);

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
const updateProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id = "", images = [] } = req.body as IProduct;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  if (images.length <= 2) {
    return res.status(400).json({ message: "Is necessary two images" });
  }

  // TODO: eval case localhost:3000/products/img.jpg to avoid
  try {
    await db.connect();

    const product = await Product.findById(_id);

    if (!product) {
      await db.disconnect();
      return res.status(400).json({ message: "Product doesnt exist" });
    }

    // TODO: delete images in Cloudinary

    await product.update(req.body);

    await db.disconnect();
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Error message in server console" });
  }
};
