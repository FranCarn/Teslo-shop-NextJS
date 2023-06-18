import { Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import { CartContext } from "../../context";
import { currency } from "../../utils";

export const OrderSummary = () => {
  const { numberOfItems, subTotal, tax, totalPrice } = useContext(CartContext);
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Products:</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="flex-end">
        <Typography>{currency.format(numberOfItems)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="flex-end">
        <Typography>{currency.format(subTotal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>
          Taxes ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="flex-end">
        <Typography>{currency.format(tax)}</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="flex-end">
        <Typography variant="subtitle1">
          {currency.format(totalPrice)}
        </Typography>
      </Grid>
    </Grid>
  );
};
