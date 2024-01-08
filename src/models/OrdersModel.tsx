
import { OrdersInterface } from "@/interfaces/OrdersInterface";

export type OrdersModel = {
  isloading: boolean;
  isloadingAddOrder:boolean
  orders: OrdersInterface[];
  schedules:schedules[]
  deliverySchedules:schedules[]
};
