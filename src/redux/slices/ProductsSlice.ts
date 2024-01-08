import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import PublicRequest from "@/utils/PublicRequests";

import { ProductsModel } from "@/models/ProductsModel";

export type Paylod = {
  serviceId: number;
  variantId: number;
  searchText?: string;
};
export const GetProducts = createAsyncThunk(
  "products/GetProducts",
  (payload: Paylod) =>
    PublicRequest.getData(
      `products?service_id=${payload.serviceId}&variant_id=${payload?.variantId}`
    )
);

export const GetProductsWithSearch = createAsyncThunk(
  "products/GetProductsWithSearch",
  (payload: Paylod) =>
    PublicRequest.getData(
      `products?service_id=${payload.serviceId}&variant_id=${payload?.variantId}&search=${payload.searchText}`
    )
);

export const GetVariants = createAsyncThunk(
  "variants/GetVariants",
  (payload: { serviceId: number }) =>
    PublicRequest.getData(`variants?service_id=${payload.serviceId}`)
);

const initialState: ProductsModel = {
  isloading: false,
  products: [],
  variants: [],
};

export const handelProducts = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(GetProducts.pending, (state: ProductsModel) => {
      state.isloading = true;
      state.products = [];
    });
    builder.addCase(
      GetProducts.fulfilled,
      (state: ProductsModel, { payload }: any) => {
        if (payload) {
          state.products = payload.data.products;
          state.isloading = false;
        }
      }
    );
    builder.addCase(GetProducts.rejected, (state: ProductsModel) => {
      state.products = [];
    });

    builder.addCase(GetProductsWithSearch.pending, (state: ProductsModel) => {
      state.isloading = true;
      state.products = [];
    });
    builder.addCase(
      GetProductsWithSearch.fulfilled,
      (state: ProductsModel, { payload }: any) => {
        if (payload) {
          state.products = payload.data.products;
          state.isloading = false;
        }
      }
    );
    builder.addCase(GetProductsWithSearch.rejected, (state: ProductsModel) => {
      state.products = [];
    });

    builder.addCase(GetVariants.pending, (state: ProductsModel) => {
      state.variants = [];
    });
    builder.addCase(
      GetVariants.fulfilled,
      (state: ProductsModel, { payload }: any) => {
        if (payload) {
          state.variants = payload.data.variants;
        }
      }
    );
    builder.addCase(GetVariants.rejected, (state: ProductsModel) => {
      state.isloading = false;
      state.products = [];
    });
  },
});

export const ProductsSlice = handelProducts.reducer;
