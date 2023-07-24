export interface DashboardSummaryResponse {
  numberOfOrders: number;
  paidOrders: number;
  numberOfClients: number;
  numberOfProducts: number;
  productsWithNotInventory: number;
  lowInventory: number;
  notPaidOrders: number;
}
