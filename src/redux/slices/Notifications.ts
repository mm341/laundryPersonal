import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import PublicRequest from "@/utils/PublicRequests";
import PublicHandelingErrors from "@/utils/PublicHandelingErrors";
import { NotificationModel } from "@/models/NotificationSliceModel";
import { inititalMasterData } from "@/interfaces/MasterInterface";

export const GetAllNotification = createAsyncThunk(
  "notifications/GetAllNotification",
  () =>
    PublicRequest.getData("customer/notifications")
      .then((res: any) => {
        if (res) {
          // toast.success(res?.message);
        }
      })
      .catch((err) => PublicHandelingErrors.onErrorResponse(err))
);

export const GetMasterData = createAsyncThunk(
  "notifications/GetMasterData",
  () =>
    PublicRequest.getData("master")
      .then((res: any) => {
        if (res) {
          // toast.success(res?.message);
          return res
        }
      })
      .catch((err) => PublicHandelingErrors.onErrorResponse(err))
);

const initialState: NotificationModel = {
  isloading: false,
  notifications: [],
  
};

export const NotificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    //  get notifications
    builder.addCase(GetAllNotification.pending, (state: NotificationModel) => {
      state.isloading = true;
      state.notifications = [];
    });
    builder.addCase(
      GetAllNotification.fulfilled,
      (state: NotificationModel, { payload }: any) => {
        state.isloading = false;
        state.notifications = payload?.data?.notifications;
      }
    );
    builder.addCase(GetAllNotification.rejected, (state: NotificationModel) => {
      state.isloading = false;
      state.notifications = [];
    });

  
  },
});

export const NotificationsSlice = NotificationSlice.reducer;
