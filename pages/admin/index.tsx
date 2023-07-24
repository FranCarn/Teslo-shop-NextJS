import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../components/layouts";
import {
  AttachMoneyOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupOutlined,
  CategoryOutlined,
  CancelPresentationOutlined,
  ProductionQuantityLimitsOutlined,
  AccessTimeOutlined,
} from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { SummaryTile } from "../../components/admin";
import useSWR from "swr";
import { DashboardSummaryResponse } from "../../interfaces";

const DashboardAdminPage = () => {
  const { data, error } = useSWR<DashboardSummaryResponse>(
    "/api/admin/dashboard",
    {
      refreshInterval: 30 * 1000,
    }
  );
  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!error && !data) {
    return <></>;
  }

  if (error) {
    console.log(error);
    return <Typography>Error getting info</Typography>;
  }

  const {
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNotInventory,
    lowInventory,
    notPaidOrders,
  } = data!;

  return (
    <AdminLayout
      title="Dashboard"
      subTitle="General Metrics"
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryTile
          icon={<CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} />}
          title={numberOfOrders}
          subTitle="Total orders"
        />
        <SummaryTile
          icon={<AttachMoneyOutlined color="secondary" sx={{ fontSize: 40 }} />}
          title={paidOrders}
          subTitle="Orders paid"
        />
        <SummaryTile
          icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
          title={notPaidOrders}
          subTitle="Orders pending"
        />
        <SummaryTile
          icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
          title={numberOfClients}
          subTitle="Clients"
        />
        <SummaryTile
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
          title={numberOfProducts}
          subTitle="Products"
        />
        <SummaryTile
          icon={
            <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />
          }
          title={productsWithNotInventory}
          subTitle="Products without stock"
        />
        <SummaryTile
          icon={
            <ProductionQuantityLimitsOutlined
              color="warning"
              sx={{ fontSize: 40 }}
            />
          }
          title={lowInventory}
          subTitle="
          Low Stock Products"
        />
        <SummaryTile
          icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />}
          title={refreshIn}
          subTitle="Refresh in"
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashboardAdminPage;
