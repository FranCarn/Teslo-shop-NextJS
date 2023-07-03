import React, { useContext, useEffect, useState } from "react";
import { ShopLayout } from "../../components/layouts";
import { countries } from "../../utils";
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
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { CartContext } from "../../context";

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
};

const getAddressFromCookies = (): FormData => {
  return {
    firstName: Cookies.get("firstName") || "",
    lastName: Cookies.get("lastName") || "",
    address: Cookies.get("address") || "",
    address2: Cookies.get("address2") || "",
    zip: Cookies.get("zip") || "",
    city: Cookies.get("city") || "",
    country: Cookies.get("country") || "",
    phone: Cookies.get("phone") || "",
  };
};

const AddressPage = () => {
  const { updateAddress } = useContext(CartContext);
  const [defaultCountry, setDefaultCountry] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: getAddressFromCookies(),
  });

  const onAddressSubmit = (data: FormData) => {
    updateAddress(data);

    router.push("/checkout/summary");
  };

  useEffect(() => {
    const addressFromCookies = getAddressFromCookies();
    reset(addressFromCookies);
    setDefaultCountry(addressFromCookies.country);
  }, [reset]);
  return (
    <ShopLayout
      title="Addres to checkout"
      pageDescription="Confirm addres to send products"
    >
      <form onSubmit={handleSubmit(onAddressSubmit)}>
        <Typography variant="h1" component="h1">
          Address
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              variant="filled"
              fullWidth
              {...register("firstName", {
                required: "Required field",
                minLength: { value: 2, message: "Name are too short" },
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Surname"
              variant="filled"
              fullWidth
              {...register("lastName", {
                required: "Required field",
                minLength: { value: 2, message: "Surname are too short" },
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              variant="filled"
              fullWidth
              {...register("address", {
                required: "Required field",
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address #2 (Optional)"
              variant="filled"
              fullWidth
              {...register("address2")}
              error={!!errors.address2}
              helperText={errors.address2?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Zip code"
              variant="filled"
              fullWidth
              {...register("zip", {
                required: "Required field",
              })}
              error={!!errors.zip}
              helperText={errors.zip?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              variant="filled"
              fullWidth
              {...register("city", {
                required: "Required field",
                minLength: { value: 6, message: "Password is too short" },
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                select
                defaultValue={countries[1].code}
                variant="filled"
                label="country"
                {...register("country", {
                  required: "Required field",
                })}
                error={!!errors.country}
              >
                {countries.map((country) => (
                  <MenuItem value={country.code} key={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Telephone"
              variant="filled"
              fullWidth
              {...register("phone", {
                required: "Required field",
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button
            color="secondary"
            className="circular-btn"
            size="large"
            type="submit"
          >
            Review order
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

export default AddressPage;
