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
      return createProduct(req, res);

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

  if (images.length < 2) {
    return res.status(400).json({ message: "It is necessary two images" });
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

    return res.status(400).json({ message: "Check server logs" });
  }
};
const createProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { images = [] } = req.body as IProduct;

  if (images.length < 2) {
    return res.status(400).json({ message: "It is necessary two images" });
  }

  // TODO: eval case localhost:3000/products/img.jpg to avoid

  try {
    await db.connect();

    const productInDb = await Product.findOne({ slug: req.body.slug });

    if (productInDb) {
      return res
        .status(400)
        .json({ message: "Product with this slug already exist" });
    }

    const product = new Product(req.body);

    await product.save();

    await db.disconnect();

    return res.status(201).json(product);
  } catch (error) {
    await db.disconnect();

    console.log(error);

    return res.status(400).json({ message: "Check server logs" });
  }
};
