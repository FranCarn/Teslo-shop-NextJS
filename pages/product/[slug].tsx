import React, { useState, useContext } from "react";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { ShopLayout } from "../../components/layouts";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { ProductSlideshow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { ICartProduct, IProduct, ISize } from "../../interfaces";
import { dbProducts } from "../../database";
import { CartContext } from "../../context";
import { useRouter } from "next/router";

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const { addProductToCart } = useContext(CartContext);
  const router = useRouter();

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    images: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const onSelectedSize = (size: ISize) => {
    setTempCartProduct((prevState) => ({ ...prevState, size }));
  };

  const onSelectedQuantity = (quantity: number) => {
    if (!quantity) return;
    if (quantity > product.inStock) return;
    setTempCartProduct((prevState) => ({ ...prevState, quantity }));
  };

  const onAddProduct = () => {
    if (!tempCartProduct.size) return;
    addProductToCart(tempCartProduct);
    router.push("/cart");
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            {/* Title */}

            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>

            {/* Price */}

            <Typography variant="subtitle1">${product.price}</Typography>

            {/* Amount */}

            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Amount</Typography>
              <ItemCounter
                onSelectedQuantity={onSelectedQuantity}
                quantity={tempCartProduct.quantity}
              />
              <SizeSelector
                selectedSize={tempCartProduct.size}
                onSelectedSize={onSelectedSize}
                sizes={product.sizes}
              />
            </Box>

            {/* Add to cart */}

            {product.inStock ? (
              <Button
                color="secondary"
                className="circular-btn"
                onClick={onAddProduct}
              >
                {tempCartProduct.size ? "Add to cart" : "Choose a size"}
              </Button>
            ) : (
              <Chip label="Out of stock" color="error" variant="outlined" />
            )}

            {/* Description */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Description</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductSlugs();
  return {
    paths: productSlugs.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 604800,
  };
};

export default ProductPage;
