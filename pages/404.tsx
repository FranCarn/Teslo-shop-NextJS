import React from "react";
import { ShopLayout } from "../components/layouts";
import { Box, Typography } from "@mui/material";

const NotFoundPage = () => {
  return (
    <ShopLayout
      title="Not Found Element"
      pageDescription="There's nothing to show"
    >
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
      >
        <Typography variant="h1" component="h1" fontSize={80} fontWeight={200}>
          404
        </Typography>
        <Typography
          marginX={2}
          display={{ xs: "none", md: "block" }}
          fontSize={80}
          fontWeight={200}
        >
          |
        </Typography>
        <Typography>No page found here</Typography>
      </Box>
    </ShopLayout>
  );
};

export default NotFoundPage;
