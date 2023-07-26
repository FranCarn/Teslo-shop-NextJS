import React from "react";
import { AdminLayout } from "../../components/layouts";
import { ConfirmationNumberOutlined } from "@mui/icons-material";

const OrdersPage = () => {
  return (
    <AdminLayout
      title="Orders"
      subTitle="Orders maintenance"
      icon={<ConfirmationNumberOutlined />}
    >
      <></>
    </AdminLayout>
  );
};

export default OrdersPage;
