import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import PublicRequest from "@/utils/PublicRequests";

import { ProductsModel } from "@/models/ProductsModel";

export type Paylod = {
  serviceId?: string | string[] | undefined;
  variantId?: string;
  searchText?: string;
};

// Get Addtional Services
export const GetAddtionalServices = createAsyncThunk(
  "products/GetAddtionalServices",
  () => PublicRequest.getData(`additional-services`)
);

// Get Products
export const GetProducts = createAsyncThunk(
  "products/GetProducts",
  (payload: Paylod) =>
    PublicRequest.getData(
      `products?service_id=${payload.serviceId}&variant_id=${payload?.variantId}`
    )
);

export const GetProductsWithServiceOnly = createAsyncThunk(
  "products/GetProductsWithServiceOnly",
  (payload: Paylod) =>
    PublicRequest.getData(`products?service_id=${payload.serviceId}`)
);

// Get Products WithSearch
export const GetProductsWithSearch = createAsyncThunk(
  "products/GetProductsWithSearch",
  (payload: Paylod) =>
    PublicRequest.getData(
      `products?service_id=${payload.serviceId}&variant_id=${payload?.variantId}&search=${payload.searchText}`
    )
);

// Get Products WithSearch and service
export const GetProductsWithSearchAndService = createAsyncThunk(
  "products/GetProductsWithSearchAndService",
  (payload: Paylod) =>
    PublicRequest.getData(`products?search=${payload.searchText}`)
);

// Get Variants
export const GetVariants = createAsyncThunk(
  "variants/GetVariants",
  (payload: { serviceId: string | string[] }) =>
    PublicRequest.getData(`variants?service_id=${payload.serviceId}`)
);

const initialState: ProductsModel = {
  isloading: false,
  products: [],
  variants: [],
  additionalSercvices: [],
};

export const handelProducts = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // GetProducts
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

    // GetProducts with service only
    builder.addCase(
      GetProductsWithServiceOnly.pending,
      (state: ProductsModel) => {
        state.isloading = true;
        state.products = [];
      }
    );
    builder.addCase(
      GetProductsWithServiceOnly.fulfilled,
      (state: ProductsModel, { payload }: any) => {
        if (payload) {
          state.products = payload.data.products;
          state.isloading = false;
        }
      }
    );
    builder.addCase(
      GetProductsWithServiceOnly.rejected,
      (state: ProductsModel) => {
        state.products = [];
      }
    );

    // GetProductsWithSearch
    builder.addCase(
      GetProductsWithSearchAndService.pending,
      (state: ProductsModel) => {
        state.isloading = true;
        state.products = [];
      }
    );
    builder.addCase(
      GetProductsWithSearchAndService.fulfilled,
      (state: ProductsModel, { payload }: any) => {
        if (payload) {
          state.products = payload.data.products;
          state.isloading = false;
        }
      }
    );

    builder.addCase(
      GetProductsWithSearchAndService.rejected,
      (state: ProductsModel) => {
        state.products = [];
      }
    );

    // GetProductsWithSearch
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

    /// GetProductsWithSearchAndService
    //  builder.addCase(GetProductsWithSearchAndService.pending, (state: ProductsModel) => {
    //   state.isloading = true;
    //   state.products = [];
    // });
    // builder.addCase(
    //   GetProductsWithSearchAndService.fulfilled,
    //   (state: ProductsModel, { payload }: any) => {
    //     if (payload) {
    //       state.products = payload.data.products;
    //       state.isloading = false;
    //     }
    //   }
    // );
    // builder.addCase(GetProductsWithSearchAndService.rejected, (state: ProductsModel) => {
    //   state.products = [];
    // });

    // GetVariants
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

    // GetVariants
    builder.addCase(GetAddtionalServices.pending, (state: ProductsModel) => {
      state.additionalSercvices = [];
    });
    builder.addCase(
      GetAddtionalServices.fulfilled,
      (state: ProductsModel, { payload }: any) => {
        if (payload) {
          state.additionalSercvices = payload.data.additional_services;
        }
      }
    );
    builder.addCase(GetAddtionalServices.rejected, (state: ProductsModel) => {
      state.additionalSercvices = [];
    });
  },
});

export const ProductsSlice = handelProducts.reducer;
