import React from "react";
import { AdminLayout } from "../../components/layouts";
import { ConfirmationNumberOutlined } from "@mui/icons-material";
import { Chip, Grid } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import useSWR from "swr";
import { IOrder, IUser } from "../../interfaces";

const columns: GridColDef[] = [
  { field: "id", headerName: "Order ID", width: 250 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "name", headerName: "Full name", width: 300 },
  { field: "totalPrice", headerName: "Amount", width: 250 },
  {
    field: "isPaid",
    headerName: "Paid",
    renderCell: ({ row }: GridRenderCellParams) => {
      return row.isPaid ? (
        <Chip variant="outlined" label="Paid" color="success" />
      ) : (
        <Chip variant="outlined" label="Pending" color="error" />
      );
    },
  },
  {
    field: "noProducts",
    headerName: "Number of Products",
    align: "center",
    width: 150,
  },
  {
    field: "check",
    headerName: "See",
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`admin/orders/${row.id}`} target="_blank" rel="noreferrer">
          See order
        </a>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "Created at",
    width: 250,
  },
];

const OrdersPage = () => {
  const { data, error } = useSWR<IOrder[]>("/api/admin/orders");

  if (!data && !error) return <></>;

  const rows = data!.map((order) => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.totalPrice,
    isPaid: order.isPaid,
    noProducts: order.numberOfItems,
    createdAt: order.createdAt,
  }));

  return (
    <AdminLayout
      title="Orders"
      subTitle="Orders maintenance"
      icon={<ConfirmationNumberOutlined />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSizeOptions={[10]} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default OrdersPage;
