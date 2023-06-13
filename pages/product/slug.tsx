import React from "react";
import { ShopLayout } from "../../components/layouts";
import { initialData } from "../../database/products";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { ProductSlideshow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui";

const product = initialData.products[0];

const ProductPage = () => {
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
              <ItemCounter />
              <SizeSelector
                selectedSize={product.sizes[3]}
                sizes={product.sizes}
              />
            </Box>

            {/* Add to cart */}

            <Button color="secondary" className="circular-btn">
              Add to cart
            </Button>

            {/* // TODO: hacer el ternario para que se muestre uno o otro  */}

            {/* <Chip label="Out of stock" color="error" variant="outlined" />
             */}

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

export default ProductPage;
