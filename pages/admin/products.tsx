import React from "react";
import { AdminLayout } from "../../components/layouts";
import { CategoryOutlined } from "@mui/icons-material";
import { CardMedia, Grid } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import useSWR from "swr";
import { IProduct } from "../../interfaces";
import { currency } from "../../utils";

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "Image",
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/product/${row.slug}`} target="_blank" rel="noreferrer">
          <CardMedia
            component="img"
            alt={row.title}
            className="fadeIn"
            image={`/products/${row.img}`}
          />
        </a>
      );
    },
  },
  { field: "title", headerName: "Title", width: 300 },
  { field: "gender", headerName: "Gender" },
  { field: "type", headerName: "Type" },
  { field: "inStock", headerName: "Inventory" },
  { field: "totalPrice", headerName: "Price" },
  { field: "sizes", headerName: "Size", width: 250 },
];

const ProductsPage = () => {
  const { data, error } = useSWR<IProduct[]>("/api/admin/products");

  if (!data && !error) return <></>;

  const rows = data!.map((product) => ({
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    totalPrice: currency.format(product.price),
    sizes: product.sizes.join(", "),
    slug: product.slug,
  }));

  return (
    <AdminLayout
      title={`Products (${data?.length})`}
      subTitle="Products maintenance"
      icon={<CategoryOutlined />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSizeOptions={[10]} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default ProductsPage;