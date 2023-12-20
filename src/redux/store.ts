import { configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  persistReducer,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from "redux-persist";
import ServicesSlice from "./slices/Services";
import MasterSlice from "./slices/MasterSlice";

const persistConfig = {
  key: "Laundry",
  storage: storage,
  blacklist: [
    // 'searchFilterStore',
  ],
  wishListSlice: ["services", "master"],
};
const reducers = combineReducers({
  services: ServicesSlice,
  master: MasterSlice,
});
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // serializableCheck: {
      //     ignoredActions: [
      //         FLUSH,
      //         REHYDRATE,
      //         PAUSE,
      //         PERSIST,
      //         PURGE,
      //         REGISTER,
      //     ],
      // },
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
