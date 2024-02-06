import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import PublicRequest from "@/utils/PublicRequests";

import { OrdersModel } from "@/models/OrdersModel";
import PublicHandelingErrors from "@/utils/PublicHandelingErrors";
import { toast } from "react-hot-toast";
import { productInterface } from "@/interfaces/ProductInterface";

interface CouponPayload {
  amount: number;
  coupon_code: string;
}

export const GetOrders = createAsyncThunk("orders/GetOrders", (payload) =>
  PublicRequest.getData("orders?status=undefined")
);

//  enter Coupon

export const AddCoupon = createAsyncThunk(
  "updateProfile/AddCoupon",
  (payload: CouponPayload) =>
    PublicRequest.postData(payload, `coupons/${payload?.coupon_code}/apply`)
      .then((res: any) => {
        if (res) {
          toast.success(res?.message);
        }
      })
      .catch((err) => PublicHandelingErrors.onErrorResponse(err))
);

export const GetPickUpDuration = createAsyncThunk(
  "orders/GetPickUpDuration",
  (payload: { date: string }) =>
    PublicRequest.getData(`customer/order-schedules/${payload?.date}&type=pick`)
);

export const GetDeliveryDuration = createAsyncThunk(
  "orders/GetDeliveryDuration",
  (payload: {
    PickedDate: string;
    deliverydata: string;
    pickup_time: string;
  }) =>
    PublicRequest.getData(
      `customer/delivery-schedules/${payload?.deliverydata}?pickup_date=${payload?.PickedDate}&pickup_time=${payload?.pickup_time}&type=delivery`
    )
);

interface OrderPayload {
  additional_service_id?: [];
  address_id: string;
  coupon_id?: string;
  delivery_date: string;
  delivery_hour: string;
  instruction?: string;
  pick_date: string;
  pick_hour: string;

  products: productInterface[];
}
export const AddOrder = createAsyncThunk(
  "updateProfile/AddOrder",
  (payload: OrderPayload) =>
    PublicRequest.postData(payload, `customer/orders`)
      .then((res: any) => {
        if (res) {
          toast.success(res?.message);
        }
      })
      .catch((err) => PublicHandelingErrors.onErrorResponse(err))
);

const initialState: OrdersModel = {
  isloading: false,
  orders: [],
  schedules: [],
  deliverySchedules: [],
  isloadingAddOrder: false,
  isLoadingCoupon: false,
};

export const handelOrders = createSlice({
  name: "orders",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // GetOrders
    builder.addCase(GetOrders.pending, (state: OrdersModel) => {
      state.isloading = true;
      state.orders = [];
    });
    builder.addCase(
      GetOrders.fulfilled,
      (state: OrdersModel, { payload }: any) => {
        if (payload) {
          state.orders = payload.data.orders;
          state.isloading = false;
        }
      }
    );
    builder.addCase(GetOrders.rejected, (state: OrdersModel) => {
      state.isloading = false;
      state.orders = [];
    });

    // GetPickUpDuration

    builder.addCase(GetPickUpDuration.pending, (state: OrdersModel) => {
      state.schedules = [];
    });
    builder.addCase(
      GetPickUpDuration.fulfilled,
      (state: OrdersModel, { payload }: any) => {
        if (payload) {
          state.schedules = payload.data.schedules;
        }
      }
    );
    builder.addCase(GetPickUpDuration.rejected, (state: OrdersModel) => {
      state.schedules = [];
    });

    // GetDeliveryDuration
    builder.addCase(GetDeliveryDuration.pending, (state: OrdersModel) => {
      state.deliverySchedules = [];
    });
    builder.addCase(
      GetDeliveryDuration.fulfilled,
      (state: OrdersModel, { payload }: any) => {
        if (payload) {
          state.deliverySchedules = payload.data.schedules;
        }
      }
    );
    builder.addCase(GetDeliveryDuration.rejected, (state: OrdersModel) => {
      state.deliverySchedules = [];
    });

    //  add order

    builder.addCase(AddOrder.pending, (state: OrdersModel) => {
      state.isloadingAddOrder = true;
    });
    builder.addCase(
      AddOrder.fulfilled,
      (state: OrdersModel, { payload }: any) => {
        state.isloadingAddOrder = false;
      }
    );
    builder.addCase(AddOrder.rejected, (state: OrdersModel) => {
      state.isloadingAddOrder = true;
    });

    //  add coupon

    builder.addCase(AddCoupon.pending, (state: OrdersModel) => {
      state.isLoadingCoupon = true;
    });
    builder.addCase(
      AddCoupon.fulfilled,
      (state: OrdersModel, { payload }: any) => {
        state.isLoadingCoupon = false;
      }
    );
    builder.addCase(AddCoupon.rejected, (state: OrdersModel) => {
      state.isLoadingCoupon = true;
    });
  },
});

export const OrderSlice = handelOrders.reducer;
