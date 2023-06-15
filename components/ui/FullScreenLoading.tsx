import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export const FullScreenLoading = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
    >
      <Typography margin={2} variant="h2" color="GrayText" fontWeight={200}>
        Loading...
      </Typography>
      <CircularProgress thickness={2} />
    </Box>
  );
};
