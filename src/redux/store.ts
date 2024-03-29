import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { enableMapSet } from 'immer';
import authReducer from '../app/auth/auth.slice';
import cartReducer from '../app/cart/cart.slice';

enableMapSet();

export const store = configureStore({
  reducer: {
    authReducer,
    cartReducer,
  },
});

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
