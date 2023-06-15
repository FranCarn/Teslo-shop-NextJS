import { Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";
import { useProducts } from "../../hooks/useProducts";

const KidsPage = () => {
  const { products, isLoading } = useProducts("/products?gender=kid");

  return (
    <ShopLayout
      title="Kid's Clothes - Teslo Shop"
      pageDescription="Find the best children's clothing at the best price"
    >
      <>
        <Typography variant="h1" component="h1">
          Shop
        </Typography>
        <Typography variant="h2" sx={{ mb: 1 }}>
          Kid&apos;s Products
        </Typography>
        {isLoading ? (
          <FullScreenLoading />
        ) : (
          <ProductList products={products} />
        )}
      </>
    </ShopLayout>
  );
};

export default KidsPage;
