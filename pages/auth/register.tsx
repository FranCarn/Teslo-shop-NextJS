import React from "react";
import { AuthLayout } from "../../components/layouts";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import NextLink from "next/link";

const RegisterPage = () => {
  return (
    <AuthLayout title="Register">
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Create Account
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Full Name" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="filled"
              type="password"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
            >
              Create Account
            </Button>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <NextLink href="/auth/login" passHref legacyBehavior>
              <Link underline="always">Already have an account?</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;
