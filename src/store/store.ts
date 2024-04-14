import { configureStore } from '@reduxjs/toolkit';
import marketDataReducer from './marketDataSlice';
import { authReducer } from './authSlice';

export const store = configureStore({
  reducer: {
    marketData: marketDataReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
