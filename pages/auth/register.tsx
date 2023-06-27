import React, { useContext, useState } from "react";
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
import { ErrorOutline } from "@mui/icons-material";
import { validation } from "../../utils";
import { AuthContext } from "../../context";
import { useRouter } from "next/router";

type FormData = {
  email: string;
  password: string;
  name: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const destination = router.query.p?.toString() || "/";
  const { registerUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onRegisterForm = async ({ email, name, password }: FormData) => {
    setShowError(false);
    const { hasError, message } = await registerUser(email, password, name);
    if (hasError) {
      setErrorMessage(message!);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }
    router.replace(destination);
  };
  return (
    <AuthLayout title="Register">
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Create Account
              </Typography>
              <Chip
                label="Email already in use"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Full Name"
                variant="filled"
                fullWidth
                {...register("name", {
                  required: "Required field",
                  minLength: 2,
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
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
                Create Account
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              <NextLink
                href={`/auth/login?p=${destination}`}
                passHref
                legacyBehavior
              >
                <Link underline="always">Already have an account?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
