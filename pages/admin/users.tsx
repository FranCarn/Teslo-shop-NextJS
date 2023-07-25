import React from "react";
import { AdminLayout } from "../../components/layouts";
import { PeopleOutline } from "@mui/icons-material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Grid, MenuItem, Select } from "@mui/material";
import useSWR from "swr";
import { IUser } from "../../interfaces";
import { tesloApi } from "../../api";

const UsersPage = () => {
  const { data, error } = useSWR<IUser[]>("/api/admin/users");

  if (!data && !error) return <></>;

  const rows = data!.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  const onRoleUpdated = async (userId: string, newRole: string) => {
    try {
      await tesloApi.put("/admin/users", { userId, role: newRole });
    } catch (error) {
      console.log(error);
      alert("Role cannot update");
    }
  };

  const columns: GridColDef[] = [
    { field: "email", headerName: "Email", width: 250 },
    { field: "name", headerName: "Full name", width: 300 },
    {
      field: "role ",
      headerName: "Role",
      width: 300,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Select
            value={row.role}
            label="Role"
            onChange={({ target }) => onRoleUpdated(row.id, target.value)}
            sx={{ width: "300px" }}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="super-user">Super User</MenuItem>
            <MenuItem value="SEO">SEO</MenuItem>
            <MenuItem value="client">Client</MenuItem>
          </Select>
        );
      },
    },
  ];

  return (
    <AdminLayout
      title="Users"
      subTitle="Users maintenance"
      icon={<PeopleOutline />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSizeOptions={[10]} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;
