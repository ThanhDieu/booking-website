import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import bookingSlice from './slice/bookingSlice';
import bundleSlice from './slice/bundleSearchSlice';
import cartSlice from './slice/cartSlice';
import commonSlice from './slice/commonSlice';
import foliosSlice from './slice/foliosSlice';
import invoiceSlice from './slice/invoceSlice';
import offerSlice from './slice/offerSlice';
import paidSlice from './slice/paidSlice';
import statusSlice from './slice/statusSlice';
import themeSlice from './slice/themeSlice';
import userSlice from './slice/userSlice';
import voucherSlice from './slice/voucherSlice';

const persistConfig = {
  key: 'root',
  version: 1.0,
  storage,
  blacklist: ['statusSlice', 'cartSlice', 'appSlice', 'userSlice', 'commonSlice', 'voucherSlice', 'offersSlice'],
};

const rootReducer = combineReducers({
  bundleSlice,
  cartSlice,
  invoiceSlice,
  statusSlice,
  bookingSlice,
  paidSlice,
  userSlice,
  foliosSlice,
  commonSlice,
  voucherSlice,
  themeSlice,
  offerSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
