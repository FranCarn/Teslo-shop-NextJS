import React from "react";
import { AuthLayout } from "../../components/layouts";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import NextLink from "next/link";

const LoginPage = () => {
  return (
    <AuthLayout title="Login">
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Sign in
            </Typography>
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
    </AuthLayout>
  );
};

export default LoginPage;
