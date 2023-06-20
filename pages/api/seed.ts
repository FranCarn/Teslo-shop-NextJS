import type { NextApiRequest, NextApiResponse } from "next";
import { db, seedDatabase } from "../../database";
import { Product, User } from "../../models";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res
      .status(401)
      .json({ message: "User has no acces to this service" });
  }

  switch (req.method) {
    case "GET":
      await db.connect();
      await User.deleteMany();
      await User.insertMany(seedDatabase.initialData.users);
      await Product.deleteMany();
      await Product.insertMany(seedDatabase.initialData.products);

      await db.disconnect();
      return res.status(200).json({ message: "Process succesfully" });

    default:
      return res.status(400).json({ message: "Method is not allowed" });
  }
}
