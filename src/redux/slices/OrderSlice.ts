import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import PublicRequest from "@/utils/PublicRequests";

import { OrdersModel } from "@/models/OrdersModel";
import PublicHandelingErrors from "@/utils/PublicHandelingErrors";
import { toast } from "react-hot-toast";

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
    PublicRequest.getData(`pick-schedules/${payload?.date}`)
);

export const GetDeliveryDuration = createAsyncThunk(
  "orders/GetDeliveryDuration",
  (payload: {
    PickedDate: string;
    deliverydata: string;
    pickup_time: string;
  }) =>
    PublicRequest.getData(
      `delivery-schedules/${payload?.deliverydata}?pickup_date=${payload?.PickedDate}&pickup_time=${payload?.pickup_time}`
    )
);

const initialState: OrdersModel = {
  isloading: false,
  orders: [],
  schedules: [],
  deliverySchedules: [],
};

export const handelOrders = createSlice({
  name: "orders",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
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
  },
});

export const OrderSlice = handelOrders.reducer;
