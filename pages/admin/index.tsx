import React from "react";
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
import { Grid } from "@mui/material";
import { SummaryTile } from "../../components/admin";

const DashboardAdminPage = () => {
  return (
    <AdminLayout
      title="Dashboard"
      subTitle="General Metrics"
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryTile
          icon={<CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} />}
          title="353"
          subTitle="Total orders"
        />
        <SummaryTile
          icon={<AttachMoneyOutlined color="secondary" sx={{ fontSize: 40 }} />}
          title="337"
          subTitle="Orders paid"
        />
        <SummaryTile
          icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
          title="19"
          subTitle="Orders pending"
        />
        <SummaryTile
          icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
          title="191"
          subTitle="Clients"
        />
        <SummaryTile
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
          title="191"
          subTitle="Products"
        />
        <SummaryTile
          icon={
            <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />
          }
          title="3"
          subTitle="Products without stock"
        />
        <SummaryTile
          icon={
            <ProductionQuantityLimitsOutlined
              color="warning"
              sx={{ fontSize: 40 }}
            />
          }
          title="3"
          subTitle="
          Low Stock Products"
        />
        <SummaryTile
          icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />}
          title="3"
          subTitle="Refresh in: "
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashboardAdminPage;
