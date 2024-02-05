import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import PublicRequest from "@/utils/PublicRequests";
import PublicHandelingErrors from "@/utils/PublicHandelingErrors";
import { NotificationModel } from "@/models/NotificationSliceModel";

export const GetAllNotification = createAsyncThunk(
  "addresse/GetAllAdddressses",
  () =>
    PublicRequest.getData("notifications")
      .then((res: any) => {
        if (res) {
          // toast.success(res?.message);
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
