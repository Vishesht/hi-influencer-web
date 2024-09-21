import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import loginReducer from "@/lib/features/login/loginSlice";
import alertReducer from "@/lib/features/alert/alertSlice";
import adsReducer from "@/lib/features/Ads/AdsSlice";
import influencerReducer from "@/lib/features/influencer/influencerSlice";
import paymentReducer from "@/lib/features/Payments/paymentSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, loginReducer);

export const store: any = configureStore({
  reducer: {
    login: persistedReducer,
    alert: alertReducer,
    ads: adsReducer,
    influencer: influencerReducer,
    payment: paymentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
