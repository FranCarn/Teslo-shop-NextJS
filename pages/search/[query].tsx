import type { NextPage, GetServerSideProps } from "next";
import { ShopLayout } from "../../components/layouts";
import { Box, Typography } from "@mui/material";
import { ProductList } from "../../components/products";
import { IProduct } from "../../interfaces";
import { dbProducts } from "../../database";

interface Props {
  products: IProduct[];
  query: string;
  foundProducts: boolean;
}

const SearchPage: NextPage<Props> = ({ products, query, foundProducts }) => {
  return (
    <ShopLayout
      title="Teslo-Shop - Search"
      pageDescription="Searching better clothes & better prices in Teslo-Shop"
    >
      <>
        <Typography variant="h1" component="h1">
          Search products
        </Typography>
        {foundProducts ? (
          <Typography variant="h2" sx={{ mb: 1 }} textTransform="capitalize">
            {query}
          </Typography>
        ) : (
          <Box display="flex">
            <Typography variant="h2" sx={{ mb: 1 }}>
              No results were found for your search
            </Typography>
            <Typography variant="h2" sx={{ ml: 1 }} color="secondary">
              Here are other products that might interest you
            </Typography>
          </Box>
        )}

        <ProductList products={products} />
      </>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (!query)
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };

  let products = await dbProducts.getProductsByQuery(query);
  const foundProducts = products.length > 0;
  if (!foundProducts) {
    products = await dbProducts.getAllProducts();
  }
  return {
    props: { products, query, foundProducts },
  };
};

export default SearchPage;
