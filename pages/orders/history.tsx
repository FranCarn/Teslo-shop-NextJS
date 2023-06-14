import React from "react";
import { ShopLayout } from "../../components/layouts";
import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import NextLink from "next/link";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullname", headerName: "Full Name", width: 300 },
  {
    field: "paid",
    headerName: "Paid",
    description: "Shows information if the order is paid",
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Paid" variant="outlined" />
      ) : (
        <Chip color="error" label="Paid Pending" variant="outlined" />
      );
    },
  },
  {
    field: "order",
    headerName: "Show order",
    description: "Shows order information",
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
          <Link underline="always">Show order</Link>
        </NextLink>
      );
    },
  },
];
const row = [
  {
    id: 1,
    paid: true,
    fullname: "Ricardo Ruben",
  },
  {
    id: 2,
    paid: false,
    fullname: "Jeronimo Dante",
  },
  {
    id: 3,
    paid: true,
    fullname: "Vico Ledesma",
  },
  {
    id: 4,
    paid: true,
    fullname: "Romario Sanchez",
  },
  {
    id: 5,
    paid: false,
    fullname: "Renato Sanchez",
  },
  {
    id: 6,
    paid: true,
    fullname: "Ronaldinho Sanchez",
  },
];

const HistoryPage = () => {
  return (
    <ShopLayout
      title="Orders History"
      pageDescription="Teslo Shop Client Order History"
    >
      <>
        <Typography variant="h1" component="h1">
          Orders History
        </Typography>
        <Grid container>
          <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
            <DataGrid rows={row} columns={columns} pageSizeOptions={[10]} />
          </Grid>
        </Grid>
      </>
    </ShopLayout>
  );
};

export default HistoryPage;
