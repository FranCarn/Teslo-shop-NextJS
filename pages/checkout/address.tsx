import React from "react";
import { ShopLayout } from "../../components/layouts";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const AddressPage = () => {
  return (
    <ShopLayout
      title="Addres to checkout"
      pageDescription="Confirm addres to send products"
    >
      <>
        <Typography variant="h1" component="h1">
          Address
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Surname" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Address" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address #2 (Optional)"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Zip code" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="City" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Select variant="filled" label="country" value={0}>
                <MenuItem value={0} disabled>
                  Select country
                </MenuItem>
                <MenuItem value={1}>Argentina</MenuItem>
                <MenuItem value={2}>Chile</MenuItem>
                <MenuItem value={3}>Brasil</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Telephone" variant="filled" fullWidth />
          </Grid>
        </Grid>
        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button color="secondary" className="circular-btn" size="large">
            Review order
          </Button>
        </Box>
      </>
    </ShopLayout>
  );
};

export default AddressPage;
