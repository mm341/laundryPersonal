
import { OrdersInterface } from "@/interfaces/OrdersInterface";

export type OrdersModel = {
  limit:string
  offset:string
  total_size:string
  isloading: boolean;
  isLoadingCoupon:boolean
  isloadingAddOrder:boolean
  orders: OrdersInterface[];
  schedules:schedules[]
  deliverySchedules:schedules[]
  orderData:OrdersInterface
  isLoadingGetOrderDetails:boolean
};
