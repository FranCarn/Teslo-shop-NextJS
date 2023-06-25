import React, { useState } from "react";
import { AuthLayout } from "../../components/layouts";
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { validation } from "../../utils";
import { tesloApi } from "../../api";
import { ErrorOutline } from "@mui/icons-material";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const onLoginUser = async (loginData: FormData) => {
    setShowError(false);
    try {
      const { data } = await tesloApi.post("/user/login", loginData);
      const { token, user } = data;
    } catch (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Sign in
              </Typography>

              <Chip
                label="Incorrect credentials"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Email"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "Required field",
                  validate: validation.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="filled"
                type="password"
                fullWidth
                {...register("password", {
                  required: "Required field",
                  minLength: { value: 6, message: "Password is too short" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                type="submit"
              >
                Sign in
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              <NextLink href="/auth/register" passHref legacyBehavior>
                <Link underline="always">Create account</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
