import React, { FC } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
interface Props {
  quantity: number;
  onSelectedQuantity: (quantity: number) => void;
}
export const ItemCounter: FC<Props> = ({ onSelectedQuantity, quantity }) => {
  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={() => onSelectedQuantity(quantity - 1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: "center" }}>
        {quantity}
      </Typography>
      <IconButton onClick={() => onSelectedQuantity(quantity + 1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
