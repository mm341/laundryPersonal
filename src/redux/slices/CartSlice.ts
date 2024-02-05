import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import PublicRequest from "@/utils/PublicRequests";
import PublicHandelingErrors from "@/utils/PublicHandelingErrors";
import { toast } from "react-hot-toast";
import { CartListModel } from "@/models/CartSliceModel";
import { initialCartList } from "@/interfaces/CartListResponseInterface";

export interface addToCartPayload {
  product_id?: string;
  quantity?: number;
  additional_service_id?: string;
  remove_product?: number;
  remove_additional?: number;
  id?: string;
}

// GetCartDetails
interface cartListPayload {
  coupon?: number | string;
}
export const GetCartDetails = createAsyncThunk(
  "cart/GetCartDetails",
  (payload: cartListPayload) =>
    PublicRequest.postData(payload, "/cart/my-cart")
      .then((res: any) => {
        if (res) {
          return res;
        }
      })
      .catch((err) => PublicHandelingErrors.onErrorResponse(err))
);

// AddToCart
export const AddToCart = createAsyncThunk(
  "cart/AddToCart",
  (payload: addToCartPayload) =>
    PublicRequest.postData(payload, `/cart/add-to-cart`)
      .then((res: any) => {
        if (res) {
          toast.success(res?.message);
          return res;
        }
      })
      .catch((err) => PublicHandelingErrors.onErrorResponse(err))
);

// UpdateCart
export const UpdateCart = createAsyncThunk(
  "cart/UpdateCart",
  (payload: addToCartPayload) =>
    PublicRequest.postData(payload, `/cart/update-cart`)
      .then((res: any) => {
        if (res) {
          toast.success(res?.message);
          return res;
        }
      })
      .catch((err) => PublicHandelingErrors.onErrorResponse(err))
);

// UpdateCart
export const RemoveElement = createAsyncThunk(
  "cart/RemoveElement",
  (payload: addToCartPayload) =>
    PublicRequest.postData(payload, `/cart/remove-from-cart`)
      .then((res: any) => {
        if (res) {
          toast.success(res?.message);
          return res;
        }
      })
      .catch((err) => PublicHandelingErrors.onErrorResponse(err))
);

// DeleteFromCart
export const DeleteCart = createAsyncThunk(
  "cart/DeleteCart",
  (payload: addToCartPayload) =>
    PublicRequest.deleteData(`/cart/clear-cart/${payload?.id}`)
      .then((res: any) => {
        if (res) {
          toast.success(res?.message);
          return res;
        }
      })
      .catch((err) => PublicHandelingErrors.onErrorResponse(err))
);

const initialState: CartListModel = {
  isloading: false,
  cartList: initialCartList(),
  isLoadingAddToCart: false,
  isloadingDeleteCart: false,
  isLoadingUpdateCart: false,
};

export const CartListSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    //  get cartList
    builder.addCase(GetCartDetails.pending, (state: CartListModel) => {
      state.isloading = true;
    });
    builder.addCase(
      GetCartDetails.fulfilled,
      (state: CartListModel, { payload }: any) => {
        state.isloading = false;
        if (payload?.data) {
          state.cartList = payload?.data;
        }
      }
    );
    builder.addCase(GetCartDetails.rejected, (state: CartListModel) => {
      state.isloading = false;
    });
    // AddToCart;
    builder.addCase(AddToCart.pending, (state: CartListModel) => {
      state.isLoadingAddToCart = true;
    });
    builder.addCase(
      AddToCart.fulfilled,
      (state: CartListModel, { payload }: any) => {
        state.isLoadingAddToCart = false;

        if (payload?.data) {
          state.isloading = true;
          state.isloading = false;
          state.cartList = payload?.data;
        }
      }
    );
    builder.addCase(AddToCart.rejected, (state: CartListModel) => {
      state.isLoadingAddToCart = false;
    });

    //  post update cart
    builder.addCase(UpdateCart.pending, (state: CartListModel) => {
      state.isLoadingUpdateCart = true;
    });
    builder.addCase(
      UpdateCart.fulfilled,
      (state: CartListModel, { payload }: any) => {
        state.isLoadingUpdateCart = false;
        if (payload?.data) {
          state.cartList = payload?.data;
        }
      }
    );
    builder.addCase(UpdateCart.rejected, (state: CartListModel) => {
      state.isLoadingUpdateCart = false;
    });

    // Remove element from Cart
    builder.addCase(RemoveElement.pending, (state: CartListModel) => {
      state.isLoadingUpdateCart = true;
    });
    builder.addCase(
      RemoveElement.fulfilled,
      (state: CartListModel, { payload }: any) => {
        state.isLoadingUpdateCart = false;
        if (payload?.data) {
          state.cartList = payload?.data;
        }
      }
    );
    builder.addCase(RemoveElement.rejected, (state: CartListModel) => {
      state.isLoadingUpdateCart = false;
    });

    // Delete Cart
    builder.addCase(DeleteCart.pending, (state: CartListModel) => {
      state.isloadingDeleteCart = true;
    });
    builder.addCase(
      DeleteCart.fulfilled,
      (state: CartListModel, { payload }: any) => {
        state.isloadingDeleteCart = false;
        state.cartList = initialCartList();
      }
    );
    builder.addCase(DeleteCart.rejected, (state: CartListModel) => {
      state.isloadingDeleteCart = false;
    });
  },
});

export const CartReducerSlice = CartListSlice.reducer;
