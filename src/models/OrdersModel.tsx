
import { OrdersInterface } from "@/interfaces/OrdersInterface";

export type OrdersModel = {
  isloading: boolean;
  orders: OrdersInterface[];
  schedules:schedules[]
  deliverySchedules:schedules[]
};
